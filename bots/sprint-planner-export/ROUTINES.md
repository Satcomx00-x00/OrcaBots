---
connectors: [gitlab]
schedules:
  - name: "Sprint planner: A draft of the next sprint"
    cron: "0 10 * * 5"
    prompt: >-
      If the active sprint doesn’t end within the next four days, stop without posting. Otherwise
      propose the next sprint with the sprint-planning skill, reading the backlog through the GitLab
      connector: a one-sentence goal, the stories that are ready and fit the team’s velocity over the
      last three sprints, what carries over, what you left out and why, and the risks. Change nothing
      on GitLab until my owner agrees.
events: []
---

# Routines

Arrives paused. Turn it on once the first draft looks right.

| When | What |
| --- | --- |
| Fridays at 10 AM, only when the sprint ends within four days | A draft of the next sprint, sized to the team's velocity |

If your sprints end on another day, change this automation's day in **Automations**, or ask the bot to.
