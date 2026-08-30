# Git Collapse Guideline

This guide explains how to collapse a repository's visible history so the current code becomes the new baseline.

Use this when:

- The current `main` branch is the only version you care about.
- You do not plan to return to older commits.
- You want GitHub and local `main` to show a clean, minimal history.

This is a destructive history rewrite for the branch you publish. It should be done intentionally.

## Repository visibility

Keep this document and other internal `_docs` guidance out of the public GitHub repository. Do not stage, commit, or push these files unless the repository owner explicitly decides they should be public.

## What "collapse history" means

Collapsing history means:

- Keep the current files exactly as they are.
- Replace the old branch history with one fresh commit.
- Force-push that rewritten branch to the remote.

After this, `main` looks like a newly started repo that already contains the current project.

## When to use it

Good cases:

- A long experimental history no longer matters.
- The repo has become messy and only the latest state matters.
- You want a clean public starting point before future work.

Not good cases:

- Multiple people are actively basing work on existing commit history.
- You still rely on old commit references, PR links, or bisect/debug workflows.
- You are unsure whether older history may still matter.

## Risks

- Old commit hashes on `main` stop being valid for normal branch history.
- Anyone with an old local clone will need to resync.
- Open or old PR references may become confusing.
- A force push is required.

## Recommended workflow

### 1. Confirm the working tree is clean

```powershell
git status --short
```

Do not collapse history with uncommitted work unless you are very sure what you are doing.

### 2. Confirm you are on the branch you want to rewrite

```powershell
git branch --show-current
```

Usually this is `main`.

### 3. Create a local safety branch

This keeps a pointer to the old history before rewriting.

```powershell
git branch backup-main-before-squash-YYYYMMDD
```

Example:

```powershell
git branch backup-main-before-squash-20260802
```

### 4. Create an orphan branch from the current working tree

```powershell
git checkout --orphan main-squashed
```

This creates a branch with no parent commit history, while keeping the current files staged as a new root snapshot.

### 5. Commit the current project as one fresh root commit

```powershell
git commit -m "Initial commit"
```

You can use a different message if you want, for example:

```powershell
git commit -m "Reset history to current production baseline"
```

### 6. Replace the old `main` ref

Delete the old local `main` pointer:

```powershell
git branch -D main
```

Rename the orphan branch back to `main`:

```powershell
git branch -m main
```

### 7. Verify the result locally

```powershell
git log --oneline --decorate --graph --max-count=5
git status --short --branch
```

Expected outcome:

- `main` has one commit.
- The working tree is clean.

### 8. Force-push the rewritten history

```powershell
git push --force origin main
```

This updates GitHub so the remote branch also shows only the collapsed history.

## Full command sequence

```powershell
git status --short
git branch --show-current
git branch backup-main-before-squash-YYYYMMDD
git checkout --orphan main-squashed
git commit -m "Initial commit"
git branch -D main
git branch -m main
git log --oneline --decorate --graph --max-count=5
git status --short --branch
git push --force origin main
```

## Recovery

If you regret the rewrite before deleting your backup branch, you can return to the old history using the backup reference.

Inspect the backup:

```powershell
git log --oneline backup-main-before-squash-YYYYMMDD --max-count=10
```

Reset `main` back to it locally:

```powershell
git checkout main
git reset --hard backup-main-before-squash-YYYYMMDD
```

Push it back to the remote:

```powershell
git push --force origin main
```

## Notes for future use

- Always create a backup branch first.
- Always verify you are rewriting the correct branch.
- Always assume a force push affects collaborators.
- Do not do this casually on shared repos without alignment.

## Suggested policy

Use collapse only when the current code is clearly the new truth and historical branch archaeology no longer has practical value. Keep this guideline as internal documentation unless there is an explicit decision to publish it.
