import { Cron } from 'croner'
import * as z from 'zod'
import {
  CONNECTOR_FOR_SOURCE,
  ORCA_CONNECTORS,
  ORCA_EVENT_SOURCES,
  ORCA_LINK_LIMITS,
  ORCA_TOOL_NAME,
  sendsEvent
} from './orca-events.ts'

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const isFiveFieldCron = (cron: string): boolean => {
  if (cron.trim().split(/\s+/).length !== 5) return false
  try {
    new Cron(cron, { paused: true })
    return true
  } catch {
    return false
  }
}

const prompt = z.string().trim().min(1).max(4000)

export const SkillFrontmatterSchema = z.object({
  name: z.string().regex(KEBAB, 'must be kebab-case'),
  description: z.string().trim().min(1).max(1024)
})
export type SkillFrontmatter = z.infer<typeof SkillFrontmatterSchema>

export const ScheduleSchema = z.object({
  name: z.string().trim().min(1).max(200),
  cron: z
    .string()
    .refine(isFiveFieldCron, { error: (issue) => `"${String(issue.input)}" is not a valid 5-field cron` }),
  timezone: z.string().optional(),
  prompt
})

export const EventSchema = z.object({
  name: z.string().trim().min(1).max(200),
  source: z.enum(ORCA_EVENT_SOURCES),
  event: z.string(),
  prompt
})

const isHttpsUrl = (value: string): boolean => URL.canParse(value) && new URL(value).protocol === 'https:'

/** An MCP server the bot adds as its own tool, signed in once in the browser: no keys here. */
export const ToolSchema = z.strictObject({
  name: z.string().regex(ORCA_TOOL_NAME, 'must be letters, digits, "-" or "_"'),
  url: z.string().max(2048).refine(isHttpsUrl, 'must be an https URL')
})

const uniqueNames = <T extends { name: string }>(items: readonly T[]): boolean =>
  new Set(items.map((item) => item.name)).size === items.length

export const RoutinesSchema = z
  .object({
    connectors: z
      .array(z.enum(ORCA_CONNECTORS))
      .max(ORCA_LINK_LIMITS.connectors)
      .refine((list) => new Set(list).size === list.length, 'must not repeat')
      .default([]),
    tools: z.array(ToolSchema).max(ORCA_LINK_LIMITS.tools).refine(uniqueNames, 'names must be unique').default([]),
    schedules: z
      .array(ScheduleSchema)
      .max(ORCA_LINK_LIMITS.schedules)
      .refine(uniqueNames, 'names must be unique')
      .default([]),
    events: z.array(EventSchema).max(ORCA_LINK_LIMITS.events).refine(uniqueNames, 'names must be unique').default([])
  })
  .superRefine((routines, ctx) => {
    routines.events.forEach((event, index) => {
      if (!sendsEvent(event.source, event.event)) {
        ctx.addIssue({
          code: 'custom',
          path: ['events', index],
          message: `${event.source} does not send "${event.event}"`
        })
        return
      }
      const connector = CONNECTOR_FOR_SOURCE[event.source]
      if (connector && !routines.connectors.includes(connector)) {
        ctx.addIssue({ code: 'custom', path: ['events', index], message: `needs the ${connector} connector` })
      }
    })
  })
export type Routines = z.infer<typeof RoutinesSchema>
