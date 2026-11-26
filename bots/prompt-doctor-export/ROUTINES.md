---
connectors: [github, gitlab]
schedules:
  - name: "Prompt doctor: Openings that needed the most follow-up"
    cron: "0 9 * * 1"
    prompt: >-
      Read the first message of each of my owner’s agent sessions from the last seven days with the
      prompt-review skill. Post up to three kinds of request whose openings needed three or more
      clarifications, each with the sessions behind it, what the opening left out, and a template
      with those blanks. Add the week’s best opening. Skip any template you proposed before unless
      it went wrong again. Write nothing to a repo until my owner picks one.
events: []
---

# Routines

Arrives paused. Turn it on once you've seen the first templates.

| When | What |
| --- | --- |
| Mondays at 9 AM | Up to three kinds of request that needed too much follow-up, each with a template |

Once your owner picks a template, the bot opens a pull request on GitHub, or a merge request through the GitLab connector for a GitLab project.
