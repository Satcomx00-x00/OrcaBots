# Cost auditor: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 5.

## After install

1. **Turn on Agent Session History.** Orca **Settings → Agent Session History**, on the computer whose agents you want audited. The bot reads one computer at a time and waits until this is on.
2. **Connect GitHub.** Accept the **Connect** card the bot offers in its first chat, and pick the orgs or repos it may read. Skip if you don't use GitHub.
3. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab.
4. **Tell the bot which repos count.** It uses them to see what each session shipped: merged, open, rejected or nothing.
5. **Turn the automation on** in **Automations** once the first audit looks right:

   | Automation                    | When         |
   | ----------------------------- | ------------ |
   | The week's costliest sessions | Fridays 9 AM |

## Check it works

- Ask the bot: "Audit my last seven days." You should get up to five sessions, each with owner turns, agent turns, hours, what it shipped and one change for next time.
- The second week's report should end with this week's totals beside last week's.

## Good to know

- It counts turns and hours, not money: it can't read token counts. Orca's Stats may show an estimated spend; your provider's console has the real bill.
- It ranks sessions and tasks, never people.
- It changes no file. A suggestion becomes a rule only through a PR or MR you agreed to.
- No webhooks: this bot runs on its schedule only.
