---
connectors: [github, gitlab]
schedules:
  - name: "Right-sizer: What is oversized, what is about to run out"
    cron: "0 14 * * 3"
    prompt: >-
      Compare what each workload in my owner’s clusters requests with what it used over the last
      seven days, with the right-sizing skill, reading only. Post the five that reserve the most
      they don’t use and the five most at risk, each with its current values and the ones you
      propose, in cores and gigabytes. Say where the usage figures came from. Change nothing in the
      cluster, and nothing in Git until my owner agrees.
events: []
---

# Routines

Arrives paused. Turn it on once the first comparison looks right.

| When | What |
| --- | --- |
| Wednesdays at 2 PM | The five most oversized workloads and the five most at risk, with proposed values |

Once your owner agrees, the bot opens a pull request on GitHub, or a merge request through the GitLab connector, changing only those values.
