import { spawnSync } from 'node:child_process'
import { chmod, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { delimiter, join } from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { findBots } from '../src/find-bots.ts'

const SCRIPT = new URL('../k8s/kubectl-ro.sh', import.meta.url).pathname
const REFUSED = 64

let bin: string
beforeAll(async () => {
  bin = await mkdtemp(join(tmpdir(), 'kubectl-ro-'))
  // Stands in for kubectl: prints what it was asked to run.
  await writeFile(join(bin, 'kubectl'), '#!/bin/sh\necho "kubectl $*"\n')
  await chmod(join(bin, 'kubectl'), 0o755)
})
afterAll(() => rm(bin, { recursive: true, force: true }))

const run = (...args: string[]) => {
  const { PATH = '' } = process.env
  const result = spawnSync('sh', [SCRIPT, ...args], {
    encoding: 'utf8',
    env: { ...process.env, PATH: `${bin}${delimiter}${PATH}` }
  })
  return { code: result.status, out: result.stdout.trim(), err: result.stderr.trim() }
}

describe.skipIf(process.platform === 'win32')('kubectl-ro.sh', () => {
  it.each([
    [['get', 'pods', '-A']],
    [['get', 'pods', '-A', '--field-selector=status.phase!=Running']],
    [['get', 'deployments,hpa', '-n', 'web', '--show-managed-fields', '-o', 'jsonpath={.items[*].kind}']],
    [['describe', 'node', 'n1']],
    [['logs', 'api-1', '-n', 'web', '--previous', '--tail=50']],
    [['top', 'pods', '-A', '--containers']],
    [['events', '-A']],
    [['auth', 'can-i', 'delete', 'pods', '-A']],
    [['auth', 'can-i', 'get', 'secrets', '-A']],
    [['get', 'secrets', '-n', 'web']],
    [['get', 'secrets', '-n', 'web', '-o', 'name']]
  ])('passes a read through on the named context: %j', (args) => {
    expect(run('prod', ...args)).toEqual({ code: 0, out: `kubectl --context prod ${args.join(' ')}`, err: '' })
  })

  it.each([
    'delete',
    'apply',
    'create',
    'replace',
    'edit',
    'patch',
    'scale',
    'rollout',
    'set',
    'label',
    'annotate',
    'taint',
    'cordon',
    'uncordon',
    'drain',
    'exec',
    'cp',
    'attach',
    'run',
    'debug',
    'port-forward',
    'proxy',
    'diff',
    'config',
    'certificate',
    'autoscale',
    'expose'
  ])('refuses %s', (verb) => {
    const result = run('prod', verb, 'deployment', 'api')
    expect(result.code).toBe(REFUSED)
    expect(result.out).toBe('')
    expect(result.err).toContain(`'${verb}' is not a read-only command`)
  })

  it.each([
    [['get', 'pods', '--context', 'admin']],
    [['get', 'pods', '--context=admin']],
    [['get', 'pods', '--kubeconfig', '/tmp/other']],
    [['get', 'pods', '--as=admin']],
    [['get', 'pods', '--as-group', 'system:masters']],
    [['get', 'pods', '--server=https://other']],
    [['get', 'pods', '--token=abc']],
    [['get', '--raw', '/api/v1/namespaces/web/secrets']],
    [['get', 'pods', '-w']],
    [['get', 'pods', '--watch']],
    [['logs', 'api-1', '-f']],
    [['logs', 'api-1', '--follow']],
    [['get', '-f', 'manifest.yaml']],
    [['auth', 'reconcile', '-f', 'rbac.yaml']],
    [['auth', 'whoami']]
  ])('refuses another identity, another target or an endless read: %j', (args) => {
    const result = run('prod', ...args)
    expect(result.code).toBe(REFUSED)
    expect(result.out).toBe('')
  })

  it.each([
    [['get', 'secrets', '-n', 'web', '-o', 'yaml']],
    [['get', 'secrets', '-A', '-ojson']],
    [['get', 'secret', 'db', '--output=jsonpath={.data}']],
    [['get', 'configmaps,Secrets', '-A', '-o', 'yaml']],
    [['get', 'secret/db', '-o=yaml']],
    [['get', 'secrets.v1.', '-o', 'go-template={{.data}}']],
    [['get', 'secrets', '-o', 'custom-columns=D:.data']],
    [['get', 'secrets', '--template={{.data}}']],
    [['describe', 'secret', 'db']]
  ])('refuses to print what a Secret holds: %j', (args) => {
    const result = run('prod', ...args)
    expect(result.code).toBe(REFUSED)
    expect(result.out).toBe('')
  })

  it('needs a context before the verb', () => {
    expect(run('get', 'pods').code).toBe(REFUSED)
    expect(run('-n', 'get', 'pods').code).toBe(REFUSED)
    expect(run('prod').code).toBe(REFUSED)
  })
})

describe('cluster bots', async () => {
  const source = await readFile(SCRIPT, 'utf8')
  const bots = await findBots(new URL('../bots', import.meta.url).pathname)
  const skills = (
    await Promise.all(
      bots.map(async (bot) => {
        const entries = await readdir(join(bot, 'skills'), { withFileTypes: true })
        return entries.filter((entry) => entry.isDirectory()).map((entry) => join(bot, 'skills', entry.name))
      })
    )
  ).flat()
  const usesKubectl = (
    await Promise.all(
      skills.map(async (skill) =>
        (await readFile(join(skill, 'SKILL.md'), 'utf8')).includes('kubectl') ? skill : null
      )
    )
  ).filter((skill): skill is string => skill !== null)

  it('finds the skills that touch a cluster', () => {
    expect(usesKubectl.length).toBeGreaterThan(0)
  })

  it.each(usesKubectl)('%s ships the read-only script unchanged', async (skill) => {
    expect(await readFile(join(skill, 'kubectl-ro.sh'), 'utf8')).toBe(source)
  })

  it.each(usesKubectl)('%s shows no kubectl command outside the script', async (skill) => {
    const text = await readFile(join(skill, 'SKILL.md'), 'utf8')
    expect(text.match(/`kubectl (?!config)[a-z]/g) ?? []).toEqual([])
  })
})
