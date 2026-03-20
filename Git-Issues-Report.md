# Git Issues Report

**Project:** cowsay npm package
**Student:** Ivana San Pedro
**Date:** March 19, 2026

---

## Summary of Git Issues
During the Unicode/emoji upgrade project, several git-related challenges were encountered:

### 1. Reverting Changes
- Attempted to revert to the last commit using `git reset --hard HEAD`, but files were not restored to the expected previous state.
- Required further steps, such as identifying the correct commit hash with `git log` and running `git reset --hard <commit_hash>` to fully restore the project.
- This process risked losing uncommitted changes, highlighting the importance of using `git stash` before resets.

### 2. File Restoration Confusion
- After running reset commands, some files remained altered or did not match the original state.
- This caused confusion about whether the revert was successful and required additional verification with `git status` and manual inspection.

### 3. Module and Extension Changes
- Switching between CommonJS and ES module syntax led to renaming files (e.g., `.js`, `.cjs`, `.mjs`) and updating imports/exports.
- These changes complicated the git workflow, as resets and checkouts sometimes did not revert file extensions or content as expected.

### 4. Bin and CLI File Issues
- Changing CLI file names and extensions (e.g., `cli.js` to `cli.cjs` or `cli.mjs`) required updates to the `package.json` bin field.
- If not properly tracked or committed, these changes could be lost or cause errors after a reset.

## Lessons Learned
- Always check commit history and file status before running destructive git commands.
- Use `git stash` to save uncommitted work before resetting or reverting.
- Verify file restoration with `git status` and manual review.
- Track file renames and extension changes carefully, especially when switching module systems.

---

**Prepared for:** Professor Teeters
**By:** Ivana San Pedro
