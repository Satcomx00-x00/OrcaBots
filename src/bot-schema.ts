import { Cron } from 'croner'
import * as z from 'zod'
import { CONNECTOR_FOR_SOURCE, ORCA_CONNECTORS, ORCA_EVENT_SOURCES, sendsEvent } from './orca-events.ts'

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

export const RoutinesSchema = z
  .object({
    connectors: z.array(z.enum(ORCA_CONNECTORS)).default([]),
    schedules: z.array(ScheduleSchema).default([]),
    events: z.array(EventSchema).default([])
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
