import { describe, expect, it } from 'vitest'
import { findBots } from '../src/find-bots.ts'
import { validateBot } from '../src/validate-bot.ts'

const bots = await findBots(new URL('../bots', import.meta.url).pathname)

describe('shipped bots', () => {
  it('ships at least one bot', () => {
    expect(bots.length).toBeGreaterThan(0)
  })

  it.each(bots)('%s is importable', async (dir) => {
    expect(await validateBot(dir)).toEqual([])
  })
})
