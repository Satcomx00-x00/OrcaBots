---
connectors: [gitlab]
schedules:
  - name: "Sprint guardian: On track or not"
    cron: "30 9 * * 1-5"
    prompt: >-
      Compare the active sprint with what the team committed to, with the sprint-scope-watch skill,
      reading it through the GitLab connector. If no sprint is active, stop without posting. If a
      new sprint started, save what is in it as the commitment. Post one line: on track, at risk or
      off track, with the numbers. List what was added, removed or resized since yesterday, and for
      each addition which not-started stories could come out. Change nothing on GitLab until my
      owner agrees.
events:
  - name: "When an issue enters the sprint: say what it costs"
    source: webhook
    event: call
    prompt: >-
      GitLab called with an issue event. If its object_kind isn’t issue, stop without posting. Read
      the issue through the GitLab connector. If it isn’t in the active sprint, or it is already on
      the list you saved for this sprint, stop without posting. Otherwise say with the
      sprint-scope-watch skill how big it is, what it does to the forecast, and which not-started
      stories of about the same size could come out. Move nothing until my owner agrees.
---

# Routines

All arrive paused. Turn them on once the first morning line looks right.

| When | What |
| --- | --- |
| Weekdays at 9:30 AM | One line: on track, at risk or off track, and what changed since yesterday |
| An issue enters the sprint (GitLab webhook, optional) | What the addition costs, and what could come out |

The webhook routine needs its URL (Copy URL on the automation's card) added under the project's **Settings → Webhooks** with **Issue events** ticked. Without it, the morning check still finds additions, a day later.
