# orca-bots

Importable bots for [Orca](https://github.com/stablyai/orca) that watch your agents, your app and your sprint.

**Your agents**

| Bot                                        | Runs                                                          | What it does                                                                                             |
| ------------------------------------------ | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Agent coach](bots/agent-coach-export)     | Fridays 4 PM, and when an agent's PR or MR is closed unmerged | Finds where agents loop, stall or get corrected, and proposes one AGENTS.md / CLAUDE.md rule per pattern |
| [Skill miner](bots/skill-miner-export)     | Mondays 10 AM                                                 | Spots procedures you keep explaining to agents and drafts each as a SKILL.md                             |
| [Cost auditor](bots/cost-auditor-export)   | Fridays 9 AM                                                  | Ranks sessions by turns and hours against what they shipped, and says what would have made each cheaper  |
| [Prompt doctor](bots/prompt-doctor-export) | Mondays 9 AM                                                  | Finds the session openings that needed the most follow-up and writes a template for each kind of request |
| [Rule keeper](bots/rule-keeper-export)     | When an agent opens a PR or MR, and the 1st of each month     | Checks each change against the rules in AGENTS.md / CLAUDE.md, and finds the rules nobody needs          |
| [Night shift](bots/night-shift-export)     | Weekdays 5 PM and 8 AM                                        | Starts one agent per small, ready issue overnight and has draft PRs or MRs waiting in the morning        |

**Your app**

| Bot                                                      | Runs                                                         | What it does                                                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| [Fresh-eyes user](bots/fresh-eyes-export)                | Wednesdays 10 AM, and after a GitHub or GitLab deploy        | Walks your app like a first-time user, desktop and phone, and reports blockers with screenshots            |
| [Regression walker](bots/regression-walker-export)       | Thursdays 10 AM, after a deploy, and when a bug issue closes | Replays the bugs you already fixed in the browser and reports the ones that came back                      |
| [Accessibility walker](bots/accessibility-walker-export) | Tuesdays 10 AM, and after a deploy                           | Does the main job keyboard-only and zoomed in, checks names and contrast, and cites the WCAG 2.2 criterion |
| [Copy checker](bots/copy-checker-export)                 | Thursdays 2 PM                                               | Lists typos, things called by two names, placeholder text and error messages that don't help               |

**Your sprint (GitLab)**

| Bot                                                    | Runs                                                  | What it does                                                                                         |
| ------------------------------------------------------ | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Sprint planner](bots/sprint-planner-export)           | Fridays 10 AM, when the sprint is ending              | Drafts the next sprint from the backlog, sized to the team's velocity, with what isn't ready and why |
| [Estimate calibrator](bots/estimate-calibrator-export) | Mondays 11 AM, after a sprint ended                   | Compares estimates with what the work took and shows which kinds of story run over                   |
| [Sprint guardian](bots/sprint-guardian-export)         | Weekdays 9:30 AM, and when an issue enters the sprint | Says whether the sprint is on track, and what each mid-sprint addition costs                         |
| [Blocker chaser](bots/blocker-chaser-export)           | Weekdays 9 AM                                         | Lists what is stuck, who can move it and the smallest next step                                      |
| [Retro miner](bots/retro-miner-export)                 | Fridays 2 PM, around the end of a sprint              | Brings the sprint's facts to the retro, three talking points, and where last retro's actions stand   |

The agent and app bots work with **GitHub** (the GitHub connector, `gh`) and **GitLab** (the GitLab connector). The sprint bots are GitLab only: they read iterations or milestones, issues, merge requests and pipelines through the GitLab connector. Nothing writes to a repo, files an issue or opens a PR or MR until you say yes.

## Install a bot

Requires Orca with Bots (beta), v1.4.271 or later.

### From a link

In Orca: **New bot → From a link**, paste the bot's link, review what it brings, **Create**.

