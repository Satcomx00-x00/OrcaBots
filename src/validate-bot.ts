import { readdir, readFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import type * as z from 'zod'
import { type Routines, RoutinesSchema, SkillFrontmatterSchema } from './bot-schema.ts'
import { splitFrontmatter } from './frontmatter.ts'
import { ORCA_LINK_LIMITS } from './orca-events.ts'

export type Issue = { file: string; message: string }

const SOUL_SECTIONS = ['## How I work', '## Never'] as const
const MENTION = (kind: 'skill' | 'tool'): RegExp => new RegExp(`\\bthe ([A-Za-z0-9][\\w-]*) ${kind}\\b`, 'g')

async function readText(path: string): Promise<string | null> {
  try {
    return await readFile(path, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw error
  }
}

const zodIssues = (file: string, error: z.ZodError): Issue[] =>
  error.issues.map((issue) => ({
    file,
    message: issue.path.length ? `${issue.path.join('.')}: ${issue.message}` : issue.message
  }))

function checkFolder(dir: string): Issue[] {
  return basename(dir).endsWith('-export')
    ? []
    : [{ file: '.', message: 'folder must end in "-export" so Orca names the bot from it' }]
}

function checkSoul(text: string | null): Issue[] {
  if (text === null) return [{ file: 'SOUL.md', message: 'missing' }]
  const issues: Issue[] = []
  const first = text.trimStart()
  if (!first || first.startsWith('#')) {
    issues.push({ file: 'SOUL.md', message: 'must open with a paragraph saying what the bot is for' })
  }
  for (const section of SOUL_SECTIONS) {
    if (!text.split(/\r?\n/).some((line) => line.trim() === section)) {
      issues.push({ file: 'SOUL.md', message: `missing "${section}" section` })
    }
  }
  return issues
}

async function checkSkills(dir: string): Promise<{ names: Set<string>; issues: Issue[] }> {
  const root = join(dir, 'skills')
  const entries = await readdir(root, { withFileTypes: true }).catch(() => [])
  const names = new Set<string>()
  const issues: Issue[] = []
  for (const entry of entries.filter((item) => item.isDirectory())) {
    const file = `skills/${entry.name}/SKILL.md`
    const text = await readText(join(root, entry.name, 'SKILL.md'))
    const front = text === null ? null : splitFrontmatter(text)
    if (!front) {
      issues.push({ file, message: text === null ? 'missing' : 'missing frontmatter' })
      continue
    }
    const parsed = SkillFrontmatterSchema.safeParse(front.data)
    if (!parsed.success) {
      issues.push(...zodIssues(file, parsed.error))
      continue
    }
    if (parsed.data.name !== entry.name) {
      issues.push({ file, message: `name "${parsed.data.name}" must match its folder "${entry.name}"` })
    }
    names.add(entry.name)
  }
  return { names, issues }
}

function checkSkillCount(skills: ReadonlySet<string>): Issue[] {
  return skills.size > ORCA_LINK_LIMITS.skills
    ? [{ file: 'skills/', message: `a share link carries at most ${ORCA_LINK_LIMITS.skills} skills` }]
    : []
}

/** Every "the X skill" and "the X tool" in a prompt must be one the bot brings. */
function checkMentions(routines: Routines, skills: ReadonlySet<string>): Issue[] {
  const tools = new Set(routines.tools.map((tool) => tool.name))
  const kinds = [
    { kind: 'skill', known: skills, where: 'skills/' },
    { kind: 'tool', known: tools, where: 'tools' }
  ] as const
  const prompts = [
    ...routines.schedules.map((schedule, index) => [`schedules.${index}`, schedule.prompt] as const),
    ...routines.events.map((event, index) => [`events.${index}`, event.prompt] as const)
  ]
  return prompts.flatMap(([at, text]) =>
    kinds.flatMap(({ kind, known, where }) =>
      [...text.matchAll(MENTION(kind))]
        .map((match) => match[1] ?? '')
        .filter((name) => !known.has(name))
        .map((name) => ({
          file: 'ROUTINES.md',
          message: `${at}: names the "${name}" ${kind}, which is not in ${where}`
        }))
    )
  )
}

function checkRoutines(text: string | null, skills: ReadonlySet<string>): Issue[] {
  if (text === null) return [{ file: 'ROUTINES.md', message: 'missing' }]
  let front: ReturnType<typeof splitFrontmatter>
  try {
    front = splitFrontmatter(text)
  } catch (error) {
    return [{ file: 'ROUTINES.md', message: `invalid YAML frontmatter: ${(error as Error).message}` }]
  }
  if (!front) return [{ file: 'ROUTINES.md', message: 'missing frontmatter' }]
  const parsed = RoutinesSchema.safeParse(front.data)
  return parsed.success ? checkMentions(parsed.data, skills) : zodIssues('ROUTINES.md', parsed.error)
}

/** Everything that would stop Orca's importer from bringing this bot over as written. */
export async function validateBot(dir: string): Promise<Issue[]> {
  const [soul, routines, skills] = await Promise.all([
    readText(join(dir, 'SOUL.md')),
    readText(join(dir, 'ROUTINES.md')),
    checkSkills(dir)
  ])
  return [
    ...checkFolder(dir),
    ...checkSoul(soul),
    ...skills.issues,
    ...checkSkillCount(skills.names),
    ...checkRoutines(routines, skills.names)
  ]
}
