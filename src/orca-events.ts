// Mirrors stablyai/orca: AUTOMATION_EVENT_KINDS (shared/automation-event-triggers.ts), and BOT_PACKAGE_CONNECTORS and
// the share-link limits (shared/bots/bot-package.ts). Checked against main on 2026-11-26.
export const ORCA_EVENT_KINDS = {
  slack: ['mentioned', 'message', 'reaction'],
  github: [
    'issue_opened',
    'pr_opened',
    'pr_pushed',
    'pr_merged',
    'comment',
    'review_comment',
    'review',
    'mentioned',
    'review_requested',
    'assigned',
    'ci_failed',
    'ci_passed',
    'ci_finished',
    'pr_conflicted',
    'pr_closed',
    'pr_ready',
    'labeled',
    'issue_closed',
    'deploy_finished',
    'security_alert',
    'workflow_finished'
  ],
  linear: ['assigned', 'mentioned', 'issue_created', 'issue_moved'],
  webhook: ['call'],
  gmail: ['new_email'],
  calendar: ['starting_soon']
} as const satisfies Record<string, readonly string[]>

export type OrcaEventSource = keyof typeof ORCA_EVENT_KINDS
export const ORCA_EVENT_SOURCES = Object.keys(ORCA_EVENT_KINDS) as [OrcaEventSource, ...OrcaEventSource[]]

export const ORCA_CONNECTORS = ['github', 'slack', 'linear', 'google', 'composio'] as const
export type OrcaConnector = (typeof ORCA_CONNECTORS)[number]

export const CONNECTOR_FOR_SOURCE: Record<OrcaEventSource, OrcaConnector | null> = {
  slack: 'slack',
  github: 'github',
  linear: 'linear',
  webhook: null,
  gmail: 'google',
  calendar: 'google'
}

export function sendsEvent(source: OrcaEventSource, event: string): boolean {
  return (ORCA_EVENT_KINDS[source] as readonly string[]).includes(event)
}

/** What one share link (New bot → From a link) carries at most: BotPackageV1Schema's `.max()`s. */
export const ORCA_LINK_LIMITS = { connectors: 8, tools: 32, schedules: 32, events: 32, skills: 64 } as const

/** A bot tool's name, as Orca's BOT_TOOL_NAME_PATTERN allows it. */
export const ORCA_TOOL_NAME = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/
