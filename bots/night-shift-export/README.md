# Night shift: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 7.

## After install

1. **Add your repos as Orca projects** on the computer (or paired server) where the agents will run. The bot can only start workers in projects Orca knows.
2. **Connect GitHub.** Accept the **Connect** card the bot offers in its first chat, and pick the orgs or repos it may work in. Skip if you don't use GitHub.
3. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab. If the sign-in is refused, access to the GitLab MCP server has to be allowed first: by an owner of your top-level group on GitLab.com, or by an administrator on self-managed GitLab.
4. **Answer the bot's first questions:**
   - which projects it may work in;
   - the label that marks an issue ready for an agent (default `agent-ready`);
   - how many workers a night (default three);
   - which agent to use (default your own).
5. **Label a few issues.** Pick small ones that say what done looks like. Create the label in GitHub or GitLab first if it doesn't exist.
6. **Decide how it asks.** By default it posts the batch at 5 PM and waits for your yes. To let it start on its own, tell it so with a limit, such as "up to three a night without asking". Take that back at any time.
7. **Turn the automations on** in **Automations** once the first batch looks right:

   | Automation              | When          |
   | ----------------------- | ------------- |
   | Tonight's batch         | Weekdays 5 PM |
   | What the night produced | Weekdays 8 AM |

## Check it works

- Label one small issue and ask the bot: "Run tonight's batch now." You should get the issue, why it qualifies and what the agent will be told. Say yes.
- A new workspace should appear under the bot with an agent working in it.
- When the agent finishes, a **draft** pull request or merge request linked to the issue should appear, saying what changed, how it was checked and what the agent wasn't sure of.
- Ask: "What did the night produce?" You should get the drafts with their pipeline status, anything that stopped, and any questions.

## Good to know

- The computer or paired server that runs the agents must stay on overnight.
- Workers use your agent plan's usage. Lower the nightly limit if you hit your plan's limits in the morning.
- Everything it opens is a draft. It never merges, approves, marks ready or pushes to the default branch.
- It skips issues about secrets, access, billing, CI configuration, infrastructure, data migrations or deleting data, and issues assigned to a person, even when they carry the label.
- It never starts the same issue twice unless you ask, and never closes, relabels or reassigns an issue.
- A worker that isn't sure stops and reports instead of guessing; its question comes to you in the morning.
- No webhooks: this bot runs on its schedules only.
