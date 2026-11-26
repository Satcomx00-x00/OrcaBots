# Skill miner: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 5.

## After install

1. **Turn on Agent Session History.** Orca **Settings → Agent Session History**, on the computer whose agents you want mined. The bot reads one computer at a time and waits until this is on.
2. **Connect GitHub.** Accept the **Connect** card the bot offers in its first chat, and pick the orgs or repos it may write skills to. Skip if you don't use GitHub.
3. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab.
4. **Tell the bot which repos** it may add skills to.
5. **Turn the automation on** in **Automations** once the first drafts look right:

   | Automation                | When          |
   | ------------------------- | ------------- |
   | Up to three skill drafts  | Mondays 10 AM |

## Check it works

- Ask the bot: "Mine my last two weeks of sessions." You should get up to three candidates, each with the sessions behind it and a draft SKILL.md.
- Pick one. The bot opens one pull request (GitHub) or merge request (GitLab) with only that skill.

## Good to know

- It writes nothing to a repo until you pick a draft.
- Hostnames, tokens and secrets from transcripts become placeholders in the draft.
- No webhooks: this bot runs on its schedule only.
