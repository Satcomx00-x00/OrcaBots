# Agent coach: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 6.

## After install

1. **Turn on Agent Session History.** Orca **Settings → Agent Session History**, on the computer whose agents you want reviewed. The bot reads one computer at a time and waits until this is on.
2. **Connect GitHub.** Accept the **Connect** card the bot offers in its first chat, and pick the orgs or repos it may read. Skip if you don't use GitHub.
3. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab. If the sign-in is refused, access to the GitLab MCP server has to be allowed first: by an owner of your top-level group on GitLab.com, or by an administrator on self-managed GitLab.
4. **Tell the bot which repos** it may propose rules for.
5. **Add the GitLab webhook** (GitLab only):
   1. Open the bot's **Automations** and find _When an agent's merge request is closed unmerged_. Ask the bot to create it if it isn't there.
   2. Click **Copy URL** on its card.
   3. In GitLab, open the project's **Settings → Webhooks → Add new webhook**, paste the URL, tick **Merge request events** only, and save.
   4. Repeat step 3 for each GitLab project.
6. **Turn the automations on** in **Automations** once the first review looks right:

   | Automation                                             | When                     |
   | ------------------------------------------------------ | ------------------------ |
   | The week's costliest agent patterns                    | Fridays 4 PM             |
   | When an agent's pull request is closed unmerged        | GitHub, PR closed        |
   | When an agent's merge request is closed unmerged       | GitLab webhook, MR closed |

## Check it works

- Ask the bot: "Review my last seven days." You should get at most three patterns, each with session IDs and one proposed rule.
- Close an agent's test PR or MR without merging. Within a minute the bot should post two lines on why it was rejected.

## Good to know

- It changes no file and opens no PR or MR until you agree to a rule.
- Every closed PR or MR costs the bot a turn, even the ones it skips.
