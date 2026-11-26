---
connectors: [github, gitlab]
schedules:
  - name: "Accessibility walker: The main job, keyboard only and zoomed"
    cron: "0 10 * * 2"
    prompt: >-
      Walk my owner’s app with the accessibility-walkthrough skill, at the address and with the test
      account my owner gave: keyboard only, then at 200% zoom, then each page’s names and contrast.
      Post whether you finished the main job by keyboard and what got in the way, with screenshots
      and the WCAG criterion each problem fails. Post only what changed since the last walk, unless
      it’s a blocker.
events:
  - name: "When a GitHub deploy finishes: walk the new build for accessibility"
    source: github
    event: deploy_finished
    prompt: >-
      A deploy finished. If it failed or isn’t the environment my owner picked, stop without posting.
      Otherwise walk the deployed build with the accessibility-walkthrough skill and post only
      blockers and what’s new since the last walk, with screenshots.
  - name: "When a GitLab deploy finishes: walk the new build for accessibility"
    source: webhook
    event: call
    prompt: >-
      GitLab called with a deployment event. If its object_kind isn’t deployment, its status isn’t
      success, or its environment isn’t the one my owner picked, stop without posting. Otherwise walk
      the deployed build with the accessibility-walkthrough skill and post only blockers and what’s
      new since the last walk, with screenshots.
---

# Routines

All arrive paused. Turn them on once the first walk looks right.

| When | What |
| --- | --- |
| Tuesdays at 10 AM | The main job by keyboard and at 200% zoom, plus names and contrast |
| A deploy finishes (GitHub) | A walk of the new build: blockers and what's new |
| A deploy finishes (GitLab webhook) | The same, for GitLab environments |

The GitHub routine waits until GitHub is connected for this bot. For GitLab, add the routine's URL (Copy URL on the automation's card) under the project's **Settings → Webhooks** with **Deployment events** ticked.
