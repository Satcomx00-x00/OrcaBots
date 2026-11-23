import { parse } from 'yaml'

export type Frontmatter = { data: unknown; body: string }

const FENCE = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/

/** YAML between the opening `---` fences, or null when the text has none. */
export function splitFrontmatter(text: string): Frontmatter | null {
  const match = FENCE.exec(text)
  if (!match) return null
  return { data: parse(match[1] ?? '') ?? {}, body: text.slice(match[0].length) }
}
