# Accessibility walker: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 5.

## After install

1. **Answer the bot's first questions:**
   - the app's address;
   - the one job a user comes for;
   - a **test account**, if pages need signing in. Never your own account or a real password;
   - which deploy environment to walk after each deploy (`production`, `staging`, …).
2. **Connect GitHub.** Accept the **Connect** card the bot offers in its first chat, and pick the orgs or repos it may read deploys from and file issues in. Skip if you don't use GitHub.
3. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks, for GitLab issues. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab.
4. **Add the GitLab webhook** (GitLab deploys only):
   1. Open the bot's **Automations** and find _When a GitLab deploy finishes_. Ask the bot to create it if it isn't there.
   2. Click **Copy URL** on its card.
   3. In GitLab, open the project's **Settings → Webhooks → Add new webhook**, paste the URL, tick **Deployment events** only, and save.
5. **Turn the automations on** in **Automations** once the first walk looks right:

   | Automation                             | When                       |
   | -------------------------------------- | -------------------------- |
   | The main job, keyboard only and zoomed | Tuesdays 10 AM             |
   | When a GitHub deploy finishes          | GitHub, deploy finished    |
   | When a GitLab deploy finishes          | GitLab webhook, deployment |

## Check it works

- Ask the bot: "Walk the app now." You should get whether it finished the job by keyboard, and problems sorted as blockers, friction and polish, each with its WCAG 2.2 criterion and a screenshot.
- Deploy to the picked environment. The bot should post only blockers and what's new.

## Good to know

- A walk finds problems; it can't prove there are none. The bot never calls the app accessible or compliant, and it doesn't replace an audit or testing with a screen reader.
- It covers keyboard use, 200% and 400% zoom, names, headings, images, contrast, error messages and target size on the pages of the main job.
- It never pays, sends mail or messages, invites people, deletes anything or submits a form that reaches a real person.
- It files issues only when you say so: one per blocker, on GitHub or GitLab.
