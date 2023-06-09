import { Label, Webhook } from "./types";
import { Octokit } from "octokit";

const REPO_INFO = {
  owner: 'linode',
  repo: 'manager',
};

export interface Env {
  GITHUB_TOKEN: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

    const octokit = new Octokit({ auth: env.GITHUB_TOKEN });

    const pr = await request.json<Webhook>();

    if (pr.pull_request.draft) {
      return new Response(`Doing nothing because PR is a draft`);
    }

    const { data: diff } = await octokit.rest.pulls.get({
      ...REPO_INFO,
      pull_number: pr.number,
      mediaType: {
        format: 'diff',
      },
    });

    const hasChangeset = Boolean((diff as unknown as string).includes(`pr-${pr.number}`));
    const isApproved = pr.pull_request.state === "approved";

    const labelsToAdd = [];
    const labelsToRemove = [];

    if (!hasChangeset) {
      labelsToAdd.push('Missing Changeset');
    }

    if (isApproved) {
      labelsToAdd.push("Approved");
      labelsToRemove.push("Ready for Review");
      labelsToRemove.push("Add'tl Approval Needed");
    } else {
      labelsToRemove.push('Approved');
      labelsToAdd.push("Ready for Review");
    }

    await octokit.rest.issues.addLabels({
      ...REPO_INFO,
      issue_number: pr.number,
      labels: labelsToAdd
    });

    for (const label of labelsToRemove) {
      if (!pr.pull_request.labels.find((l) => l.name === label)) {
        continue;
      }
      await octokit.rest.issues.removeLabel({
        ...REPO_INFO,
        issue_number: pr.number,
        name: label,
      });
    }

    return new Response(`Success`);
  },
};
