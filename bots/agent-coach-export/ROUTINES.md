---
connectors: [github, gitlab]
schedules:
  - name: "Agent coach: The week’s costliest agent patterns"
    cron: "0 16 * * 5"
    prompt: >-
      Review my owner’s agent sessions from the last seven days with the agent-session-review skill.
      Include pull requests on GitHub and merge requests through the GitLab connector that were closed
      unmerged this week. Post the three patterns that cost the most turns, each with the sessions it
      came from and one proposed rule for AGENTS.md or CLAUDE.md. Say whether rules proposed in earlier
      weeks made their pattern go down. Change no file until my owner agrees.
events:
  - name: "When an agent’s pull request is closed unmerged: find out why"
    source: github
    event: pr_closed
    prompt: >-
      A pull request was closed. If it merged, or no Orca workspace of my owner’s made it, stop without
      posting. Otherwise read its review comments and the agent session behind it with the
      agent-session-review skill, and post in two lines why the work was rejected and which rule would
      have prevented it.
  - name: "When an agent’s merge request is closed unmerged: find out why"
    source: webhook
    event: call
    prompt: >-
      GitLab called with a merge request event. If its object_kind isn’t merge_request, its action
      isn’t close, or no Orca workspace of my owner’s made its source branch, stop without posting.
      Otherwise read its discussion through the GitLab connector and the agent session behind it with the
      agent-session-review skill, and post in two lines why the work was rejected and which rule would
      have prevented it.
---

# Routines

All arrive paused. Turn them on once you've read the first review.

| When | What |
| --- | --- |
| Fridays at 4 PM | The week's three costliest agent patterns, each with a proposed rule |
| A pull request closes without merging (GitHub) | Why the agent's work was rejected, in two lines |
| A merge request closes without merging (GitLab webhook) | The same, for GitLab |

The GitHub routine waits until GitHub is connected for this bot. The GitLab routine needs the GitLab connector signed in, and its URL (Copy URL on the automation's card) added under the project's **Settings → Webhooks** with **Merge request events** ticked.
