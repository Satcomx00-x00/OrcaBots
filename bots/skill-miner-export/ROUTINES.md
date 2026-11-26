---
connectors: [github]
tools:
  - name: gitlab
    url: https://gitlab.com/api/v4/mcp
schedules:
  - name: "Skill miner: Up to three skill drafts"
    cron: "0 10 * * 1"
    prompt: >-
      Read my owner’s agent sessions from the last two weeks with the skill-mining skill. Post up to
      three procedures my owner keeps asking for, each with the sessions behind it and a draft
      SKILL.md. Skip any you proposed before unless they came up again. Write nothing to a repo until
      my owner picks one.
events: []
---

# Routines

Arrives paused. Turn it on once you've seen the first drafts.

| When | What |
| --- | --- |
| Mondays at 10 AM | Up to three skill drafts, each with the sessions behind it |

Once your owner picks a draft, the bot opens a pull request on GitHub, or a merge request through the GitLab tool for a GitLab project.
