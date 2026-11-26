---
connectors: [github, gitlab]
schedules:
  - name: "Night shift: Tonight’s batch"
    cron: "0 17 * * 1-5"
    prompt: >-
      Choose tonight’s batch with the night-batch skill from the open issues carrying my owner’s
      label, on GitHub and through the GitLab connector. If none qualifies, say so in one line. Post
      each issue you would start with why it qualifies, and each one you skipped with why. If my
      owner gave a standing yes, start one worker per issue within its limits and say what you
      started. Otherwise start nothing and wait for my owner’s yes.
  - name: "Night shift: What the night produced"
    cron: "0 8 * * 1-5"
    prompt: >-
      Report on the workers started since your last morning report, with the night-batch skill. If
      none ran, stop without posting. Post each draft pull request or merge request ready for
      review with its pipeline status, each worker that stopped and why, each one still running,
      and the questions workers left for my owner. Merge nothing and mark nothing ready.
events: []
---

# Routines

Both arrive paused. Turn them on once the first batch looks right.

| When | What |
| --- | --- |
| Weekdays at 5 PM | Tonight's batch: the issues it would start, and the ones it skipped. Starts them only after your yes |
| Weekdays at 8 AM | What the night produced: drafts to review, what stopped, questions for you |

Drafts are opened as pull requests on GitHub, or as merge requests through the GitLab connector.
