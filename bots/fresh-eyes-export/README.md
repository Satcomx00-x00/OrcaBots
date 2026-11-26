# Fresh-eyes user: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 6.

## After install

1. **Answer the bot's first questions:**
   - the app's address;
   - the one job a new user comes for;
   - a **test account**, if that job needs signing in. Never your own account or a real password;
   - which deploy environment to walk after each deploy (`production`, `staging`, …).
2. **Connect GitHub.** Accept the **Connect** card the bot offers, for GitHub deploys and issues. Skip if you don't use GitHub.
3. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks, for GitLab issues. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab. If the sign-in is refused, access to the GitLab MCP server has to be allowed first: by an owner of your top-level group on GitLab.com, or by an administrator on self-managed GitLab.
4. **Add the GitLab webhook** (GitLab deploys only):
   1. Open the bot's **Automations** and find _When a GitLab deploy finishes_. Ask the bot to create it if it isn't there.
   2. Click **Copy URL** on its card.
   3. In GitLab, open the project's **Settings → Webhooks → Add new webhook**, paste the URL, tick **Deployment events** only, and save.
5. **Other deploy tools** (Argo CD, Vercel, …): ask the bot for a webhook routine of its own and add its URL the same way.
6. **Turn the automations on** in **Automations** once the first walk looks right:

   | Automation                                | When                        |
   | ----------------------------------------- | --------------------------- |
   | A walk through the main job               | Wednesdays 10 AM            |
   | When a GitHub deploy finishes             | GitHub, deploy finished     |
   | When a GitLab deploy finishes             | GitLab webhook, deployment  |

## Check it works

- Ask the bot: "Walk the app now." You should get whether it finished the job, in how many steps, and problems sorted as blockers, friction and polish, with screenshots, at desktop and phone size.
- Deploy to the picked environment. The bot should post only blockers and what's new.

## Good to know

- It never pays, sends mail or messages, invites people, deletes anything or submits a form that reaches a real person. It stops at that step and notes it.
- It files issues only when you say so: one per blocker, on GitHub or GitLab.
- It doesn't read your code, docs or tests before a walk.
