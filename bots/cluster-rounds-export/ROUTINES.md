---
connectors: [github, gitlab]
schedules:
  - name: "Cluster rounds: What broke since yesterday"
    cron: "30 8 * * 1-5"
    prompt: >-
      Do the rounds of my owner’s clusters with the cluster-rounds skill, reading only. Post at most
      ten problems, production first, each with what is wrong, since when, the likely cause and the
      next step. Mark the ones that were already there yesterday with their day count, and list what
      recovered. If nothing is wrong, say so in one line. Change nothing in the cluster and file
      nothing until my owner agrees.
events: []
---

# Routines

Arrives paused. Turn it on once the first rounds look right.

| When | What |
| --- | --- |
| Weekdays at 8:30 AM | What broke or got worse since yesterday, with the likely cause and the next step |
