# Sprint guardian: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 4.

## After install

1. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`.
2. **Answer the bot's first questions:**
   - the GitLab group or project;
   - what a sprint is for your team: an **iteration** or a **milestone**;
   - how long a sprint lasts and which weekday it ends;
   - how you size stories: **weights**, **time estimates**, or not at all (the bot then counts issues);
   - the labels you use for priority, if any.
3. **Add the GitLab webhook** (optional: it tells the bot about additions right away):
   1. Open the bot's **Automations** and find _When an issue enters the sprint_. Ask the bot to create it if it isn't there.
   2. Click **Copy URL** on its card.
   3. In GitLab, open the project's **Settings → Webhooks → Add new webhook**, paste the URL, tick **Issue events** only, and save.

   Without it, the morning check still finds additions, a day later.
4. **Turn the automations on** in **Automations** once the first morning line looks right:

   | Automation                      | When                        |
   | ------------------------------- | --------------------------- |
   | On track or not                 | Weekdays 9:30 AM            |
   | When an issue enters the sprint | GitLab webhook, issue event |

## Check it works

- Ask the bot: "Where does the sprint stand?" You should get one line such as "At risk: 21 of 34 points left with 4 days to go", with the numbers behind it.
- Add a story to the sprint. The bot should say its size, the verdict before and after, and which not-started stories could come out.
- Say "take those two out". The bot moves exactly those, with a comment on each.

## Good to know

- What the team committed to is what is in the sprint the first time the bot looks at it. Install it at the start of a sprint, or tell it what was added before it arrived.
- It gives no verdict in the first two days of a sprint: there is no pace yet.
- With the webhook on, every issue change in the project costs the bot a turn, even the ones it skips. Leave the webhook off on a busy project and rely on the morning check.
- It never refuses an addition. It says what it costs; you decide.
- Iterations and issue weights are paid GitLab features, as far as we know. On the free tier, tell the bot you use milestones and no weights; it then counts issues.
