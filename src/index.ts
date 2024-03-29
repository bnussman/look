import { Webhook } from "./types";
import { Octokit } from "octokit";

const BOT_USERNAME = "bnussman-akamai";

const REPO_INFO = {
  owner: 'linode',
  repo: 'manager',
};

export interface Env {
  GITHUB_TOKEN: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return new Response(`Banksbot is off`);

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
      const hasReviewFromSameUser = reviews.some(r => r.user.id === allReviews[i].user.id);
      const hasPendingReviewRequestForUser = requestedReviewers.users.some(request => request.id === allReviews[i].user.id);
      const isComment = allReviews[i].state === "COMMENTED";

      // Only consider the latest review from each user AND
      // only consider a review if the user does NOT have a pending review AND
      // ignore just comments
      if (!hasReviewFromSameUser && !hasPendingReviewRequestForUser && !isComment) {
        reviews.push(allReviews[i]);
      }
    }

    const UNLABELED_QUERY = `
      query {
        resource(url:"https://github.com/linode/manager/pull/${pr.pull_request.number}") {
          ... on PullRequest {
            timelineItems(last: 100, itemTypes: [UNLABELED_EVENT]) {
              nodes {
                ... on UnlabeledEvent {
                  actor {
                    login
                  }
                  label {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    const LABELED_QUERY = `
      query {
        resource(url:"https://github.com/linode/manager/pull/${pr.pull_request.number}") {
          ... on PullRequest {
            timelineItems(last: 100, itemTypes: [LABELED_EVENT]) {
              nodes {
                ... on LabeledEvent {
                  actor {
                    login
                  }
                  label {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    const unlabeledData = await octokit.graphql<any>(UNLABELED_QUERY);

    const unlabelEvents = unlabeledData.resource.timelineItems.nodes as {
      actor: {
        login: string
      },
      label: {
        name: string
      }
    }[];

    const labeledData = await octokit.graphql<any>(LABELED_QUERY);

    const labeledEvents = labeledData.resource.timelineItems.nodes as {
      actor: {
        login: string
      },
      label: {
        name: string
      }
    }[];

    const unlabelEventsNotMadeByThisBot = unlabelEvents.filter(event => event.actor.login !== BOT_USERNAME);
    const labeldEventsNotMadeByThisBot = labeledEvents.filter(event => event.actor.login !== BOT_USERNAME);

    const diff = rawDiff as unknown as string;

    const isApproved = reviews.filter((r) => r.state === "APPROVED").length >= 2;
    const isAdditionalApprovalNeeded = reviews.filter((r) => r.state === "APPROVED").length === 1;
    const isReadyForReview = !isApproved && !isAdditionalApprovalNeeded;

    const labels = new Set<string>(pr.pull_request.labels.map(label => label.name));

    const labelConditions = [
      {
        label: "Missing Changeset",
        condition: !diff.includes(`pr-${pr.pull_request.number}`) && pr.pull_request.base.ref === 'develop' && !(pr.pull_request.head.ref === 'master'),
      },
      {
        label: "Release → Staging",
        condition: pr.pull_request.base.ref === "staging" && pr.pull_request.head.ref.includes('release'),
      },
      {
        label: 'Release',
        condition: pr.pull_request.base.ref === 'master' && pr.pull_request.head.ref === 'staging',
      },
      {
        label: 'Master → Develop',
        condition: pr.pull_request.base.ref === 'develop' && pr.pull_request.head.ref === 'master',
      },
      {
        label: "Hotfix",
        condition: pr.pull_request.title.toLowerCase().includes('hotfix'),
      },
      {
        label: "Approved",
        condition: isApproved
      },
      {
        label: "Ready for Review",
        condition: isReadyForReview
      },
      {
        label: "Add'tl Approval Needed",
        condition: isAdditionalApprovalNeeded,
      },
      {
        label: 'Requires Changes',
        condition: reviews.some((r) => r.state === 'CHANGES_REQUESTED'),
      },
      // {
      //   label: '@linode/api-v4',
      //   condition: diff.includes(`packages/api-v4/src/`),
      // },
      // {
      //   label: '@linode/validation',
      //   condition: diff.includes(`packages/validation/src/`),
      // },
      // {
      //   label: 'AGLB',
      //   condition: diff.includes(`packages/manager/src/features/aglb`),
      // },
      // {
      //   label: 'VPC',
      //   condition: diff.includes(`packages/manager/src/features/vpc`),
      // },
    ];

    for (const { label, condition } of labelConditions) {
      const wasManuallyUnabled = unlabelEventsNotMadeByThisBot.some(e => e.label.name === label);
      // const wasManuallyLabeled = labeldEventsNotMadeByThisBot.some(e => e.label.name === label);

      if (condition && !wasManuallyUnabled) {
        labels.add(label)
      }
      if (!condition) {
        labels.delete(label)
      }
    }

    await octokit.rest.issues.setLabels({
      ...REPO_INFO,
      issue_number: pr.pull_request.number,
      labels: Array.from(labels),
    });

    return new Response(`Success`);
  },
};
