# Rule keeper: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 6.

## After install

1. **Connect GitHub.** Accept the **Connect** card the bot offers in its first chat, and pick the orgs or repos it may watch. Skip if you don't use GitHub.
2. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab.
3. **Tell the bot which repos to watch.** It reads the `AGENTS.md` and `CLAUDE.md` files in each, root and subfolders.
4. **Add the GitLab webhook** (GitLab only):
   1. Open the bot's **Automations** and find _When an agent opens a merge request_. Ask the bot to create it if it isn't there.
   2. Click **Copy URL** on its card.
   3. In GitLab, open the project's **Settings → Webhooks → Add new webhook**, paste the URL, tick **Merge request events** only, and save.
   4. Repeat step 3 for each GitLab project.
5. **Turn on Agent Session History.** Orca **Settings → Agent Session History**, on the computer whose agents you want checked. Only the monthly review needs it, one computer at a time; the checks on each PR or MR work without.
6. **Turn the automations on** in **Automations** once the first check looks right:

   | Automation                               | When                      |
   | ---------------------------------------- | ------------------------- |
   | When an agent opens a pull request       | GitHub, PR opened         |
   | When an agent opens a merge request      | GitLab webhook, MR opened |
   | Rules nobody needed, rules always broken | 1st of the month, 10 AM   |

## Check it works

- Have an agent open a test PR or MR that breaks one written rule. Within a minute the bot should post that rule, the file and line that broke it, and where the rule is written.
- Open one that follows every rule. The bot should post nothing.
- Ask the bot: "Which rules are dead weight?" You should get at most ten proposals, each with its numbers.

## Good to know

- It never approves, requests changes on, merges or closes a PR or MR.
- It posts in its chat. Ask it to comment on the PR or MR itself if you want that.
- It checks only what is written, and only what a diff can show. Rules about how the agent worked are listed as "can't tell".
- It only checks PRs and MRs made from your Orca workspaces. Every opened one costs the bot a turn, even the ones it skips.
