# Sprint planner: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 4.

## After install

1. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`.
2. **Answer the bot's first questions:**
   - the GitLab group or project;
   - what a sprint is for your team: an **iteration** or a **milestone**;
   - how long a sprint lasts and which weekday it ends;
   - how you size stories: **weights**, **time estimates**, or not at all (the bot then counts issues);
   - how the backlog is ordered: board order, priority labels, or a list you give;
   - who is away next sprint.
3. **Match the schedule to your sprints.** The automation runs on Fridays at 10 AM and stays quiet unless the sprint ends within four days. If your sprints end on another weekday, change its day in **Automations**, or ask the bot to.
4. **Turn the automation on** in **Automations** once the first draft looks right:

   | Automation                 | When                                                 |
   | -------------------------- | ---------------------------------------------------- |
   | A draft of the next sprint | Fridays 10 AM, when the sprint ends within four days |

## Check it works

- Ask the bot: "Draft the next sprint." You should get a one-sentence goal, the stories in with sizes and reasons, the total against capacity, what carries over, what isn't ready and why, and the risks.
- Say "go with it, without the last two". The bot puts exactly the agreed stories in the next sprint and confirms with the list.

## Good to know

- It needs closed sprints to work out velocity. With fewer than three it says so and uses what there is.
- It never plans above capacity, and never gives an unsized story a size.
- It changes nothing on GitLab until you agree, and then only which sprint a story is in.
- Iterations and issue weights are paid GitLab features (Premium or Ultimate). On the free tier, tell the bot you use milestones and no weights; it then counts issues.
- No webhooks: this bot runs on its schedule only.
