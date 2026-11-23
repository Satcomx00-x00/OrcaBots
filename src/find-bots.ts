import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

/** Every bot folder under `root`, sorted. */
export async function findBots(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => join(root, entry.name))
    .sort()
}
