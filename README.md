# orca-bots

Importable bots for [Orca](https://github.com/stablyai/orca) that watch your agents and your app.

| Bot                                       | Runs                                                          | What it does                                                                                             |
| ----------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Agent coach](bots/agent-coach-export)    | Fridays 4 PM, and when an agent's PR or MR is closed unmerged | Finds where agents loop, stall or get corrected, and proposes one AGENTS.md / CLAUDE.md rule per pattern |
| [Skill miner](bots/skill-miner-export)    | Mondays 10 AM                                                 | Spots procedures you keep explaining to agents and drafts each as a SKILL.md                             |
| [Fresh-eyes user](bots/fresh-eyes-export) | Wednesdays 10 AM, and after a GitHub or GitLab deploy         | Walks your app like a first-time user, desktop and phone, and reports blockers with screenshots          |

Every bot works with **GitHub** (the GitHub connector, `gh`) and **GitLab** (GitLab's own MCP server, added as the bot's `gitlab` tool). Nothing writes to a repo, files an issue or opens a PR or MR until you say yes.

## Install a bot

Requires Orca with Bots (beta), v1.4.271 or later.

### From a link

In Orca: **New bot → From a link**, paste the bot's link, review what it brings, **Create**.

| Bot             | Link                |
| --------------- | ------------------- |
| Agent coach     | _not published yet_ |
| Skill miner     | _not published yet_ |
| Fresh-eyes user | _not published yet_ |

Orca only opens its own share links (`https://app.orca.dev/bots/share/<id>` or `orca://bots/share/<id>`), never a GitHub or raw file URL. A link is published once from a bot made from this repo's folder (below): open the bot, **Share**, keep everything ticked, copy the link, and put it in the table above. Publish again after changing a bot folder so the link serves the new version.

A link carries the soul, skills, schedules, the GitHub connector, GitHub event routines and the `gitlab` tool. It does not carry webhook routines, so the GitLab merge-request and deploy routines come from the bot itself: its soul offers to create them in its first chat.

### From the folder

1. Clone this repo.
2. In Orca: **Bots → Import from another app… → Another app… → Add its folder**, and pick a folder under `bots/` (for example `bots/agent-coach-export`).
3. **Create** the bot. It reads the folder, shows you a plan, and sets itself up after your yes.

To create the bot on a paired server instead of this computer, copy the folder to that server first.

### What you get

- Its soul, its skills, and its schedules, **paused**. Turn them on in the bot's Automations once the first run looks right.
- GitHub routines wait until you connect GitHub for that bot; it offers the Connect card.
- The `gitlab` tool, signed in once in the browser. For self-managed or Dedicated GitLab, tell the bot your address; it re-adds the tool at `https://<host>/api/v4/mcp`.
- GitLab routines are webhooks: copy the URL from the automation's card (**Copy URL**) into the GitLab project's **Settings → Webhooks**, with **Merge request events** (Agent coach) or **Deployment events** (Fresh-eyes user) ticked.
- No keys or logins: there are none in this repo, and Orca never copies them.

Agent coach and Skill miner read sessions only where **Settings → Agent Session History** is on, one computer at a time.

## Bot folder layout

```text
bots/<name>-export/
├── SOUL.md                 # opening paragraph (what it's for), ## How I work, ## Never
├── ROUTINES.md             # YAML frontmatter: connectors, schedules, events
└── skills/<skill>/SKILL.md # frontmatter name must equal the folder name
```

`ROUTINES.md` frontmatter:

```yaml
connectors: [github] # github | slack | linear | google | composio
tools: # MCP servers the bot adds as its own tools; https only, no keys
  - name: gitlab
    url: https://gitlab.com/api/v4/mcp
schedules:
  - name: "Bot: what it posts"
    cron: "0 16 * * 5" # 5-field cron
    prompt: Do X with the my-skill skill.
events:
  - name: "When X happens: do Y"
    source: github # slack | github | linear | webhook | gmail | calendar
    event: pr_closed # must be an event Orca sends for that source
    prompt: Do Y with the my-skill skill.
  - name: "When GitLab calls: do Z"
    source: webhook # GitLab has no connector: its project webhook calls this routine
    event: call
    prompt: Do Z through the gitlab tool.
```

`bun run validate` checks each folder the way Orca's importer will need it: the sections, the cron syntax, that each event's source sends it and its connector is listed, that every "the X skill" or "the X tool" in a prompt exists under `skills/` or `tools`, and that nothing exceeds what one share link carries. Event names and link limits mirror Orca in [`src/orca-events.ts`](src/orca-events.ts).

## Develop

```sh
bun install
bun run check   # biome, tsc, vitest, validate
prek install    # optional: same checks on commit
```

## License

[MIT](LICENSE)
