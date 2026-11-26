// Mirrors how Orca's folder importer reads a bot's files (stablyai/orca, checked against main on 2026-11-26):
// shared/bots/bot-text-scan.ts (redactBotText), shared/observability/redactor.ts (redactString) and
// cli/bots/bot-import-read-refusal.ts. A line that "looks like it holds a secret" is left out of what the
// new bot reads, and a URL loses its query, so a bot must not need such a line.

const SECRET_LINE =
  /\b(passwords?|passwd|passcodes?|pins?|api ?keys?|secrets?|tokens?|private ?keys?|cookies?|credentials?|authorization)\b.*?(:|=|\bis\b)\s*\S|\bbearer\s+\S/i
const SECRET_SHAPE =
  /\b(sk-[\w-]{8,}|sk-ant-[\w-]{8,}|xox[abprs]-[\w-]{8,}|xapp-[\w-]{8,}|gh[opsu]_[\w]{8,}|github_pat_\w{8,}|AKIA[0-9A-Z]{12,}|AIza[\w-]{20,}|tvly-[\w-]{8,}|eyJ[\w-]{10,}\.[\w-]{10,}\.[\w-]{5,})/
const URL_QUERY = /\b([a-z][a-z0-9+.-]*:\/\/)(?:[^\s/@"'`<>]+@)?([^\s?#"'`<>]*)\?[^\s#"'`<>]*/i
const KEY_BLOCK = /-----BEGIN [A-Z0-9 ]+-----/

// redactString's own patterns: any match rewrites the line, so the importer leaves it out.
const LOG_REDACTIONS: readonly RegExp[] = [
  /sk-ant-[a-zA-Z0-9_-]{40,}/,
  /sk-(?:proj-)?[a-zA-Z0-9_-]{32,}/,
  /gh[pousr]_[A-Za-z0-9]{36,}/,
  /github_pat_[A-Za-z0-9_]{22,}/,
  /AKIA[0-9A-Z]{16}/,
  /aws_secret_access_key\s*[:=]\s*[A-Za-z0-9/+=]{40}/i,
  /xox[baprsoe]-[A-Za-z0-9-]{10,}/,
  /\bBearer\s+[A-Za-z0-9._~+/=-]+/i,
  /(https?:\/\/)([^/@\s]+)@/,
  /^\s*([A-Z_][A-Z0-9_]*)\s*=\s*\S.*/
]
const ASSIGNMENT = /(?<![\w-])(?:\\?["'])?([\w-]+)(?:\\?["'])?\s*[:=]\s*/g
const CREDENTIAL_NAME = /(?:apikey|token|secret|password|bearer|authorization|privkey|privatekey|secretkey)$/i

const NEVER_READ_NAME =
  /^(\.env.*|auth\.json|(openclaw|clawdbot|moltbot)\.json|config\.ya?ml|auth-profiles.*|.*\.(pem|key|p12|keychain|keychain-db|sqlite|db|db-wal|db-shm)|.*(secret|token|credential|password).*)$/i
const NEVER_READ_FOLDER =
  /^(credentials|devices|identity|sessions|vault|mcp-tokens|logs|sandboxes|codex-home|\.git|node_modules)$/i

const wordsOf = (line: string): string => line.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]/g, ' ')

const assignsCredential = (line: string): boolean =>
  [...line.matchAll(ASSIGNMENT)].some((match) => CREDENTIAL_NAME.test((match[1] ?? '').replace(/[-_]/g, '')))

/** Why Orca's importer would not give the new bot this line as written, or null when it would. */
export function importLineProblem(line: string): string | null {
  if (KEY_BLOCK.test(line)) return 'opens a key block, which the importer leaves out whole'
  if (URL_QUERY.test(line)) return "has a URL with a query, which the importer cuts off at the '?'"
  if (
    SECRET_LINE.test(wordsOf(line)) ||
    SECRET_SHAPE.test(line) ||
    assignsCredential(line) ||
    LOG_REDACTIONS.some((pattern) => pattern.test(line))
  ) {
    return 'looks like it holds a secret, so the importer leaves it out'
  }
  return null
}

/** Why Orca's importer would refuse to read this file at all, or null when it would read it. */
export function importPathProblem(path: string): string | null {
  const parts = path.split(/[\\/]+/).filter(Boolean)
  const name = parts.at(-1) ?? ''
  if (parts.some((part) => NEVER_READ_FOLDER.test(part))) return 'is in a folder the importer never reads'
  if (NEVER_READ_NAME.test(name)) return 'has a name the importer never reads'
  return null
}
