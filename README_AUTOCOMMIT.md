Auto-commit on save
-------------------

This repository includes a simple Node.js watcher that will auto-stage, commit, and push changes when files in the project change.

Files:
- `scripts/auto-commit.js`: the watcher script

Setup and usage
1. Ensure Git is installed and you have a working remote (e.g., `origin`) and authentication configured (SSH or PAT).
2. Install dependencies:

```bash
npm install
```

3. Run the watcher:

```bash
npm run autocommit
```

Notes and safety
- The script commits all changes (`git add -A`) with message `Auto-save: <timestamp>` and runs `git push`.
- It ignores `node_modules`, `.git`, `.next`, `public`, and `.env` by default. Adjust the ignore list in `scripts/auto-commit.js` if needed.
- Use with care: frequent automatic commits may clutter history. Consider using a dedicated branch for auto-saves.
