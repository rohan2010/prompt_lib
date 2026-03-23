# New Project

Run all four agents in sequence to take a brand from zero to a QA-reviewed website build. Starts by creating a dedicated project folder. Do not skip any stage. Do not proceed to the next stage without completing the current one.

---

## SETUP — Create Project Folder

First, ask the user:
"What is the company or project name?"

Wait for the answer. Then:

1. Convert the name to lowercase kebab-case (e.g. "Orbit" → `orbit`, "My Brand" → `my-brand`)
2. Run this exact bash sequence:

```bash
mkdir -p projects/[project-name]/{.claude/{agents,skills,commands},docs,src/{css,js,images/{hero,gallery,showcase,social,logos}}}
```

3. Copy the agent files and skills into the new project:

```bash
cp .claude/agents/*.md projects/[project-name]/.claude/agents/
cp -r .claude/skills/* projects/[project-name]/.claude/skills/
cp .claude/commands/new-project.md projects/[project-name]/.claude/commands/
```

4. Tell the user:
"Project folder created at `projects/[project-name]/`. All work will be saved here. Starting brand intake now."

All files from this point forward — brand-brief.md, design-system.md, CLAUDE.md, build-log.md, qa-report.md, and all source code — must be created inside `projects/[project-name]/`.

---

## STAGE 1 — Brand Strategy

Invoke the **brand-strategist** agent.

Tell the user:
"Starting brand intake. I'll ask two rounds of questions — identity first, then scope and assets. Answer as much or as little as you know right now. Let's begin."

Run the full two-round intake interview. Do not write the brief until both rounds are complete.

Write the completed brief to:
`projects/[project-name]/docs/brand-brief.md`

Show the user a summary and ask:
"Does this brief accurately represent your brand? Type YES to proceed to design, or tell me what to change."

Wait for explicit YES before moving to Stage 2.

---

## STAGE 2 — Design System

Invoke the **design-director** agent.

Before making any design decisions, read:
`projects/[project-name]/.claude/skills/frontend-resource-library/SKILL.md`

Use the library to select:
- Visual style (Section 3 — Design Styles)
- Component library (Section 1 — Component Libraries)
- Animation stack (Section 2 — Animation Libraries)
- Font pairing (Section 4 — Font Pairings by Brand Archetype)
- Color system (Section 5 — Color Systems by Brand Archetype)
- Tech stack preset (Section 11 — Quick Stack Presets)

Every selection must reference a named entry from the resource library. Do not use libraries or fonts not listed there.

Write to:
- `projects/[project-name]/docs/design-system.md`
- `projects/[project-name]/CLAUDE.md`

Show the user a design summary:
- Visual style and why it fits the brief
- Font pairing and color palette
- Component library and animation stack
- Motion principle in one sentence

Ask: "Design system ready. Type YES to start building, or tell me what to change."

Wait for explicit YES before moving to Stage 3.

---

## STAGE 3 — Frontend Build

Invoke the **frontend-builder** agent.

Read these files before writing any code:
- `projects/[project-name]/docs/brand-brief.md`
- `projects/[project-name]/docs/design-system.md`
- `projects/[project-name]/CLAUDE.md`
- `projects/[project-name]/.claude/skills/frontend-resource-library/SKILL.md`

Install only the libraries specified in the approved design system. All source files go into `projects/[project-name]/src/`.

Build in this order, confirming with the user after each before continuing:

1. `src/css/tokens.css` — full CSS custom property system from design-system.md
2. Nav component
3. Hero section
4. Remaining sections in the order listed in brand-brief.md

After each section, append a status entry to:
`projects/[project-name]/docs/build-log.md`

When all sections are complete, tell the user:
"Build complete. All files saved in projects/[project-name]/src/. Moving to QA."

---

## STAGE 4 — QA Review

Invoke the **qa-reviewer** agent.

Read:
- `projects/[project-name]/docs/brand-brief.md`
- `projects/[project-name]/docs/design-system.md`
- `projects/[project-name]/docs/build-log.md`
- `projects/[project-name]/CLAUDE.md`
- All files in `projects/[project-name]/src/`

Score across all 5 dimensions. Write results to:
`projects/[project-name]/docs/qa-report.md`

Show the user the score table and status.

If score ≥ 80:
"✅ Build passed QA ([score]/100). Project is ready for your review at projects/[project-name]/"

If score < 80:
"❌ Build needs work ([score]/100). Here are the specific fixes needed:"
[list remediation tasks]
"Should I send these back to the frontend-builder to fix? Type YES to continue."

---

## Final Summary

When the pipeline is complete (pass or after remediation), print:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PROJECT: [Project Name]
  LOCATION: projects/[project-name]/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  docs/brand-brief.md      ✅
  docs/design-system.md    ✅
  docs/build-log.md        ✅
  docs/qa-report.md        ✅ [score]/100
  CLAUDE.md                ✅
  src/                     ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Rules

- Always create the project folder before anything else
- All files must live inside `projects/[project-name]/` — never in the root workspace
- Never skip a stage
- Never proceed past a stage without explicit user approval (YES)
- Always read the frontend resource library before any design decision in Stage 2
- If the user says "skip" at any approval gate, ask once to confirm before proceeding
- If the project name contains spaces, convert to lowercase kebab-case automatically