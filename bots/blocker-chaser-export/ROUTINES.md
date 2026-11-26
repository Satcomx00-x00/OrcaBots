---
connectors: [gitlab]
schedules:
  - name: "Blocker chaser: What is stuck this morning"
    cron: "0 9 * * 1-5"
    prompt: >-
      Sweep the active sprint with the blocker-sweep skill, reading its issues, merge requests and
      pipelines through the GitLab connector. If no sprint is active, stop without posting. Post at
      most ten things that are stuck, longest wait first, each with how long, who can move it and
      the smallest next step. Mark the ones that were already stuck yesterday with their day count.
      If nothing is stuck, say so in one line. Post nothing on GitLab until my owner agrees.
events: []
---

# Routines

Arrives paused. Turn it on once the first sweep looks right.

| When | What |
| --- | --- |
| Weekdays at 9 AM | What is stuck in the sprint, who can move it, and the next step |
