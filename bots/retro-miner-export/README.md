# Retro miner: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 4.

## After install

1. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`.
2. **Answer the bot's first questions:**
   - the GitLab group or project;
   - what a sprint is for your team: an **iteration** or a **milestone**;
   - how long a sprint lasts and which weekday it ends;
   - how you size stories: **weights**, **time estimates**, or not at all (the bot then counts issues);
   - which label marks retro actions (by default `retro-action`).
3. **Match the schedule to your sprints.** The automation runs on Fridays at 2 PM and stays quiet unless a sprint ends within three days, or ended in the last three. If your sprints end on another weekday, change its day in **Automations**, or ask the bot to.
4. **Turn the automation on** in **Automations** once the first set of facts looks right:

   | Automation                       | When                                     |
   | -------------------------------- | ---------------------------------------- |
   | The sprint's facts for the retro | Fridays 2 PM, around the end of a sprint |

## Check it works

- Ask the bot: "Prepare the retro." You should get last retro's actions and where each stands, one table of the sprint's numbers beside the last three sprints, three talking points as questions, and one thing that got better.
- After the retro, tell the bot what the team decided. It shows each action as an issue and creates them only after your yes.

## Good to know

- The comparison with earlier sprints fills in over time: the first report has only this sprint's numbers.
- All numbers are for the whole team. It never gives or compares numbers per person, and leaves names out.
- It shows what happened, not why. The why is the team's.
- It creates nothing on GitLab until you agree.
- Iterations and issue weights are paid GitLab features (Premium or Ultimate). On the free tier, tell the bot you use milestones and no weights; it then counts issues.
- No webhooks: this bot runs on its schedule only.
