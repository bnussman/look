import { Webhook } from "./types";
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

    const { data: rawDiff } = await octokit.rest.pulls.get({
      ...REPO_INFO,
      pull_number: pr.pull_request.number,
      mediaType: {
        format: 'diff',
      },
    });

    const { data: allReviews } = await octokit.rest.pulls.listReviews({
      ...REPO_INFO,
      pull_number: pr.pull_request.number,
    });

    const { data: requestedReviewers } = await octokit.rest.pulls.listRequestedReviewers({
      ...REPO_INFO,
      pull_number: pr.pull_request.number,
    });

    const reviews: typeof allReviews = [];

    // Traverse the reviews from the bottom because reviews are in chronological order.
    // (Newest reviews are at the bottom)
    for (let i = allReviews.length - 1; i >= 0; i--) {
      const hasReviewFromSameUser = reviews.some(r => r.user.id === reviews[i].user.id);
      const hasPendingReviewRequestForUser = requestedReviewers.users.some(request => request.id === reviews[i].user.id);

      // Only consider the latest review from each user AND
      // only consider a review if the user does NOT have a pending review.
      if (!hasReviewFromSameUser || !hasPendingReviewRequestForUser) {
        reviews.push(allReviews[i]);
      }
    }

    const diff = rawDiff as unknown as string;

    const hasChangeset = diff.includes(`pr-${pr.pull_request.number}`);
    const hasChangesInSDK = diff.includes(`packages/api-v4/src/`);
    const hasChangesInValidation = diff.includes(`packages/validation/src/`);
    const isApproved = reviews.filter(r => r.state === "APPROVED").length >= 2;
    const isAdditionalApprovalNeeded = reviews.filter(r => r.state === "APPROVED").length === 1;
    const isReadyForReview = !isApproved && !isAdditionalApprovalNeeded;
    const areChangesRequested = reviews.some(r => r.state === 'CHANGES_REQUESTED');

    const isStaging = pr.pull_request.base.ref === 'staging';
    const isMaster = pr.pull_request.base.ref === 'master';
    const isUpdate = pr.pull_request.base.ref === 'develop' && isMaster;
    const isHotfix = pr.pull_request.title.toLowerCase().includes('hotfix')

    // Labels
    const missingChangesetLabel = 'Missing Changeset';
    const stagingLabel = 'Release → Staging';
    const releaseLabel = 'Release';
    const masterDevelopLabel = 'Master → Develop';
    const hotfixLabel = 'Hotfix';
    const approvedLabel = 'Approved';
    const readyForReviewLabel = 'Ready for Review';
    const additionalApprovalLabel = "Add'tl Approval Needed";
    const changesRequestedLabel = 'Requires Changes';
    const sdkLabel = '@linode/api-v4';
    const validationLabel = '@linode/validation';

    const labels = new Set<string>(pr.pull_request.labels.map(label => label.name));

    if (hasChangeset) {
      labels.delete(missingChangesetLabel);
    } else if (pr.action === 'opened' || pr.action === 'reopened') {
      labels.add(missingChangesetLabel);
    }

    if (isStaging) {
      labels.add(stagingLabel);
    } else if (isMaster) {
      labels.add(releaseLabel);
    } else if (isUpdate) {
      labels.add(masterDevelopLabel);
    }

    if (isHotfix) {
      labels.add(hotfixLabel);
    } else {
      labels.delete(hotfixLabel);
    }

    if (isApproved) {
      labels.add(approvedLabel);
    } else {
      labels.delete(approvedLabel);
    }

    if (isReadyForReview) {
      labels.add(readyForReviewLabel);
    } else {
      labels.delete(readyForReviewLabel);
    }

    if (isAdditionalApprovalNeeded) {
      labels.add(additionalApprovalLabel);
    } else {
      labels.delete(additionalApprovalLabel);
    }

    if (areChangesRequested) {
      labels.add(changesRequestedLabel);
    } else {
      labels.delete(changesRequestedLabel);
    }

    if (hasChangesInSDK) {
      labels.add(sdkLabel);
    } else {
      labels.delete(sdkLabel);
    }

    if (hasChangesInValidation) {
      labels.add(validationLabel);
    } else {
      labels.delete(validationLabel);
    }

    await octokit.rest.issues.setLabels({
      ...REPO_INFO,
      issue_number: pr.pull_request.number,
      labels: Array.from(labels),
    });

    return new Response(`Success`);
  },
};
