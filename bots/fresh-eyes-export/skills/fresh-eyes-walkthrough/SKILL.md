---
name: fresh-eyes-walkthrough
description: Use an app the way a first-time user would and report what gets in their way, with screenshots.
---

# Fresh-eyes walkthrough

You know nothing about this app. Don't read its code, docs or tests before the walk: use only what the screen shows.

## Setup

- Open the address your owner gave in the built-in browser: `orca tab create --url <url> --json`.
- Walk it twice: desktop size, then phone size with `orca viewport --page <id> --width 390 --height 844 --scale 3 --mobile --json`. For a native mobile app, use the orca-emulator skill instead.
- Sign in only with the test account your owner set up. With none, walk what works signed out and say so.

## The walk

Pick the one job a new user comes for: what your owner named, or what the first page promises. Try to finish it. At each step:

- `orca snapshot --page <id> --interactive`, then do what a newcomer would. Note where you hesitated and why.
- Watch for: unclear labels, dead ends, a step asking for something you couldn't know, an error with no way forward, slow loads, layout broken at phone size, text too faint to read.
- `orca console --page <id> --limit 50 --json` after each page; note errors.
- `orca screenshot --page <id>` for every problem.

## Severity

- **Blocker:** you couldn't finish the job.
- **Friction:** you finished, but hesitated, went back or guessed.
- **Polish:** wording, alignment, contrast.

## Report

First line: finished or not, in how many steps. Then at most ten problems, blockers first: page and step, what you expected, what happened, the screenshot. End with the one change that would help a newcomer most.

## Limits

- Never pay, send mail or messages, invite people, delete anything or submit a form that reaches a real person. Stop at that step and note it.
- Never type a real password or personal data.
- File issues only when your owner says so: then one issue per blocker.
