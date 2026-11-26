---
connectors: [gitlab]
schedules:
  - name: "Retro miner: The sprint’s facts for the retro"
    cron: "0 14 * * 5"
    prompt: >-
      If the active sprint doesn’t end within the next three days and none ended in the last three,
      stop without posting. Otherwise gather the sprint’s facts with the retro-facts skill, reading
      its issues, merge requests and pipelines through the GitLab connector. Post last retro’s
      actions and where each stands, the sprint’s numbers beside the last three sprints, three
      talking points as questions, and one thing that got better. Never give numbers per person.
      Create nothing on GitLab until my owner agrees.
events: []
---

# Routines

Arrives paused. Turn it on once the first set of facts looks right.

| When | What |
| --- | --- |
| Fridays at 2 PM, only around the end of a sprint | Last retro's actions, the sprint's numbers against the last three, and three talking points |

If your sprints end on another day, change this automation's day in **Automations**, or ask the bot to.
