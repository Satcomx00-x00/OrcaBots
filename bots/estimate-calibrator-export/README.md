# Estimate calibrator: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 4.

## After install

1. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`.
2. **Answer the bot's first questions:**
   - the GitLab group or project;
   - what a sprint is for your team: an **iteration** or a **milestone**;
   - how long a sprint lasts and which weekday it ends;
   - how you size stories: **weights**, **time estimates**, or not at all (the bot then counts issues);
   - the labels you use for bugs, features and areas, if any.
3. **Match the schedule to your sprints.** The automation runs on Mondays at 11 AM and stays quiet unless a sprint ended in the last seven days. If your sprints end on another weekday, change its day in **Automations**, or ask the bot to.
4. **Turn the automation on** in **Automations** once the first comparison looks right:

   | Automation                     | When                                                |
   | ------------------------------ | --------------------------------------------------- |
   | Estimates against what it took | Mondays 11 AM, when a sprint ended in the last week |

## Check it works

- Ask the bot: "Calibrate the last sprint." You should get how many stories landed in range, up to three kinds of story the team underestimated with examples, and one sizing rule for each.
- After two or three sprints, the report should say whether a rule you tried brought that kind of story closer.

## Good to know

- It needs at least five sized, closed stories in a sprint. With fewer it records them and says there isn't enough to judge.
- Patterns are by kind of story, never by person. Assignees are left out of the report.
- It never changes a weight or an estimate on GitLab.
- Cycle time includes waiting: a story that mostly waited for review is reported as waiting, not as underestimated.
- Iterations and issue weights are paid GitLab features (Premium or Ultimate). On the free tier, tell the bot you use milestones and no weights; it then counts issues.
- No webhooks: this bot runs on its schedule only.
