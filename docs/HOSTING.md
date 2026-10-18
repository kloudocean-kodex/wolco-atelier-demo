# Atelier hosting setup

Created and read back from Cloudflare on 18 October 2026. No website deployment was claimed at setup time: the GitHub repository did not yet contain the final source commit, and the Pages project had no canonical deployment.

| Setting | Authoritative value |
| --- | --- |
| Cloudflare Pages project | `wolco-atelier-demo` |
| Project ID | `6018e209-39e8-4269-b9b2-07b26194bfb0` |
| Assigned subdomain | `wolco-atelier-demo.pages.dev` |
| Git provider | GitHub |
| Repository | `kloudocean-kodex/wolco-atelier-demo` |
| Repository ID | `1424038017` |
| Production branch | `main` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Repository root directory | Repository root |
| Production automatic deployment | Enabled |
| Preview branches | All branches |
| Automatic PR comments | Disabled |

The local repository is initialized on `main` with `origin` set to `https://github.com/kloudocean-kodex/wolco-atelier-demo.git`. No source files were staged, committed or pushed during this hosting setup. The release owner commits and publishes only after the final media and browser checks.

`cloudflare-project-setup.json` contains the sanitized create/readback evidence. API credentials came from Wrangler's supported `auth token --json` command, stayed in the setup process's memory and were not written into this repository or printed. No payment plan, account-wide permission or other Cloudflare project was changed.

The project uses no secrets, bindings, database or backend submission service. Its existing noindex and privacy behaviour remain part of the static build. The original WOLCO production domain and the separate Redline Pages configuration are outside this project setup.

## Publication preflight

Run `npm run verify` and `npm run build`, review the tracked candidate files, then commit/push `main`. Cloudflare's existing Git integration will build that commit. Verify the actual deployment and public browser behaviour separately after the push.

The `.gitignore` excludes build output, dependencies, Wrangler state, local environment/development variables, logs, private-key/certificate bundles, OS metadata and local QA screenshot folders. A current-source pattern scan found no credential patterns, credential-like files or unexpected email addresses. That scan is not a historical credential, image-metadata or vault audit.

API schema used: [Cloudflare — Create a Pages project](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/create/). Integration behaviour: [Cloudflare — GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/).
