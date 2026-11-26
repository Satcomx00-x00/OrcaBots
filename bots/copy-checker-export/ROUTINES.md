---
connectors: [github, gitlab]
schedules:
  - name: "Copy checker: Typos, mixed-up names and unhelpful errors"
    cron: "0 14 * * 4"
    prompt: >-
      Read my owner’s app with the copy-review skill, at the address and with the test account my
      owner gave. Post typos, things called by two names, placeholder text and error messages that
      don’t say what to do next, each with its page, the text as written and the text you suggest.
      Post only what is new since the last time. Change no file until my owner agrees.
events: []
---

# Routines

Arrives paused. Turn it on once the first list looks right.

| When | What |
| --- | --- |
| Thursdays at 2 PM | New typos, mixed-up names, placeholder text and unhelpful errors |

Once your owner agrees, the bot files one issue with the list, or opens a pull request on GitHub, or a merge request through the GitLab connector, with only the text fixes.
