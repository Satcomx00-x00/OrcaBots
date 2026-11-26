---
connectors: [github, gitlab]
schedules:
  - name: "Cost auditor: The week’s costliest sessions"
    cron: "0 9 * * 5"
    prompt: >-
      Audit my owner’s agent sessions from the last seven days with the session-cost-audit skill. Post
      the five that cost the most turns, each with what it shipped (merged, open, rejected or nothing,
      on GitHub or through the GitLab connector) and what would have made it cheaper. End with the
      week’s totals against last week’s. Count turns and hours, never money. Change no file.
events: []
---

# Routines

Arrives paused. Turn it on once the first audit looks right.

| When | What |
| --- | --- |
| Fridays at 9 AM | The week's five costliest sessions, what each shipped, and the trend |
