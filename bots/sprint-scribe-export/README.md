# Sprint scribe: after install

Do these once, in order, after **Create**. Everything arrives paused, and the bot writes nothing to GitLab until you approve its first preview in step 7.

## After install

1. **Turn on Agent Session History.** Orca **Settings → Agent Session History**, on the computer you work on. The bot reads one computer at a time. Without it, it only sees your commits and your GitLab activity.
2. **Sign in `glab`,** GitLab's command-line tool, on that same computer, as yourself:

   ```bash
   glab auth login
   ```

   The bot needs it to edit a note in place. Orca's own GitLab features use it too, so you may already have it.
3. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`.
4. **Create the `unplanned` label** in your GitLab group or project, if you don't have one. The bot never invents a label.
5. **Answer the bot's first questions:**
   - the GitLab group or project, and what a sprint is for your team: an **iteration** or a **milestone**;
   - which projects it may read your work from. Anything outside them is ignored;
   - the project that gets work belonging to no repo, such as a review or a support request;
   - the team's labels for bugs, features and chores;
   - your team's definition of done, if you have one written down;
   - whether to show effort in notes (as durations, default yes), and whether to set a weight on issues it creates (default no).
6. **Add your repos as Orca projects,** if they aren't already: the bot reads commits and workspaces only from projects Orca knows.
7. **Approve the first preview.** Ask the bot: "Log today." The first time it shows every note and issue it would write and waits. Say yes, or say what to change. After that it writes on its own each evening.
8. **Turn the automation on** in **Automations**:

   | Automation                    | When             |
   | ----------------------------- | ---------------- |
   | Log today's work on the board | Weekdays 5:30 PM |

## Check it works

- After your yes, open one of your sprint issues on GitLab. It should have one note, written as you, starting with status, progress, what's next and links, with a folded log underneath.
- The next evening, the **same** note should show the new status and one more line in its log. The issue should still have exactly one such note.
- Do some work that has no issue, then ask the bot: "Log today." A new issue should appear, assigned to you, in the current sprint, labeled `unplanned`, with a summary, why it came up, acceptance criteria and a definition of done.
- Tell the bot: "side quest: looked at the staging outage with Sam, about half an hour". It should add a line to the sprint's "interruptions and small requests" issue.
- The bot's chat should end each run with a summary: updated, created, couldn't place, for you to do.

## Good to know

- **One note per issue, always the same one.** The bot finds it by a hidden marker line and edits it in place. If it can't edit, it posts nothing and tells you. It never deletes a note.
- **It writes as you.** Notes and issues appear under your GitLab name, because the bot uses your sign-in.
- **It writes on its own after the first preview.** To go back to asking each time, tell it "ask me first".
- **Only your issues.** It never comments on, relabels or moves someone else's issue. On your planned issues it only keeps the note: never the title, description, weight or dates.
- **It never closes an issue.** When work is done the note says Done, and the summary lists the issue for you to close.
- **What stays out of GitLab:** text copied from sessions or private messages, customer data, anything sensitive, hours of the day, and @-mentions. It describes the work and gives durations.
- **When it isn't sure where work belongs, it asks** in its summary instead of guessing.
- **Unplanned issues follow one standard:** a title that names the outcome, a user story, bug or task body, why it came up and who asked, checkable acceptance criteria, and a definition of done. Work too big for a sprint is flagged for splitting.
- **Small interruptions** (under about half an hour, no code change) go as lines in one issue per sprint instead of an issue each.
- **Iterations** are a paid GitLab feature, as far as we know. With milestones the bot sets the milestone. With iterations it checks after creating that the issue shows the sprint, and tells you when it doesn't.
- If you run **Sprint guardian**, it will report each unplanned issue as an addition to the sprint, with what it costs.
- No webhooks: this bot runs on its schedule, and when you talk to it.
