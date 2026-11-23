import { basename } from 'node:path'
import { findBots } from './find-bots.ts'
import { validateBot } from './validate-bot.ts'

const root = process.argv[2] ?? new URL('../bots', import.meta.url).pathname
const bots = await findBots(root)
let failed = 0

for (const dir of bots) {
  const issues = await validateBot(dir)
  failed += issues.length ? 1 : 0
  console.log(`${issues.length ? '✗' : '✓'} ${basename(dir)}`)
  for (const issue of issues) console.log(`    ${issue.file}: ${issue.message}`)
}

console.log(`\n${bots.length - failed}/${bots.length} bots importable`)
process.exitCode = failed || bots.length === 0 ? 1 : 0
