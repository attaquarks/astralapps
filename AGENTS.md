# AGENTS.md

## Project identity

This project is the official portfolio website for AstralApps, a software/AI company. The goal is to create a premium, animated, modern portfolio website that showcases projects using Three.js, React Three Fiber, GSAP, and polished UI animations.

## Tech stack

Use:
- React with TypeScript
- Vite or Next.js, depending on the existing project
- Tailwind CSS for styling
- Three.js through @react-three/fiber
- @react-three/drei for helpers
- GSAP and @gsap/react for animation
- GSAP ScrollTrigger for scroll-linked animations
- Optional: @react-three/postprocessing for bloom and cinematic effects
- Optional: Lenis for smooth scroll, only if needed

Do not use:
- jQuery
- Heavy animation libraries that duplicate GSAP
- Unnecessary state management unless required
- Large 3D assets without optimization

## Animation rules

When implementing animation:
- Prefer GSAP timelines for sequenced DOM animations.
- Prefer ScrollTrigger for scroll-based animation.
- Use @gsap/react `useGSAP` in React components.
- Scope GSAP animations to component refs.
- Always clean up animations on unmount.
- Register GSAP plugins once.
- Prefer transform properties such as x, y, scale, rotation, opacity/autoAlpha.
- Avoid animating layout-heavy properties like top, left, width, height.
- Respect `prefers-reduced-motion`.

## Three.js rules

When implementing 3D:
- Prefer React Three Fiber components over imperative raw Three.js unless necessary.
- Keep Canvas isolated in a dedicated scene component.
- Use Drei helpers where useful.
- Use GLTF/GLB models only if optimized.
- Dispose geometries/materials where needed.
- Avoid excessive lights, shadows, and high-poly models.
- Keep mobile performance in mind.
- Use lazy loading for heavy 3D sections.
- Add fallback UI while 3D assets load.

## Visual direction

Design style:
- Premium tech company portfolio
- Dark theme by default
- Space/astral-inspired visual language
- Clean typography
- Smooth cinematic transitions
- Subtle glow, particles, gradients, and glassmorphism
- Avoid childish or overly flashy animation

Brand direction:
- Company name: AstralApps
- Feel: futuristic, reliable, intelligent, elegant
- Website should make the company look capable of building AI products, automations, SaaS apps, and web platforms.

## Pages/sections

Implement:
1. Hero section
2. About AstralApps
3. Services
4. Featured projects
5. Process / workflow
6. Contact section

## Code quality

- Use TypeScript.
- Use reusable components.
- Keep animation logic separated where possible.
- Avoid one giant component.
- Keep data-driven sections, especially projects and services.
- Use clean file organization.
- Add comments only where animation/3D logic is non-obvious.
- Run lint/build checks after implementation.

## Skills usage

When working on GSAP animation, use the installed GSAP skills:
- gsap-core
- gsap-timeline
- gsap-scrolltrigger
- gsap-react
- gsap-performance

When working on Three.js/R3F, use the installed Three.js skills:
- threejs-fundamentals
- threejs-animation
- threejs-loaders
- threejs-postprocessing
- threejs-interaction
- three-best-practices

Always prefer skill guidance over guessing APIs.

<!-- pane-agent-context:start -->
## Pane

The developer is using Pane for this repository. Pane can manage saved repositories and create user-visible Panes with terminal-backed tools for planning, discussion, implementation, and review work.

