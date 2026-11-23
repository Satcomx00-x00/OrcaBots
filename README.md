# orca-bots

Importable bots for [Orca](https://github.com/stablyai/orca) that watch your agents and your app.

| Bot                                       | Runs                                                    | What it does                                                                                             |
| ----------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Agent coach](bots/agent-coach-export)    | Fridays 4 PM, and when an agent's PR is closed unmerged | Finds where agents loop, stall or get corrected, and proposes one AGENTS.md / CLAUDE.md rule per pattern |
| [Skill miner](bots/skill-miner-export)    | Mondays 10 AM                                           | Spots procedures you keep explaining to agents and drafts each as a SKILL.md                             |
| [Fresh-eyes user](bots/fresh-eyes-export) | Wednesdays 10 AM, and after a deploy                    | Walks your app like a first-time user, desktop and phone, and reports blockers with screenshots          |

Nothing writes to a repo, files an issue or opens a PR until you say yes.

## Install a bot

Requires Orca with Bots (beta), v1.4.271 or later.

1. Clone this repo.
2. In Orca: **Bots → Import from another app… → Another app… → Add its folder**, and pick a folder under `bots/` (for example `bots/agent-coach-export`).
3. **Create** the bot. It reads the folder, shows you a plan, and sets itself up after your yes.

What you get:

- Its soul, its skills, and its schedules, **paused**. Turn them on in the bot's Automations once the first run looks right.
- Event routines (GitHub) wait until you connect GitHub for that bot; it offers the Connect card.
- No keys or logins: there are none in this repo, and Orca never copies them.

To create the bot on a paired server instead of this computer, copy the folder to that server first.

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
schedules:
  - name: "Bot: what it posts"
    cron: "0 16 * * 5" # 5-field cron
    prompt: Do X with the my-skill skill.
events:
  - name: "When X happens: do Y"
    source: github # slack | github | linear | webhook | gmail | calendar
    event: pr_closed # must be an event Orca sends for that source
    prompt: Do Y with the my-skill skill.
```

`bun run validate` checks each folder the way Orca's importer will need it: the sections, the cron syntax, that each event's source sends it and its connector is listed, and that every "the X skill" in a prompt exists under `skills/`. Event names are pinned to Orca v1.4.271 in [`src/orca-events.ts`](src/orca-events.ts).

## Develop

```sh
bun install
bun run check   # biome, tsc, vitest, validate
prek install    # optional: same checks on commit
```

## License

[MIT](LICENSE)
