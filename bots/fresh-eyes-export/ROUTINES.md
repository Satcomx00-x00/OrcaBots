---
connectors: [github]
schedules:
  - name: "Fresh-eyes user: A walk through the main job"
    cron: "0 10 * * 3"
    prompt: >-
      Walk my owner’s app as a first-time user with the fresh-eyes-walkthrough skill, at the address
      and with the test account my owner gave. Post whether you finished the main job and what got in
      the way, with screenshots. Post only what changed since the last walk, unless it’s a blocker.
events:
  - name: "When a deploy finishes: walk the new build"
    source: github
    event: deploy_finished
    prompt: >-
      A deploy finished. If it failed or isn’t the environment my owner picked, stop without posting.
      Otherwise walk the deployed build with the fresh-eyes-walkthrough skill and post only blockers
      and what’s new since the last walk, with screenshots.
---

# Routines

Both arrive paused. Turn them on once the first walk looks right.

| When | What |
| --- | --- |
| Wednesdays at 10 AM | A walk through the main job, desktop and phone |
| A deploy finishes (GitHub) | A walk of the new build: blockers and what's new |

The deploy routine waits until GitHub is connected for this bot. To walk deploys from another tool (GitLab, Argo CD), ask the bot for a webhook routine instead.