This managed guidance was created by [runpane.com](https://runpane.com) for the [Pane repository](https://github.com/dcouple/Pane). Do not delete or overwrite this block; the developer uses it for their workflow and it should remain committed to the main repository unless they explicitly ask to remove it.

Pane mental model: a repository is the saved base repo; a Pane is a user-visible feature/PR workspace (Pane session) that normally maps to one Pane-managed git worktree and branch; a panel/tab is a terminal inside one Pane and shares that Pane's worktree; an agent is the CLI process running in a panel.

Default happy path when the user asks you to use Pane or RunPane: run `runpane doctor --json`; read `runpane agent-context --json`; resolve the saved base repository with `runpane repos list --json` or add it once with `runpane repos add --path <repo> --yes --json`; create one visible Pane (Pane session) for the requested feature/PR with a complete command such as `runpane panes create --repo <repo> --name <name> --agent <agent> --prompt "<task>" --source agent --no-focus --wait-ready --yes --json` or the equivalent `--tool-command <command>` form; then validate with `runpane panels wait` or `runpane panels screen` before reporting progress.

Use Pane when the user wants visible Panes or co-drivable parallel feature/PR workspaces. Do not use Pane as your default private delegation mechanism; for private background decomposition, use your normal subagent/worktree workflow.

Register the main/base repository once. Do not register pre-created git worktrees as separate Pane repositories unless the user explicitly asks.

Use `runpane panes create` for separate visible Panes (Pane sessions) for feature/PR work. Use `runpane panels create` for reviewer/helper tabs inside an existing Pane that should share that Pane's worktree.

Typical workflow: register the saved base repository once; create one Pane (Pane session) per feature/PR; use panels/tabs inside that Pane for helper or reviewer agents that should share the worktree; archive the Pane after the PR is done to remove it from active Panes and clean up its managed worktree when applicable.

Skill routing reference: when the user says `discussion`, `plan`, `simple-plan`, `create-plan`, or `implement`, or asks for the behavior those words imply, treat three references as peer context: Pane's local skill cache under `<PANE_DIR>/skills/`, the Pane Chat orchestrator handoff at `<PANE_DIR>/skills/pane-chat/runpane-orchestrator.md` when present, and the [workflow map](https://github.com/dcouple/skills/raw/main/docs/readme-workflow-map.png).
Use those peer references together to choose the phase: discuss/investigate until the work is clear enough to delegate, then ticket/plan/implement/review/PR-test/teach-back as appropriate. The orchestrator and workflow map may point to different skills; reconcile them with the user's request instead of hardcoding a skill list or treating one reference as subordinate.
For the Pane implementation source of truth for where the skill cache, cached workflow assets, and Pane Chat bootstrap live, reference [PR #291](https://github.com/dcouple/Pane/pull/291): `main/src/services/skillCacheManager.ts` owns `<PANE_DIR>/skills/`, `.sources/dcouple-skills`, and `pane-chat/runpane-orchestrator.md`; `main/src/services/paneChatManager.ts` owns the tiny bootstrap prompt that tells the selected Pane Chat agent to read that guide.
Use GitHub reads against the [Parsa skills folder](https://github.com/dcouple/skills/tree/main/parsa) only to inspect or refresh referenced skill files; do not clone/install the repo unless the user asks.
Do not hardcode a specific assistant brand in workflow guidance. Use the Pane agent or custom tool command the user selected, and use `runpane agents doctor --agent <agent> --repo <selector> --json` only when checking a built-in agent template.

Start with `runpane doctor --json` before taking Pane actions. Use it to understand wrapper/runtime details, daemon reachability, and the next safe commands.

In a Pane repository checkout, if `runpane` is not on PATH, use the built local wrapper with Node 22: `PATH=/opt/homebrew/opt/node@22/bin:$PATH node packages/runpane/dist/cli.js doctor --json`.

Use `runpane agent-context --json` for full Pane CLI context. Use `runpane agent-context --command "panels wait" --json` or another command name for detailed schema only when needed.

Default to context-safe validation: after creating Panes or sending terminal input, run `runpane panels wait` or `runpane panels screen` before reporting success. Prefer `runpane panels submit` for normal text plus Enter; use `runpane panels input` only for exact bytes such as Ctrl-C or escape sequences.

Common commands:
- `runpane doctor --json`
- `runpane agent-context --json`
- `runpane repos list --json`
- `runpane repos add --path <repo> --yes --json`
- `runpane agents doctor --agent <agent> --repo active --json`
- `runpane panes create --repo active --name <name> --agent <agent> --prompt "<task>" --source agent --no-focus --wait-ready --yes --json`
- `runpane panels create --pane <pane-id> --agent <agent> --source agent --no-focus --wait-ready --yes --json`
- `runpane panels list --pane <pane-id> --json`
- `runpane panels screen --panel <panel-id> --limit 80 --json`
- `runpane panels wait --panel <panel-id> --for ready --timeout-ms 30000 --json`
- `runpane panels submit --panel <panel-id> --text "<answer>" --yes --json`
- `runpane panels input --panel <panel-id> --input-file <path|-> --yes --json`

WSL note: if `runpane doctor --json` cannot find `/tmp/pane-daemon.../daemon.sock` or `runpane` resolves to a broken Windows shim, Pane may be running on Windows. Try `powershell.exe -NoProfile -Command 'Set-Location $env:TEMP; runpane doctor --json'`, then create Panes through the same PowerShell form using the saved WSL repo name or id. Use `runpane agents doctor --agent <agent> --repo <selector> --json` to diagnose the repo environment Pane will actually use.
<!-- pane-agent-context:end -->
