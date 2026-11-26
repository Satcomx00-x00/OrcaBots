# Copy checker: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 5.

## After install

1. **Answer the bot's first questions:**
   - the app's address;
   - pages to skip;
   - a **test account**, if pages need signing in. Never your own account or a real password;
   - the app's language and spelling (US or UK English, for instance);
   - a list of product terms, if you have one.
2. **Connect GitHub.** Accept the **Connect** card the bot offers in its first chat, and pick the orgs or repos it may file issues in or fix text in. Skip if you don't use GitHub.
3. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab.
4. **Tell the bot where the app's code lives,** if you want text fixes as a PR or MR and not only a list.
5. **Turn the automation on** in **Automations** once the first list looks right:

   | Automation                                 | When           |
   | ------------------------------------------ | -------------- |
   | Typos, mixed-up names and unhelpful errors | Thursdays 2 PM |

## Check it works

- Ask the bot: "Read the app now." You should get at most thirty findings grouped by kind, each with its page, the text as written and the suggested text.
- Say "fix the typos" or "file it as an issue". The bot opens one PR or MR with only the text changes you kept, or files one issue with the list.

## Good to know

- It flags mistakes, not style: no rewriting of tone or marketing copy.
- Legal text (terms, privacy, licences) is flagged and never edited.
- It reads up to 40 pages per run, on the same site only.
- To see error messages it submits made-up input only where that reaches no real person (sign-in, search, a field's own validation).
- No webhooks: this bot runs on its schedule only.
