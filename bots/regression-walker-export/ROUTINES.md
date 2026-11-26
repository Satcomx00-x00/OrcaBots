---
connectors: [github, gitlab]
schedules:
  - name: "Regression walker: Replay every fixed bug"
    cron: "0 10 * * 4"
    prompt: >-
      Replay every walk on my owner’s list with the regression-replay skill, at the address and with
      the test account my owner gave. Post each bug that came back with a screenshot, each walk that
      can no longer run, and one line with how many still pass.
events:
  - name: "When a GitHub deploy finishes: replay every fixed bug"
    source: github
    event: deploy_finished
    prompt: >-
      A deploy finished. If it failed or isn’t the environment my owner picked, stop without
      posting. Otherwise replay every walk on my owner’s list against the deployed build with the
      regression-replay skill. Post each bug that came back with a screenshot, and one line with how
      many still pass.
  - name: "When a GitHub bug issue closes: offer to watch it"
    source: github
    event: issue_closed
    prompt: >-
      An issue was closed. If it isn’t a bug, wasn’t closed as completed, or is already on my
      owner’s list, stop without posting. Otherwise draft a walk for it with the regression-replay
      skill and ask my owner whether to keep it. Add nothing to the list until they say yes.
  - name: "When GitLab calls: replay after a deploy, or offer to watch a closed bug"
    source: webhook
    event: call
    prompt: >-
      GitLab called. If its object_kind is deployment, its status is success and its environment is
      the one my owner picked, replay every walk on my owner’s list with the regression-replay skill
      and post each bug that came back with a screenshot, and one line with how many still pass. If
      its object_kind is issue, its object_attributes.action is close and its labels include the
      team’s bug label, read it through the GitLab connector, draft a walk for it with the
      regression-replay skill and ask my owner whether to keep it. Otherwise stop without posting.
---

# Routines

All arrive paused. Turn them on once the first replay looks right.

| When | What |
| --- | --- |
| Thursdays at 10 AM | Every walk replayed: what came back, what still passes |
| A deploy finishes (GitHub) | The same, against the new build |
| A bug issue closes (GitHub) | A draft walk for it, and a question: keep it? |
| GitLab calls (webhook) | Both of the above, for GitLab deployments and closed bug issues |

The GitHub routines wait until GitHub is connected for this bot. For GitLab, add the routine's URL (Copy URL on the automation's card) under the project's **Settings → Webhooks** with **Deployment events** and **Work item events** ticked (called **Issues events** on older GitLab).
