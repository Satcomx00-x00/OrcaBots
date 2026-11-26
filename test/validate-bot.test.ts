import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { validateBot } from '../src/validate-bot.ts'

const SOUL = `I review your agents' sessions and turn what goes wrong into rules.

## How I work

Weekly review.

## Never

Change a file before my owner agrees.
`

const SKILL = `---
name: agent-session-review
description: Read agent sessions for the patterns that waste turns.
---

# Reviewing agent sessions
`

const routines = (body: string): string => `---\n${body}---\n\n# Routines\n`

const ROUTINES = routines(`connectors: [github]
schedules:
  - name: "Agent coach: weekly review"
    cron: "0 16 * * 5"
    prompt: Review sessions with the agent-session-review skill.
events:
  - name: "When a pull request is closed: find out why"
    source: github
    event: pr_closed
    prompt: Read it with the agent-session-review skill.
`)

type Files = Record<string, string>
const VALID: Files = {
  'SOUL.md': SOUL,
  'ROUTINES.md': ROUTINES,
  'skills/agent-session-review/SKILL.md': SKILL
}

const roots: string[] = []
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })))
})

async function botDir(files: Files, folder = 'agent-coach-export'): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'orca-bots-'))
  roots.push(root)
  const dir = join(root, folder)
  for (const [path, text] of Object.entries(files)) {
    await mkdir(dirname(join(dir, path)), { recursive: true })
    await writeFile(join(dir, path), text)
  }
  return dir
}

const messages = async (files: Files, folder?: string): Promise<string[]> =>
  (await validateBot(await botDir(files, folder))).map((issue) => `${issue.file}: ${issue.message}`)

describe('validateBot', () => {
  it('accepts a complete bot', async () => {
    expect(await messages(VALID)).toEqual([])
  })

  it('needs an import folder name ending in -export', async () => {
    expect(await messages(VALID, 'agent-coach')).toEqual([
      '.: folder must end in "-export" so Orca names the bot from it'
    ])
  })

  it('needs SOUL.md with its purpose, How I work and Never', async () => {
    expect(await messages({ ...VALID, 'SOUL.md': 'I help.\n\n## How I work\n\nThings.\n' })).toEqual([
      'SOUL.md: missing "## Never" section'
    ])
    expect(await messages({ ...VALID, 'SOUL.md': '## How I work\n\nx\n\n## Never\n\ny\n' })).toEqual([
      'SOUL.md: must open with a paragraph saying what the bot is for'
    ])
  })

  it('needs each skill to name its own folder', async () => {
    expect(
      await messages({
        ...VALID,
        'skills/agent-session-review/SKILL.md': SKILL.replace('name: agent-session-review', 'name: review')
      })
    ).toContain('skills/agent-session-review/SKILL.md: name "review" must match its folder "agent-session-review"')
  })

  it('rejects a cron Orca cannot run', async () => {
    expect(await messages({ ...VALID, 'ROUTINES.md': ROUTINES.replace('0 16 * * 5', '0 25 * * 5') })).toEqual([
      'ROUTINES.md: schedules.0.cron: "0 25 * * 5" is not a valid 5-field cron'
    ])
  })

  it('rejects an event its source does not send', async () => {
    expect(await messages({ ...VALID, 'ROUTINES.md': ROUTINES.replace('pr_closed', 'pr_deleted') })).toEqual([
      'ROUTINES.md: events.0: github does not send "pr_deleted"'
    ])
  })

  it('needs the connector an event comes from', async () => {
    expect(
      await messages({ ...VALID, 'ROUTINES.md': ROUTINES.replace('connectors: [github]', 'connectors: []') })
    ).toEqual(['ROUTINES.md: events.0: needs the github connector'])
  })

  it('rejects a prompt that names a skill the bot does not have', async () => {
    expect(
      await messages({
        ...VALID,
        'ROUTINES.md': ROUTINES.replace(
          'Read it with the agent-session-review skill',
          'Read it with the skill-mining skill'
        )
      })
    ).toEqual(['ROUTINES.md: events.0: names the "skill-mining" skill, which is not in skills/'])
  })

  it('accepts a GitLab tool and a webhook routine that uses it', async () => {
    const withGitlab = ROUTINES.replace(
      'schedules:',
      'tools:\n  - name: gitlab\n    url: https://gitlab.com/api/v4/mcp\nschedules:'
    ).replace(
      'events:\n',
      'events:\n  - name: "When GitLab calls"\n    source: webhook\n    event: call\n    prompt: Read it through the gitlab tool.\n'
    )
    expect(await messages({ ...VALID, 'ROUTINES.md': withGitlab })).toEqual([])
  })

  it('accepts the GitLab connector and a webhook routine that uses it', async () => {
    const withGitlab = ROUTINES.replace('connectors: [github]', 'connectors: [github, gitlab]').replace(
      'events:\n',
      'events:\n  - name: "When GitLab calls"\n    source: webhook\n    event: call\n    prompt: Read it through the GitLab connector.\n'
    )
    expect(await messages({ ...VALID, 'ROUTINES.md': withGitlab })).toEqual([])
  })

  it('rejects a prompt that names a connector the bot does not list', async () => {
    expect(
      await messages({
        ...VALID,
        'ROUTINES.md': ROUTINES.replace('Read it with', 'Read it through the GitLab connector with')
      })
    ).toEqual(['ROUTINES.md: events.0: names the "GitLab" connector, which is not in connectors'])
  })

  it('rejects a connector Orca does not have', async () => {
    expect(
      await messages({
        ...VALID,
        'ROUTINES.md': ROUTINES.replace('connectors: [github]', 'connectors: [github, bitbucket]')
      })
    ).toEqual([expect.stringMatching(/^ROUTINES\.md: connectors\.1: /)])
  })

  it('rejects a prompt that names a tool the bot does not add', async () => {
    expect(
      await messages({
        ...VALID,
        'ROUTINES.md': ROUTINES.replace('Read it with', 'Read it through the gitlab tool with')
      })
    ).toEqual(['ROUTINES.md: events.0: names the "gitlab" tool, which is not in tools'])
  })

  it('rejects a tool that is not an https URL', async () => {
    expect(
      await messages({
        ...VALID,
        'ROUTINES.md': ROUTINES.replace(
          'schedules:',
          'tools:\n  - name: gitlab\n    url: http://gitlab.com/mcp\nschedules:'
        )
      })
    ).toEqual(['ROUTINES.md: tools.0.url: must be an https URL'])
  })

  it('rejects two routines with the same name', async () => {
    const twice = ROUTINES.replace(
      '"When a pull request is closed: find out why"',
      '"Agent coach: weekly review"'
    ).replace(
      'events:',
      'events:\n  - name: "Agent coach: weekly review"\n    source: github\n    event: pr_merged\n    prompt: x\n'
    )
    expect(await messages({ ...VALID, 'ROUTINES.md': twice })).toEqual(['ROUTINES.md: events: names must be unique'])
  })

  it('reports a missing file instead of throwing', async () => {
    const { 'ROUTINES.md': _, ...rest } = VALID
    expect(await messages(rest)).toEqual(['ROUTINES.md: missing'])
  })
})
