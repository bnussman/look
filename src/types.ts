export interface Webhook {
  action: string
  number: number
  pull_request: PullRequest
  changes: Changes
  repository: Repository
  organization: Organization
  enterprise: Enterprise
  sender: Sender
}

export interface PullRequest {
  url: string
  id: number
  node_id: string
  html_url: string
  diff_url: string
  patch_url: string
  issue_url: string
  number: number
  state: string
  locked: boolean
  title: string
  user: User
  body: string
  created_at: string
  updated_at: string
  closed_at: any
  merged_at: any
  merge_commit_sha: string
  assignee: Assignee
  assignees: Assignee2[]
  requested_reviewers: any[]
  requested_teams: any[]
  labels: Label[]
  milestone: any
  draft: boolean
  commits_url: string
  review_comments_url: string
  review_comment_url: string
  comments_url: string
  statuses_url: string
  head: Head
  base: Base
  _links: Links
  author_association: string
  auto_merge: any
  active_lock_reason: any
  merged: boolean
  mergeable: boolean
  rebaseable: boolean
  mergeable_state: string
  merged_by: any
  comments: number
  review_comments: number
  maintainer_can_modify: boolean
  commits: number
  additions: number
  deletions: number
  changed_files: number
}

export interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface Assignee {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface Assignee2 {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface Label {
  id: number
  node_id: string
  url: string
  name: string
  color: string
  default: boolean
  description: string
}

export interface Head {
  label: string
  ref: string
  sha: string
  user: User2
  repo: Repo
}

export interface User2 {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface Repo {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: Owner
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  has_discussions: boolean
  forks_count: number
  mirror_url: any
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: License
  allow_forking: boolean
  is_template: boolean
  web_commit_signoff_required: boolean
  topics: any[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  allow_squash_merge: boolean
  allow_merge_commit: boolean
  allow_rebase_merge: boolean
  allow_auto_merge: boolean
  delete_branch_on_merge: boolean
  allow_update_branch: boolean
  use_squash_pr_title_as_default: boolean
  squash_merge_commit_message: string
  squash_merge_commit_title: string
  merge_commit_message: string
  merge_commit_title: string
}

export interface Owner {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface License {
  key: string
  name: string
  spdx_id: string
  url: any
  node_id: string
}

export interface Base {
  label: string
  ref: string
  sha: string
  user: User3
  repo: Repo2
}

export interface User3 {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface Repo2 {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: Owner2
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  has_discussions: boolean
  forks_count: number
  mirror_url: any
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: License2
  allow_forking: boolean
  is_template: boolean
  web_commit_signoff_required: boolean
  topics: string[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  allow_squash_merge: boolean
  allow_merge_commit: boolean
  allow_rebase_merge: boolean
  allow_auto_merge: boolean
  delete_branch_on_merge: boolean
  allow_update_branch: boolean
  use_squash_pr_title_as_default: boolean
  squash_merge_commit_message: string
  squash_merge_commit_title: string
  merge_commit_message: string
  merge_commit_title: string
}

export interface Owner2 {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface License2 {
  key: string
  name: string
  spdx_id: string
  url: any
  node_id: string
}

export interface Links {
  self: Self
  html: Html
  issue: Issue
  comments: Comments
  review_comments: ReviewComments
  review_comment: ReviewComment
  commits: Commits
  statuses: Statuses
}

export interface Self {
  href: string
}

export interface Html {
  href: string
}

export interface Issue {
  href: string
}

export interface Comments {
  href: string
}

export interface ReviewComments {
  href: string
}

export interface ReviewComment {
  href: string
}

export interface Commits {
  href: string
}

export interface Statuses {
  href: string
}

export interface Changes {
  body: Body
  title: Title
}

export interface Body {
  from: string
}

export interface Title {
  from: string
}

export interface Repository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: Owner3
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  has_discussions: boolean
  forks_count: number
  mirror_url: any
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: License3
  allow_forking: boolean
  is_template: boolean
  web_commit_signoff_required: boolean
  topics: string[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
}

export interface Owner3 {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface License3 {
  key: string
  name: string
  spdx_id: string
  url: any
  node_id: string
}

export interface Organization {
  login: string
  id: number
  node_id: string
  url: string
  repos_url: string
  events_url: string
  hooks_url: string
  issues_url: string
  members_url: string
  public_members_url: string
  avatar_url: string
  description: string
}

export interface Enterprise {
  id: number
  slug: string
  name: string
  node_id: string
  avatar_url: string
  description: any
  website_url: any
  html_url: string
  created_at: string
  updated_at: string
}

export interface Sender {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}
