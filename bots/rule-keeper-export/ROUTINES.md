---
connectors: [github, gitlab]
schedules:
  - name: "Rule keeper: Rules nobody needed, rules always broken"
    cron: "0 10 1 * *"
    prompt: >-
      Go through the rules in the AGENTS.md and CLAUDE.md files of the repos my owner picked with the
      rule-check skill. Post the rules no change and no agent session needed in the last 60 days, and
      the rules broken most often this month, each with a proposed edit. Change no file until my
      owner agrees.
events:
  - name: "When an agent opens a pull request: check it against the rules"
    source: github
    event: pr_opened
    prompt: >-
      A pull request was opened. If no Orca workspace of my owner’s made it, or its repo isn’t one my
      owner picked, stop without posting. Otherwise check its diff against that repo’s rules with the
      rule-check skill. If it broke none, stop without posting. Otherwise post each broken rule with
      the file and line, and where the rule is written.
  - name: "When an agent opens a merge request: check it against the rules"
    source: webhook
    event: call
    prompt: >-
      GitLab called with a merge request event. If its object_kind isn’t merge_request, its action
      isn’t open, or no Orca workspace of my owner’s made its source branch, stop without posting.
      Otherwise read its changes through the GitLab connector and check them against that project’s
      rules with the rule-check skill. If it broke none, stop without posting. Otherwise post each
      broken rule with the file and line, and where the rule is written.
---

# Routines

All arrive paused. Turn them on once the first check looks right.

| When | What |
| --- | --- |
| An agent opens a pull request (GitHub) | The rules its diff broke, with file and line. Nothing when it broke none |
| An agent opens a merge request (GitLab webhook) | The same, for GitLab |
| The 1st of each month at 10 AM | Rules nobody needed, rules always broken, each with a proposed edit |

The GitHub routine waits until GitHub is connected for this bot. The GitLab routine needs the GitLab connector signed in, and its URL (Copy URL on the automation's card) added under the project's **Settings → Webhooks** with **Merge request events** ticked.
