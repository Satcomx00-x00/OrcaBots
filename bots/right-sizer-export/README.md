# Right-sizer: after install

Do these once, in order, after **Create**. Everything arrives paused, so nothing runs until step 6.

## After install

1. **Give the bot a read-only way into the cluster.** On the computer (or paired server) where the bot runs, `kubectl` must be installed and the kubeconfig must hold a context that can only read. If you have one, skip to step 2. Otherwise, from your clone of this repo, with your admin access:

   ```bash
   kubectl apply -f k8s/read-only-rbac.yaml
   ```

   ```bash
   kubectl config set-credentials orca-bots --token="$(kubectl create token orca-bots -n kube-system --duration=720h)"
   ```

   ```bash
   kubectl config set-context orca-bots --cluster=<your cluster's name> --user=orca-bots
   ```

   That creates a service account that can read workloads, nodes, volumes and metrics, and cannot read Secrets or change anything ([`k8s/read-only-rbac.yaml`](../../k8s/read-only-rbac.yaml)). `kubectl config get-clusters` lists cluster names. The token expires after 30 days, or sooner if your cluster caps it: run the second command again when it does. Run these yourself; never paste a token into the bot's chat.
2. **Tell the bot the context's name** (`orca-bots`), never your admin context. At the start of every run it checks the context can't change anything, and it refuses to work in a cluster where it can.
3. **Connect GitHub.** Accept the **Connect** card the bot offers in its first chat, and pick the orgs or repos it may read manifests from and open pull requests in. Skip if you don't use GitHub.
4. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab. If the sign-in is refused, access to the GitLab MCP server has to be allowed first: by an owner of your top-level group on GitLab.com, or by an administrator on self-managed GitLab.
5. **Answer the bot's first questions:**
   - which namespaces are production, and which to skip;
   - how you deploy: Argo CD, Flux, Helm from a CI pipeline, or plain manifests;
   - the repo that holds your manifests or charts;
   - a **Prometheus address** the bot's computer can reach, if you have one. Without it the bot uses the Vertical Pod Autoscaler's recommendations, or failing that a snapshot of current usage.
6. **Turn the automation on** in **Automations** once the first comparison looks right:

   | Automation                                  | When            |
   | ------------------------------------------- | --------------- |
   | What is oversized, what is about to run out | Wednesdays 2 PM |

## Check it works

- Ask the bot: "Size the cluster now." You should get one line for the cluster (cores and gigabytes requested against used, and where the figures came from), then five oversized workloads and five at risk, each with current and proposed values.
- Say "go with the first three". It should open one pull request or merge request changing only those values, with the seven-day figures in the body.

## Good to know

- It only reads the cluster, and two locks keep it that way. The cluster's own access rules: the read-only identity above can't change anything. And `kubectl-ro.sh`, a script in the bot's skill folder that every command goes through: it allows `get`, `describe`, `logs`, `top`, `events`, `explain` and `auth can-i`, and refuses the rest.
- It never writes out a command that changes the cluster, even for you to run. It names the object and says what should happen; how is yours.
- The script needs a POSIX shell (`sh`). On Windows, run the bot under WSL or on a Linux or macOS paired server.
- It counts in cores and gigabytes, not money.
- It never proposes a request below the workload's peak in the period, or below the level of its last out-of-memory kill.
- With only a snapshot it reports extremes and proposes no lower request: one moment is not a week.
- It leaves alone workloads younger than a week, Jobs and CronJobs.
- The Prometheus queries assume the usual cAdvisor and kube-state-metrics metric names. If yours differ, tell the bot.
- A proposal is a starting point: watch the first days after a change.
- It never reads a Secret's values, and it describes instead of quoting secrets or personal data it sees in logs.
- What the bot can see depends on what the context may read. When a check is skipped for lack of access, the report says which.
- No webhooks: this bot runs on its schedule only.
