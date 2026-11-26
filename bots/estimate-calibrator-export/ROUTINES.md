---
connectors: [gitlab]
schedules:
  - name: "Estimate calibrator: Estimates against what it took"
    cron: "0 11 * * 1"
    prompt: >-
      If no sprint ended in the last seven days, stop without posting. Otherwise compare the
      estimates of the sprint that just ended with what the work took, with the estimate-calibration
      skill, reading its issues and merge requests through the GitLab connector. Post how many
      stories landed in range, the kinds of story the team underestimated with examples, and one
      sizing rule for each. Never break numbers down by person. Change nothing on GitLab.
events: []
---

# Routines

Arrives paused. Turn it on once the first comparison looks right.

| When | What |
| --- | --- |
| Mondays at 11 AM, only when a sprint ended in the last week | Estimates against what the work took, and which kinds of story run over |

If your sprints end mid-week, change this automation's day in **Automations**, or ask the bot to.
