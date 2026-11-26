# Templates

## The tracking note

One per issue. The first line is the marker that lets you find the note again: keep it exactly. Rewrite the whole note at each update; add one line at the top of the log and keep the rest.

```markdown
<!-- sprint-scribe:log -->
**Status:** In progress · **Updated:** 2026-11-27 · **Sprint:** Sprint 42

**Weight:** 5 (planned 3) · **Time:** 9.5 h spent, 8 h estimated · **Priority:** high · **Parent:** &12 Faster exports

**Progress**
- Export no longer times out for accounts under 50k rows.
- Large accounts still fail; the query needs paging.

**Next:** add paging to the export query, then re-test with the largest account.

**Blocked by:** nothing

**Links:** !128 (open, pipeline passed) · branch `482-export-timeout`

<details>
<summary>Log</summary>

- 2026-11-27 · In progress · Fixed the timeout for small accounts; found the paging problem. 5.5 h. Weight 3 → 5: 9.5 h spent, and 3 stands for up to 8 h.
- 2026-11-26 · In progress · Reproduced the timeout and traced it to the export query. 4 h.

</details>

<sub>Kept by Sprint scribe from my work. One note, edited in place.</sub>
```

- **Status** is one of Not started, In progress, In review, Blocked, Done.
- **Progress** says what is true now, in two to four lines. Not what was done hour by hour.
- **Blocked by** names the thing, and the issue or person that can lift it, without an @.
- **Weight** shows "(planned <n>)" from the first time you change it, and keeps it for good. Before that, just the weight.
- **Time** comes from the issue's own time tracking, read back after you log.
- Leave out **Time** and the durations in the log when the setup says not to show effort. Time tracking on the issue is logged either way.
- Each weight change gets its reason on that day's log line.
- Keep the last ten log lines. Fold older ones into one line: "Earlier: started 2026-11-12, 6 days of work."

For the sprint's "interruptions and small requests" issue, the Progress list holds one line per interruption: date, what was asked, by whom, about how long.

## A new issue

Pick the one that fits. Fill every section; write "not recorded" where you don't know, never a guess.

### Implementation

Use these five sections, with these names, in this order.

```markdown
## Context

<What exists today, what is needed, and why. Then where it came from: unplanned, asked for by <name or team> on <date>, through <where>; it couldn't wait because <reason>.>

## Scope

**In:**

- <What this change covers.>

**Out:**

- <What it leaves alone, and where that is tracked if anywhere.>

## Acceptance Criteria

- [ ] Given <starting point>, when <action>, then <result>.
- [ ] ...

## Verification

- <The tests added or changed, and the command that runs them.>
- <What to check by hand, where: the page, endpoint or job, in which environment.>
- <What the pipeline must show.>

## Risks and Rollback

- **Risks:** <what could break, who would be affected, how you would notice.>
- **Rollback:** <how to undo it: revert the merge request, turn off the flag, undo the migration, and how long that takes.>
```

### User story

```markdown
## Summary

As a <kind of user>, I want <what>, so that <why>.

## Why this is here

Unplanned. Asked for by <name or team> on <date>, through <where>. It couldn't wait because <reason>.

## Acceptance criteria

- [ ] Given <starting point>, when <action>, then <result>.
- [ ] ...

## Definition of done

- [ ] Reviewed and merged
- [ ] Tests cover the change and pass
- [ ] Docs or changelog updated where users see a difference
- [ ] Checked in the environment where it was needed

## Links

- Merge request: <link>
- Related: <issues>
```

### Bug

```markdown
## Summary

<What is broken, for whom, in one sentence.>

## Why this is here

Unplanned. Reported by <name or team> on <date>, through <where>. Impact: <who is affected and how badly>.

## Steps to reproduce

1. ...

**Expected:** <what should happen>
**Actual:** <what happens>
**Where:** <environment, version>

## Acceptance criteria

- [ ] The steps above give the expected result.
- [ ] A test fails without the fix and passes with it.

## Definition of done

- [ ] Reviewed and merged
- [ ] Tests cover the change and pass
- [ ] Checked in the environment where it was reported

## Links

- Merge request: <link>
- Related: <issues>
```

### Task

```markdown
## Summary

<What needs doing and what it makes possible, in one or two sentences.>

## Why this is here

Unplanned. Asked for by <name or team> on <date>, through <where>. It couldn't wait because <reason>.

## Scope

- In: <what this covers>
- Out: <what it leaves alone>

## Acceptance criteria

- [ ] <A result someone can check.>
- [ ] ...

## Definition of done

- [ ] Reviewed and merged, or the result shared where the team will find it
- [ ] Docs updated where the way of working changed

## Links

- Merge request: <link>
- Related: <issues>
```

## What makes it a good backlog item

- **Independent:** it can ship without another unfinished issue.
- **Negotiable:** it says what and why, and leaves how to whoever does it.
- **Valuable:** the Summary says who is better off.
- **Estimable:** there is enough here for the team to size it.
- **Small:** it fits in a sprint. Bigger: say so, it needs splitting.
- **Testable:** each acceptance criterion can be checked by someone who didn't write it.
