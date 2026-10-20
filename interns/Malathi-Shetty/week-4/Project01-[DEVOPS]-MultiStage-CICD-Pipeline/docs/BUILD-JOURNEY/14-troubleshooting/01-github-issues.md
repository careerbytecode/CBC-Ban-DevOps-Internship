# 01 — GitHub Issues

## Overview

During the FlavorForge development and DevSecOps journey, Git and GitHub were used for source-code management, version control, collaboration, and maintaining the project history.

This document records common GitHub-related issues that can occur while working with the FlavorForge repository and provides the recovery approach used during the project.

The objective is not to hide errors, but to document the problem → investigation → recovery process so that the project remains reproducible.

---

## 1. Git Repository Status

Before making changes, check the current repository state:

```bash
git status
```

This helps identify:

* Modified files
* New files
* Deleted files
* Untracked documentation
* Current branch
* Pending commits

A clean working tree is expected after completed changes have been committed.

---

## 2. Repository Behind Remote Branch

A local branch can become behind the GitHub remote branch when another commit is pushed to the remote repository.

Check the relationship between the local and remote branches:

```bash
git fetch origin
git log --oneline --left-right main...origin/main
git status
```

For example, Git may report:

```text
Your branch is behind 'origin/main' by 1 commit,
and can be fast-forwarded.
```

### Recovery

If the local branch contains no conflicting local commits, a fast-forward pull can be used:

```bash
git pull --ff-only origin main
```

This updates the local branch without creating an unnecessary merge commit.

---

## 3. Local Changes Before Pulling

If Git reports that local changes would be overwritten by a pull, do not immediately force the operation.

First inspect the changes:

```bash
git status
git diff
```

If the changes are required, commit them:

```bash
git add .
git commit -m "docs: update documentation"
```

Then update the branch:

```bash
git pull --ff-only origin main
```

If the changes are incomplete and should be temporarily stored:

```bash
git stash
git pull --ff-only origin main
git stash pop
```

After applying the stash, check:

```bash
git status
```

and resolve any conflicts before committing.

---

## 4. Merge Conflicts

A merge or rebase conflict can occur when the local and remote branches contain changes to the same part of a file.

Check the conflicting files:

```bash
git status
```

Git marks conflicts inside the affected file:

```text
<<<<<<< HEAD
local changes
=======
remote changes
>>>>>>> origin/main
```

The conflicting content must be reviewed manually.

After resolving the file:

```bash
git add <file>
```

Then complete the appropriate Git operation.

For a merge:

```bash
git commit
```

For a rebase:

```bash
git rebase --continue
```

Finally verify:

```bash
git status
```

---

## 5. Git Rebase Recovery

Rebase can be useful for keeping a branch history clean, but conflicts may occur when commits are replayed.

Before rebasing, inspect the branch:

```bash
git fetch origin
git log --oneline --graph --decorate --all
```

If a rebase is in progress:

```bash
git status
```

Resolve the conflicting files and stage them:

```bash
git add <file>
```

Continue:

```bash
git rebase --continue
```

If the rebase should be abandoned:

```bash
git rebase --abort
```

This returns the branch to its state before the rebase started.

---

## 6. Untracked Documentation Files

During the BUILD-JOURNEY documentation work, newly created Markdown files may appear as untracked files.

Check:

```bash
git status --short
```

Example:

```text
?? 02-GitHub/
?? 03-application/
?? 04-docker/
?? 05-azure/
```

This does not indicate a GitHub failure.

It means Git has detected files that have not yet been added to version control.

Add the required files:

```bash
git add docs/week-4/BUILD-JOURNEY/
```

Review the staged changes:

```bash
git status
git diff --cached
```

Then commit:

```bash
git commit -m "docs: update build journey"
```

---

## 7. Incorrect GitHub Username References

GitHub-related configuration can contain references to an old username or repository path.

Search the repository:

```bash
grep -Rni "shettymalathib" . --exclude-dir=.git
```

Also check for the current username where required:

```bash
grep -Rni "malathi-shetty" . --exclude-dir=.git
```

When a GitHub username or repository URL changes, references should be reviewed across:

* README files
* Documentation
* GitHub Actions
* Badges
* Scripts
* Links
* Configuration files

The goal is to avoid leaving outdated repository references in project documentation.

---

## 8. GitHub Actions Configuration Issues

If a GitHub Actions workflow fails, first identify the workflow and inspect the failure message.

The repository workflow files can be listed with:

```bash
find .github/workflows -type f | sort
```

Then inspect the relevant workflow:

```bash
cat .github/workflows/<workflow-file>.yml
```

The GitHub Actions run should be checked for:

```text
Workflow
   ↓
Job
   ↓
Step
   ↓
Error message
```

Do not change multiple unrelated configuration values before identifying the failing step.

---

## 9. GitHub Metrics or Username Errors

Automated GitHub metrics can fail when a workflow references a GitHub username that does not exist or is no longer correct.

A typical failure may appear as:

```text
Generate GitHub Metrics
user not found
```

If the configured username has changed, inspect the workflow:

```bash
grep -Rni "github_user\|username\|user" .github/workflows
```

Update the configuration to use the correct GitHub username and rerun the workflow.

After changing the configuration, verify the workflow result in GitHub Actions.

---

## 10. Remote Repository Verification

Check the configured GitHub remote:

```bash
git remote -v
```

The expected repository should be confirmed before pushing changes.

A typical workflow is:

```text
Local Repository
      ↓
git status
      ↓
git add
      ↓
git commit
      ↓
git push
      ↓
GitHub Repository
```

After pushing:

```bash
git status
```

should normally report that the local branch is up to date with the remote branch.

---

## 11. Safe Git Recovery Principles

When troubleshooting GitHub issues:

### First inspect

```bash
git status
git diff
git log --oneline --decorate -10
```

### Then inspect the remote

```bash
git remote -v
git fetch origin
```

### Then choose the appropriate recovery

```text
Local changes needed
        ↓
Commit or stash

Local branch behind
        ↓
Fast-forward / pull

Conflicting changes
        ↓
Resolve conflict

Incorrect rebase
        ↓
rebase --abort

Unwanted local changes
        ↓
Restore only after confirming they are safe to discard
```

Avoid destructive commands such as:

```bash
git reset --hard
```

unless the changes being discarded have been explicitly reviewed and are no longer required.

---

## 12. Final GitHub Verification

Before considering a GitHub-related change complete, verify:

```bash
git status
git branch --show-current
git remote -v
git log --oneline -5
```

Then confirm that:

* The correct branch is being used.
* The correct GitHub remote is configured.
* Required files are committed.
* No unexpected files remain.
* The latest commit is available on GitHub.
* GitHub Actions workflows are passing where applicable.

---

## 13. Troubleshooting Pattern

The recommended troubleshooting pattern is:

```text
Problem
  ↓
Check git status
  ↓
Inspect diff / log
  ↓
Check remote
  ↓
Identify exact cause
  ↓
Apply minimal fix
  ↓
Verify locally
  ↓
Commit
  ↓
Push
  ↓
Verify GitHub
```

This prevents accidental loss of work and makes Git recovery easier to reproduce.

---

## Final Takeaway

GitHub troubleshooting in FlavorForge follows a simple principle:

> **Inspect first, change second, verify last.**

Git status, branch history, remote configuration, and workflow logs provide the evidence required to determine the correct recovery action.

The troubleshooting documentation should therefore record the actual problem and recovery process rather than treating every Git error as a generic failure.

➡️ **Next: `14-troubleshooting/02-docker-issues.md`**
