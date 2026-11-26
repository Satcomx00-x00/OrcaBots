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
   - the team's labels for each type of issue (implementation, bug, user story, task);
   - **priority:** the bot looks up the options of your work items' **Priority** field and asks which one means highest, high, medium and low. Tell it the field's name if it isn't "Priority";
   - what each **weight** stands for in time. The bot shows its default table (below) and uses yours if you change it;
   - the **parent** for unplanned work: an epic or parent issue per area, one for all of it, or none;
   - whether a merge request should get the line `Related to #<n>` (default) or `Closes #<n>`;
   - your team's definition of done, if you have one written down;
   - whether to show time in notes (default yes). Time tracking on the issue is logged either way.
6. **Add your repos as Orca projects,** if they aren't already: the bot reads commits and workspaces only from projects Orca knows.
7. **Approve the first preview.** Ask the bot: "Log today." The first time it shows every note and issue it would write and waits. Say yes, or say what to change. After that it writes on its own each evening.
8. **Turn the automation on** in **Automations**:

   | Automation                    | When             |
   | ----------------------------- | ---------------- |
   | Log today's work on the board | Weekdays 5:30 PM |

## Check it works

- After your yes, open one of your sprint issues on GitLab. It should have one note, written as you, starting with status, weight, time, priority and parent, then progress, what's next and links, with a folded log underneath. The issue's own time tracking should show the time logged, and its merge request should be linked.
- The next evening, the **same** note should show the new status and one more line in its log. The issue should still have exactly one such note.
- Do some work that has no issue, then ask the bot: "Log today." A new issue should appear, assigned to you, in the current sprint, labeled `unplanned`, with a weight, time spent, a priority, and its merge request. If it was code work, its description should have exactly these sections: Context, Scope (In and Out), Acceptance Criteria, Verification, Risks and Rollback.
- Work on an issue for longer than its weight stands for. The bot should raise the weight to the next Fibonacci number that fits, write "planned <n>" in the note, and say so in its summary.
- Tell the bot: "side quest: looked at the staging outage with Sam, about half an hour". It should add a line to the sprint's "interruptions and small requests" issue.
- The bot's chat should end each run with a summary: updated, created, couldn't place, for you to do.

## Good to know

- **One note per issue, always the same one.** The bot finds it by a hidden marker line and edits it in place. If it can't edit, it posts nothing and tells you. It never deletes a note.
- **It writes as you.** Notes and issues appear under your GitLab name, because the bot uses your sign-in.
- **It writes on its own after the first preview.** To go back to asking each time, tell it "ask me first".
- **Only your issues and merge requests.** It never comments on, relabels or moves someone else's. On your planned issues it keeps the note and the fields below, and never touches the title, description or dates.
- **Weight follows the time spent, in Fibonacci numbers only** (1, 2, 3, 5, 8, 13, 21). Its default table, which you can change in the first chat:

  | Weight | Stands for                                       |
  | ------ | ------------------------------------------------ |
  | 1      | up to 2 hours                                    |
  | 2      | up to half a day (4 h)                           |
  | 3      | up to a day (8 h)                                |
  | 5      | up to two and a half days (20 h)                 |
  | 8      | up to a week (40 h)                              |
  | 13     | up to two weeks (80 h): too big, should be split |
  | 21     | more than that: must be split                    |

  It raises a weight as soon as the time spent passes its range, and lowers one only when the work is done and took less. The weight the team planned stays in the note as "planned <n>", so your estimates aren't lost. **Estimate calibrator** uses that planned weight.
- **Time tracking** uses GitLab's own: time spent is logged once a day per issue, and an estimate is set only where there is none. GitLab adds its own small "added time spent" lines to the issue's activity when time is logged. Those are GitLab's system lines, not comments from the bot; the bot still writes exactly one note.
- **Time is worked out from your sessions and commits,** so it is an approximation, rounded to the quarter hour. What you tell the bot wins: "that took two hours".
- **Merge request:** if yours doesn't already name the issue, the bot adds one line at the end of its description, `Related to #<n>`, and changes nothing else in it.
- **Priority** is the work item's own Priority field, set to one of the options your group defined for it. It is a custom field of the top-level group, so the bot looks its options up instead of assuming them. Only if your group has no such field does it fall back to a priority label.
- **Parent** is the work item's own parent: an epic or a parent issue.
- **Both are set only where empty,** and never changed once set. When the bot can't tell which parent or priority is right, it asks in its summary.
- **Weights, epics, iterations and custom fields such as Priority are paid GitLab features** (Premium or Ultimate). Where your project doesn't have one, the bot skips it and says so once.
- **It never closes an issue.** When work is done the note says Done, and the summary lists the issue for you to close.
- **What stays out of GitLab:** text copied from sessions or private messages, customer data, anything sensitive, hours of the day, and @-mentions. It describes the work and gives durations.
- **When it isn't sure where work belongs, it asks** in its summary instead of guessing.
- **Unplanned issues follow one standard:** a title that names the outcome, and a body from the template for its type. **Implementation:** Context, Scope (In and Out), Acceptance Criteria, Verification, Risks and Rollback. **Bug:** steps, expected, actual. **User story:** as a, I want, so that. **Task:** scope and result. Work that reaches weight 13 is flagged for splitting.
- **Small interruptions** (under about half an hour, no code change) go as lines in one issue per sprint instead of an issue each.
- With milestones the bot sets the milestone. With iterations it checks after creating that the issue shows the sprint, and tells you when it doesn't.
- If you run **Sprint guardian**, it will report each unplanned issue as an addition to the sprint, and each corrected weight as a resize, with what they cost.
- No webhooks: this bot runs on its schedule, and when you talk to it.
