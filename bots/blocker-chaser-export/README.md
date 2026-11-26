# Blocker chaser: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 3.

## After install

1. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. If the sign-in is refused, access to the GitLab MCP server has to be allowed first: by an owner of your top-level group on GitLab.com, or by an administrator on self-managed GitLab. Also sign in `glab`, GitLab's command-line tool, on the computer where the bot runs (`glab auth login`): the connector has no call for iterations or weights, so the bot reads those with `glab`.
2. **Answer the bot's first questions:**
   - the GitLab group or project;
   - what a sprint is for your team: an **iteration** or a **milestone**;
   - how long a sprint lasts and which weekday it ends;
   - how you size stories: **weights**, **time estimates**, or not at all (the bot then counts issues);
   - which label means **blocked**;
   - how long is too long: by default three working days quiet for a story, one working day for a review.
3. **Turn the automation on** in **Automations** once the first sweep looks right:

   | Automation                 | When          |
   | -------------------------- | ------------- |
   | What is stuck this morning | Weekdays 9 AM |

## Check it works

- Ask the bot: "What is stuck?" You should get at most ten items, longest wait first, each with how long, who can move it and the smallest next step, or one line saying nothing is stuck.
- Say "draft a nudge for the second one". The bot shows two friendly sentences and posts them only after your yes.

## Good to know

- It looks for blocked stories, quiet stories, merge requests waiting for review or for their author, red pipelines, merge conflicts, unassigned stories and stories not started late in the sprint.
- It names who can unblock, never who caused the wait, and it never totals or compares people's waits.
- An item still stuck the next day comes back as "day 2", not as news.
- It posts nothing on GitLab until you agree, and never nudges the same thing twice in one day.
- Iterations and issue weights are paid GitLab features (Premium or Ultimate). On the free tier, tell the bot you use milestones and no weights; it then counts issues.
- No webhooks: this bot runs on its schedule only.
