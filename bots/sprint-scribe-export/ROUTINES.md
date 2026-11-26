---
connectors: [gitlab]
schedules:
  - name: "Sprint scribe: Log today’s work on the board"
    cron: "30 17 * * 1-5"
    prompt: >-
      Gather what my owner worked on today with the work-log skill: their agent sessions, commits,
      workspaces and GitLab activity, in the projects they named. For work that belongs to one of
      their issues in the active sprint, edit that issue’s one tracking note in place; create the
      note only if the issue has none. For unplanned work, create an issue to the skill’s standard,
      assigned to my owner, in the current sprint, labeled unplanned, with its tracking note. Work
      through the GitLab connector and glab. Never post a second note on an issue, and never touch
      an issue that isn’t my owner’s. If my owner hasn’t approved a first preview yet, write nothing
      and show what you would write. End with a short summary: updated, created, couldn’t place.
events: []
---

# Routines

Arrives paused. Turn it on once the first preview looks right.

| When | What |
| --- | --- |
| Weekdays at 5:30 PM | Today's work logged on the board: tracking notes edited in place, and an issue for each piece of unplanned work |

You can also tell the bot about work at any time, in a line: "side quest: reviewed the billing export for Dana, about an hour". It logs it straight away.
