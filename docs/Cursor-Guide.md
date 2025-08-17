# Cursor AI: The Complete Beginner-to-Pro Guide

A practical, no-fluff guide to using Cursor as your everyday AI coding editor. Built for newcomers; useful for experts.

---

## What is Cursor?

Cursor is a code editor supercharged with AI. It is designed to:

- Understand your codebase and propose accurate edits across multiple files
- Generate, refactor, and explain code with context from your repository
- Review and improve code with human-readable diffs you can accept or reject
- Speed up your workflow with inline completions, chat, and code-aware commands

You get the familiarity of a modern editor plus an AI pair programmer that sees your project.

---

## Quick Start

1. Install the Cursor app and sign in.
2. Open a folder or clone a repository.
3. Let Cursor index your codebase so AI can reference your project.
4. Start a chat and describe a concrete task. Mention files or select code so Cursor has context.
5. Review proposed edits as diffs. Accept, tweak, or ask for alternatives.

Pro tip: Be specific. Point Cursor to files, selections, errors, or test failures. The more grounded the context, the better the result.

---

## Interface Tour

- **Editor**: Your main code view. Inline completions and AI edits appear here.
- **Sidebars**: File explorer, search, Git, problems, outline, and extensions.
- **Chat**: Code-aware conversation. Reference files, selections, errors, or tests.
- **Composer/Actions**: Quick AI actions like Refactor, Explain, Add tests, Fix.
- **Diff View**: AI edits appear as a reviewable diff. Apply all or per-file.
- **Terminal**: Run commands, capture logs, and ask Cursor to fix issues from traces.
- **Command Palette**: Discover everything. Search for commands and Cursor actions.

---

## Core AI Features

### 1) Code-Aware Chat

- Ask questions, generate code, or request edits.
- Reference files, symbols, and selections so the model focuses on the right scope.
- Get multi-file edits as a diff you can inspect and apply.

Common asks:
- "Explain how `auth` middleware validates JWTs."
- "Add input validation to `api/users.ts` and update tests."
- "Refactor these functions to be pure and add unit tests."

### 2) Inline Completions

- Type, and accept smart suggestions inline.
- Cursor learns from your project style, libraries, and patterns.
- Use completions for boilerplate, mapping types, data transforms, and repetitive code.

### 3) Selection-Based Actions

Highlight code and run focused actions:
- Explain or document a function
- Refactor, extract, or rename safely
- Add types, improve performance, simplify logic
- Generate unit tests and usage examples

### 4) Apply Edits as Diffs

- Cursor proposes changes as reviewable diffs.
- Inspect changes file-by-file. Accept, reject, or ask for alternatives.
- For large changes, request smaller, incremental edits to stay in control.

### 5) Error- and Test-Driven Fixes

- Paste an error trace or failing test output; ask Cursor to fix the root cause.
- Cursor can point to likely files, propose diffs, and explain the reasoning.

---

## Context and Codebase Awareness

- **Repository Indexing**: Cursor indexes your code so the model can search by meaning, not just text.
- **Selections and Open Files**: What you highlight and what is open is high-signal context.
- **File and Symbol References**: Point to files, folders, or symbols to anchor the task.
- **Limits**: Very large repos may require scoping. Work file-by-file or feature-by-feature.

Tips:
- Quote relevant snippets or select code before asking.
- Mention specific files and tests by path.
- Keep conversations focused on one task at a time.

---

## Smart Editor Actions (Examples)

- **Explain**: Clarify a function, module, or architecture.
- **Refactor**: Improve naming, extract functions, reduce complexity.
- **Optimize**: Remove redundant work, reduce allocations, batch I/O.
- **Type**: Add or tighten types; infer generics; remove `any`.
- **Docs**: Generate docstrings and usage examples.
- **Tests**: Create or expand unit/integration tests with realistic fixtures.
- **Fix**: Resolve linter errors, runtime exceptions, or failing tests.
- **Migrate**: Upgrade frameworks or libraries safely with codemods.

---

## Git and PR Workflows

- Stage only what you intend to commit; keep AI edits reviewable.
- Ask Cursor to summarize diffs and suggest commit messages.
- Use AI to review your changes for edge cases and performance.
- For PRs, request a structured review: correctness, tests, readability, risks.

Check list before merging:
- Are tests updated or added?
- Are breaking changes documented?
- Is public API typed and documented?

---

## Working with the Terminal and Logs

- Capture failing command output and ask Cursor to diagnose.
- Provide enough surrounding context (inputs, env vars, versions).
- Ask for a minimal fix first; then for a hardening pass and tests.

---

## Prompting Playbook

Make requests concrete, scoped, and testable.

Good patterns:
- "Given this selection, extract a pure function and return type."
- "Implement this feature in `app/routes/user.tsx`; update affected tests."
- "These tests fail; fix the underlying bug and keep behavior stable."
- "Refactor to remove side effects; preserve API."

Include:
- Goal and constraints
- Target files and functions
- Inputs/outputs and edge cases
- Performance or security requirements

---

## Settings to Review Early

- Indexing options for large repos
- Telemetry and cloud features per your org policy
- Keybindings for chat, actions, and accept completion
- Default language/formatter/linter integrations

---

## Troubleshooting

- **Model can’t find a symbol**: Reference the file or open it so it’s indexed and in context.
- **Edits are too broad**: Ask for smaller, incremental diffs.
- **Completions feel off**: Provide examples or accept a few suggestions to steer style.
- **Chat lost the thread**: Start a fresh chat focused on a single task.

---

## Security and Privacy

- Never paste secrets. Use local environment variables and secret managers.
- Sanitize production data before sharing logs.
- Keep edits reviewable; run tests locally before committing.

---

## Example Workflows

### Implement a Feature

1. Describe the spec and affected files.
2. Ask Cursor to scaffold the implementation and tests.
3. Review the diff; request changes where needed.
4. Run tests; iterate on failures with Cursor.

### Fix a Bug from a Trace

1. Paste the stack trace and reproduction steps.
2. Ask Cursor to identify the root cause and propose a minimal fix.
3. Request a follow-up hardening pass and tests for edge cases.

### Refactor Safely

1. Select the code; state the desired outcome (e.g., extract, simplify, type).
2. Apply the diff and run tests.
3. Ask Cursor to scan for related call sites or dead code.

---

## FAQ

- **Is Cursor a replacement for tests?** No. Use it to write better tests faster.
- **Can it change many files at once?** Yes, but keep changes scoped and review diffs.
- **How do I get better results?** Provide concrete context, constraints, and examples.
- **What if I disagree with an edit?** Reject it and explain what to keep/change.

---

## Further Resources

- Explore your editor’s command palette to find Cursor-specific commands
- Read official docs and community tips for advanced workflows
- Join community channels to learn real-world prompting patterns

---

Thanks for using Cursor. Treat it like a focused pair programmer: give it context, review its work, and iterate quickly.