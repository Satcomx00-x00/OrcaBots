# Cluster sweeper: after install

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
3. **Connect GitHub.** Accept the **Connect** card the bot offers in its first chat, and pick the orgs or repos it may read pull requests from and open pull requests in. Skip if you don't use GitHub.
4. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab.
5. **Answer the bot's first questions:**
   - which namespaces are production, and which to skip;
   - how you deploy: Argo CD, Flux, Helm from a CI pipeline, or plain manifests;
   - the repo that holds your manifests or charts;
   - how review namespaces are named (for example `review-*`), if you have them;
   - anything it should never report.
6. **Turn the automation on** in **Automations** once the first sweep looks right:

   | Automation                | When          |
   | ------------------------- | ------------- |
   | What nobody uses any more | Tuesdays 2 PM |

## Check it works

- Ask the bot: "Sweep the cluster now." You should get at most twenty leftovers, biggest first, each with its age and size, why it looks unused, how sure the bot is, and how to remove it.
- Say "keep the second one". It should stop reporting it. Say "remove the first" for something defined in Git that holds no data. It should open one pull request or merge request removing only that.

## Good to know

- It never deletes or scales anything. For a leftover that isn't in Git, or that holds data, it tells you what and where; removing it is yours.
- It only reads the cluster, and two locks keep it that way. The cluster's own access rules: the read-only identity above can't change anything. And `kubectl-ro.sh`, a script in the bot's skill folder that every command goes through: it allows `get`, `describe`, `logs`, `top`, `events`, `explain` and `auth can-i`, and refuses the rest.
- It never writes out a command that changes the cluster, even for you to run. It names the object and says what should happen; how is yours.
- The script needs a POSIX shell (`sh`). On Windows, run the bot under WSL or on a Linux or macOS paired server.
- Anything that holds data is never rated better than "check first", and the report says what to back up or look at.
- It looks for unmounted volume claims, released volumes, namespaces of closed pull requests or merge requests, load balancers with nothing behind them, workloads at zero, finished jobs, empty namespaces and unreferenced ConfigMaps.
- With the read-only access above it can't list Secrets, so it skips unused Secrets and says so. If your own context may list them, it reads their names only.
- What the bot can see depends on what the context may read. When a check is skipped for lack of access, the report says which.
- No webhooks: this bot runs on its schedule only.
