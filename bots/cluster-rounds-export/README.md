# Cluster rounds: after install

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
2. **Tell the bot the context's name** (`orca-bots`), never your admin context. On its first run it checks the context can't change anything.
3. **Connect GitHub.** Accept the **Connect** card the bot offers in its first chat, and pick the orgs or repos it may read deploys from and file issues in. Skip if you don't use GitHub.
4. **Connect GitLab.** Sign in to the GitLab connector in the browser when the bot asks. For self-managed or Dedicated GitLab, give the bot your address (`gitlab.example.com`); it reconnects at `https://<host>/api/v4/mcp`. Skip if you don't use GitLab.
5. **Answer the bot's first questions:**
   - which namespaces are production, and which to skip;
   - how you deploy: Argo CD, Flux, Helm from a CI pipeline, or plain manifests;
   - the repo that holds your manifests or charts;
   - which clusters to walk, if you have several contexts.
6. **Turn the automation on** in **Automations** once the first rounds look right:

   | Automation                 | When             |
   | -------------------------- | ---------------- |
   | What broke since yesterday | Weekdays 8:30 AM |

## Check it works

- Ask the bot: "Do the rounds now." You should get one line saying nothing is wrong and what it checked, or at most ten problems, each with what is wrong, since when, the likely cause and the next step.
- The next morning, a problem still there should come back marked "day 2", and one that went away should be listed as recovered.

## Good to know

- It only reads the cluster: `get`, `describe`, `logs`, `top`. It never applies, deletes, edits, scales, restarts or execs.
- It never reads a Secret's values, and it describes instead of quoting secrets or personal data it sees in logs.
- It checks nodes, pods, workloads, jobs, volume claims, autoscalers, cert-manager certificates and warning events.
- It never calls the cluster healthy: it says what it checked and what it found.
- It files an issue only when you say so.
- What the bot can see depends on what the context may read. When a check is skipped for lack of access, the report says which.
- No webhooks: this bot runs on its schedule only.
