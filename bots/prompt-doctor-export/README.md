# Prompt doctor: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 5.

## After install

1. **Turn on Agent Session History.** Orca **Settings → Agent Session History**, on the computer whose agents you want reviewed. The bot reads one computer at a time and waits until this is on.
2. **Tell the bot where templates go:** a folder in a repo (for example `prompts/`), or only in its chat.
3. **Connect GitHub.** Accept the **Connect** card the bot offers in its first chat, and pick the orgs or repos it may add templates to. Skip if you don't use GitHub, or if templates stay in the chat.
4. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab. If the sign-in is refused, access to the GitLab MCP server has to be allowed first: by an owner of your top-level group on GitLab.com, or by an administrator on self-managed GitLab.
5. **Turn the automation on** in **Automations** once you've seen the first templates:

   | Automation                              | When         |
   | --------------------------------------- | ------------ |
   | Openings that needed the most follow-up | Mondays 9 AM |

## Check it works

- Ask the bot: "Review last week's openings." You should get up to three kinds of request, each with the sessions behind it, what the opening left out, and a template.
- Pick one. The bot opens one pull request (GitHub) or merge request (GitLab) adding only that file.

## Good to know

- It writes nothing to a repo until you pick a template.
- Hostnames, tokens and secrets from transcripts become placeholders.
- It needs a week with several task sessions to find a pattern: a kind of request counts from two weak openings.
- No webhooks: this bot runs on its schedule only.