| Bot                  | Link                |
| -------------------- | ------------------- |
| Agent coach          | _not published yet_ |
| Skill miner          | _not published yet_ |
| Cost auditor         | _not published yet_ |
| Prompt doctor        | _not published yet_ |
| Rule keeper          | _not published yet_ |
| Night shift          | _not published yet_ |
| Fresh-eyes user      | _not published yet_ |
| Regression walker    | _not published yet_ |
| Accessibility walker | _not published yet_ |
| Copy checker         | _not published yet_ |
| Sprint planner       | _not published yet_ |
| Estimate calibrator  | _not published yet_ |
| Sprint guardian      | _not published yet_ |
| Blocker chaser       | _not published yet_ |
| Retro miner          | _not published yet_ |

Orca only opens its own share links (`https://app.orca.dev/bots/share/<id>` or `orca://bots/share/<id>`), never a GitHub or raw file URL. A link is published once from a bot made from this repo's folder (below): open the bot, **Share**, keep everything ticked, copy the link, and put it in the table above. Publish again after changing a bot folder so the link serves the new version.

A link carries the soul, skills, schedules, the GitHub and GitLab connectors, and GitHub event routines. It does not carry webhook routines, so the GitLab routines come from the bot itself: its soul offers to create them in its first chat.

### From the folder

1. Clone this repo.
2. In Orca: **Bots → Import from another app… → Another app… → Add its folder**, and pick a folder under `bots/` (for example `bots/agent-coach-export`).
3. **Create** the bot. It reads the folder, shows you a plan, and sets itself up after your yes.

To create the bot on a paired server instead of this computer, copy the folder to that server first.

### After install

Each bot folder has a `README.md` with its own steps, for example [`bots/agent-coach-export/README.md`](bots/agent-coach-export/README.md).

### What you get

- Its soul, its skills, and its schedules, **paused**. Turn them on in the bot's Automations once the first run looks right.
- GitHub routines wait until you connect GitHub for that bot; it offers the Connect card.
- Sprint bots ask in their first chat whether a sprint is an iteration or a milestone, and how you size stories. Their schedules stay quiet outside the end of a sprint.
- The GitLab connector, signed in once in the browser. For self-managed or Dedicated GitLab, tell the bot your address; it reconnects GitLab at `https://<host>/api/v4/mcp`.
- GitLab sends Orca no events of its own, so GitLab routines are webhooks: copy the URL from the automation's card (**Copy URL**) into the GitLab project's **Settings → Webhooks**, and tick the events that bot's README names.
- No keys or logins: there are none in this repo, and Orca never copies them.

Agent coach, Skill miner, Cost auditor, Prompt doctor and Rule keeper read sessions only where **Settings → Agent Session History** is on, one computer at a time.

## Bot folder layout

```text
bots/<name>-export/
├── SOUL.md                 # opening paragraph (what it's for), ## How I work, ## Never
├── README.md               # for the owner: ## After install (connectors, webhooks, turning automations on)
├── ROUTINES.md             # YAML frontmatter: connectors, schedules, events
└── skills/<skill>/SKILL.md # frontmatter name must equal the folder name
```

`ROUTINES.md` frontmatter:

```yaml
connectors: [github, gitlab] # github | slack | linear | google | composio | gitlab
tools: [] # other MCP servers the bot adds as its own tools; https only, no keys
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
    source: webhook # GitLab's project webhook calls this routine
    event: call
    prompt: Do Z through the GitLab connector.
```

`bun run validate` checks each folder the way Orca's importer will need it: the sections, the cron syntax, that each event's source sends it and its connector is listed, that every "the X skill", "the X tool" or "the X connector" in a prompt exists under `skills/`, `tools` or `connectors`, and that nothing exceeds what one share link carries. Event names and link limits mirror Orca in [`src/orca-events.ts`](src/orca-events.ts).

## Develop

```sh
bun install
bun run check   # biome, tsc, vitest, validate
prek install    # optional: same checks on commit
```

## License

[MIT](LICENSE)
