# Regression walker: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 6.

## After install

1. **Answer the bot's first questions:**
   - the app's address;
   - a **test account**, if pages need signing in. Never your own account or a real password;
   - which deploy environment to walk (`production`, `staging`, …).
2. **Connect GitHub.** Accept the **Connect** card the bot offers in its first chat, and pick the orgs or repos it may read deploys and issues from. Skip if you don't use GitHub.
3. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks, for GitLab issues. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab. If the sign-in is refused, access to the GitLab MCP server has to be allowed first: by an owner of your top-level group on GitLab.com, or by an administrator on self-managed GitLab.
4. **Give the bot its first bugs:** links to fixed bug issues, or a description of each. It turns each into a walk, replays it once to see it pass today, and asks before keeping it.
5. **Add the GitLab webhook** (GitLab only):
   1. Open the bot's **Automations** and find _When GitLab calls_. Ask the bot to create it if it isn't there.
   2. Click **Copy URL** on its card.
   3. In GitLab, open the project's **Settings → Webhooks → Add new webhook**, paste the URL, tick **Deployment events** and **Work item events** (called **Issues events** on older GitLab), and save.
   4. Repeat step 3 for each GitLab project.
6. **Turn the automations on** in **Automations** once the first replay looks right:

   | Automation                     | When                                       |
   | ------------------------------ | ------------------------------------------ |
   | Replay every fixed bug         | Thursdays 10 AM                            |
   | When a GitHub deploy finishes  | GitHub, deploy finished                    |
   | When a GitHub bug issue closes | GitHub, issue closed                       |
   | When GitLab calls              | GitLab webhook, deployment or issue closed |

## Check it works

- Ask the bot: "Show me the list", then "Replay everything now." You should get one line like "12 of 12 still fixed", or each bug that came back with a screenshot.
- Close a bug issue. The bot should draft a walk for it and ask whether to keep it.
- Deploy to the picked environment. The bot should replay the list against the new build.

## Good to know

- The list lives in the bot's memory. It adds, changes or drops a walk only after your yes.
- A walk that can't run because the page changed is reported as "can't run" with updated steps, not as a regression.
- It skips bugs that can't be seen in a browser, and says why.
- It never pays, sends mail or messages, invites people, deletes anything or submits a form that reaches a real person.
- It reopens or files an issue only when you say so.
