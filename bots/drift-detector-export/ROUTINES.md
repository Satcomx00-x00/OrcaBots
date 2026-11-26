---
connectors: [github, gitlab]
schedules:
  - name: "Drift detector: What differs from Git"
    cron: "0 11 * * 1-5"
    prompt: >-
      Compare my owner’s clusters with what Git says should run, with the drift-check skill, reading
      only, through its read-only script. If a context can change the cluster, stop and say so. Post
      each new difference with what Git says, what the cluster has, when it changed, and whether it
      looks like a fix worth keeping, an accident or something expected. Skip what my owner already
      called expected. If nothing new differs, say so in one line. Change nothing in the cluster,
      and nothing in Git until my owner agrees.
events: []
---

# Routines

Arrives paused. Turn it on once the first comparison looks right.

| When | What |
| --- | --- |
| Weekdays at 11 AM | What in the cluster differs from Git, and what was changed by hand |

Once your owner agrees to keep a change, the bot opens a pull request on GitHub, or a merge request through the GitLab connector, with only that change.
