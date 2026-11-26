---
connectors: [github]
tools:
  - name: gitlab
    url: https://gitlab.com/api/v4/mcp
schedules:
  - name: "Fresh-eyes user: A walk through the main job"
    cron: "0 10 * * 3"
    prompt: >-
      Walk my owner’s app as a first-time user with the fresh-eyes-walkthrough skill, at the address
      and with the test account my owner gave. Post whether you finished the main job and what got in
      the way, with screenshots. Post only what changed since the last walk, unless it’s a blocker.
events:
  - name: "When a GitHub deploy finishes: walk the new build"
    source: github
    event: deploy_finished
    prompt: >-
      A deploy finished. If it failed or isn’t the environment my owner picked, stop without posting.
      Otherwise walk the deployed build with the fresh-eyes-walkthrough skill and post only blockers
      and what’s new since the last walk, with screenshots.
  - name: "When a GitLab deploy finishes: walk the new build"
    source: webhook
    event: call
    prompt: >-
      GitLab called with a deployment event. If its object_kind isn’t deployment, its status isn’t
      success, or its environment isn’t the one my owner picked, stop without posting. Otherwise walk
      the deployed build with the fresh-eyes-walkthrough skill and post only blockers and what’s new
      since the last walk, with screenshots.
---

# Routines

All arrive paused. Turn them on once the first walk looks right.

| When | What |
| --- | --- |
| Wednesdays at 10 AM | A walk through the main job, desktop and phone |
| A deploy finishes (GitHub) | A walk of the new build: blockers and what's new |
| A deploy finishes (GitLab webhook) | The same, for GitLab environments |

The GitHub routine waits until GitHub is connected for this bot. For GitLab, add the routine's URL (Copy URL on the automation's card) under the project's **Settings → Webhooks** with **Deployment events** ticked. To walk deploys from another tool (Argo CD, Vercel), ask the bot for a webhook routine of its own.
