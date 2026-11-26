---
connectors: [github, gitlab]
schedules:
  - name: "Cluster sweeper: What nobody uses any more"
    cron: "0 14 * * 2"
    prompt: >-
      Sweep my owner’s clusters for leftovers with the cluster-sweep skill, reading only. Post at
      most twenty, biggest first, each with what it is, how old, why it looks unused, how sure you
      are and how to remove it. For review namespaces, check on GitHub or through the GitLab
      connector that the pull request or merge request behind each is closed. Skip what my owner
      said to keep. Delete nothing, and change nothing in Git until my owner agrees.
events: []
---

# Routines

Arrives paused. Turn it on once the first sweep looks right.

| When | What |
| --- | --- |
| Tuesdays at 2 PM | Up to twenty leftovers, with how sure the bot is and how to remove each |

The bot never deletes. For a leftover defined in Git it opens a pull request on GitHub, or a merge request through the GitLab connector, once your owner agrees. For the rest it gives the command to run.
