# Git & GitHub Complete Guide for Developers and DevOps Engineers

## What is Git?

Git is a distributed version control system used to track changes in
source code, collaborate with teams, and maintain project history.

## What is GitHub?

GitHub is a cloud-based platform that hosts Git repositories and
provides collaboration features like Pull Requests, Issues, Actions, and
Code Reviews.

## Git Workflow

``` text
Working Directory
        │
      git add
        │
   Staging Area
        │
    git commit
        │
   Local Repository
        │
     git push
        │
 Remote Repository (GitHub)
```

## Install & Configure Git

| Command | Description |
| ------------------------------ | ------------------------------ |
| `sudo apt-get update && sudo apt-get install git -y` | Git installation command |
| `git --version` | Check Git version |
| `git config --global user.name "Your Name"` | Configure username |
| `git config --global user.email "you@example.com"` | Configure email |
| `git config --list` | View configuration |

## Repository Commands

 | Command | Description |
 | --------------------------- | ----------------------- |
 | `git init` | Initialize repository |
 | `git clone <url>` | Clone repository |
 | `git status` | Show status |
 | `git add .` | Stage all files |
 | `git commit -m "message"` | Commit changes |
 | `git log --oneline` | View commit history |
 | `git diff` | View changes |

Example:

``` bash
git init
git add .
git commit -m "Initial commit"
```

## Branching Commands

| Command | Description |
| --------------------------- | ----------------- |
| `git branch` | List branches |
| `git branch feature` | Create branch |
| `git checkout feature` | Switch branch |
| `git switch feature` | Modern switch |
| `git checkout -b feature` | Create & switch to a new branch |
| `git merge feature` | Merge branch |
| `git branch -d feature` | Delete branch |

## Remote Repository Commands

| Command | Description |
| ------------------------------- | ------------------ |
| `git remote -v` | View configured remote repositories |
| `git remote add origin <url>` | Add a remote repository |
| `git push -u origin main` | Push the main branch for the first time and set the upstream |
| `git push` | Push local commits to the remote repository |
| `git pull` | Fetch and merge changes from the remote repository |
| `git fetch` | Download changes from the remote repository without merging |

## Undo Commands

| Command | Description |
| --------------------------------- | -------------------------------------------- |
| `git restore file.txt` | Discard changes made to a file in the working directory |
| `git restore --staged file.txt` | Remove a file from the staging area without losing changes |
| `git reset --soft HEAD~1` | Undo the last commit while keeping all changes staged |
| `git reset --hard HEAD~1` | Undo the last commit and permanently discard all changes |
| `git revert <commit>` | Create a new commit that safely reverses a previous commit |

## Stash Commands

| Command | Description |
| ------------------- | -------------------------------------------- |
| `git stash` | Save uncommitted changes temporarily without committing them |
| `git stash list` | Display all saved stashes |
| `git stash pop` | Apply the latest stash and remove it from the stash list |
| `git stash apply` | Apply a stash without removing it from the stash list |

## Tag Commands

  Command                  Description
  ------------------------ -------------
  `git tag`                List tags
  `git tag v1.0`           Create tag
  `git push origin v1.0`   Push tag

## GitHub Pull Request (PR) Workflow

This guide explains the complete GitHub Pull Request workflow, from cloning a repository to merging a Pull Request and cleaning up branches.

---

### Workflow Overview

```text
Clone Repository
       │
       ▼
Update Main Branch
       │
       ▼
Create Feature Branch
       │
       ▼
Develop Feature
       │
       ▼
Stage Changes
       │
       ▼
Commit Changes
       │
       ▼
Push Feature Branch
       │
       ▼
Open Pull Request
       │
       ▼
Code Review
       │
       ▼
Make Requested Changes (if any)
       │
       ▼
Merge Pull Request
       │
       ▼
Delete Feature Branch
       │
       ▼
Pull Latest Main
```

---

### Prerequisites

Before starting, ensure you have:

- Git installed
- A GitHub account
- Access to the repository
- Repository URL

---

### Step 1: Clone the Repository

Clone the repository to your local machine.

```bash
git clone https://github.com/<username>/<repository>.git
```

Navigate to the project directory.

```bash
cd <repository>
```

**Example**

```bash
git clone https://github.com/manojsavukar/devops-notes.git
cd devops-notes
```

---

### Step 2: Check Current Branch

Display the current branch.

```bash
git branch
```

**Example Output**

```text
* main
```

View all branches.

```bash
git branch -a
```

---

### Step 3: Update the Main Branch

Always update your local `main` branch before creating a new feature branch.

```bash
git checkout main
git pull origin main
```

---

### Step 4: Create a Feature Branch

Create a new branch for your feature or bug fix.

```bash
git checkout -b feature/<feature-name>
```

**Example**

```bash
git checkout -b feature/add-login-page
```

Verify the branch.

```bash
git branch
```

**Output**

```text
* feature/add-login-page
  main
```

---

### Step 5: Make Your Changes

Edit your project files.

**Example**

```text
Added Login Page
Updated README
Fixed CSS Issues
```

---

### Step 6: Check Modified Files

See what files have changed.

```bash
git status
```

**Example**

```text
modified: app.py
modified: README.md
```

---

### Step 7: Stage Changes

Stage all files.

```bash
git add .
```

Or stage a specific file.

```bash
git add app.py
```

Verify staging.

```bash
git status
```

---

### Step 8: Commit Changes

Commit staged files with a meaningful message.

```bash
git commit -m "Add login page"
```

**Example**

```bash
git commit -m "Implement user authentication"
```

View commit history.

```bash
git log --oneline
```

**Example**

```text
a2d4d18 Implement user authentication
7f8b913 Initial commit
```

---

### Step 9: Push Feature Branch

Push the branch for the first time.

```bash
git push -u origin feature/add-login-page
```

For future pushes.

```bash
git push
```

---

### Step 10: Open a Pull Request

Go to your GitHub repository.

GitHub will display:

> **Compare & Pull Request**

Click it.

Verify:

- **Base Branch:** `main`
- **Compare Branch:** `feature/add-login-page`

Fill in:

- PR Title
- Description

**Example**

```text
Title:
Add Login Page

Description:
- Added login UI
- Added authentication logic
- Updated README
```

Click **Create Pull Request**.

---

### Step 11: Code Review

Reviewers may:

- Approve the Pull Request
- Request Changes
- Leave Comments

If changes are requested:

Stage the changes.

```bash
git add .
```

Commit the changes.

```bash
git commit -m "Address review comments"
```

Push the updates.

```bash
git push
```

GitHub automatically updates the Pull Request.

---

### Step 12: Resolve Merge Conflicts (If Any)

If Git reports conflicts:

Update the `main` branch.

```bash
git checkout main
git pull origin main
```

Switch back to your feature branch.

```bash
git checkout feature/add-login-page
```

Merge `main` into your branch.

```bash
git merge main
```

Resolve the conflicts manually.

Stage the resolved files.

```bash
git add .
```

Commit the resolution.

```bash
git commit -m "Resolve merge conflicts"
```

Push the changes.

```bash
git push
```

---

### Step 13: Merge the Pull Request

Once approved, choose one of the following merge strategies:

- **Merge Commit** – Preserves all commits.
- **Squash and Merge** – Combines all commits into one.
- **Rebase and Merge** – Maintains a linear Git history.

Click:

```text
Merge Pull Request
```

Then:

```text
Confirm Merge
```

---

### Step 14: Delete the Feature Branch

Delete the remote branch.

```bash
git push origin --delete feature/add-login-page
```

Delete the local branch.

```bash
git checkout main
git branch -d feature/add-login-page
```

Force delete if the branch hasn't been merged.

```bash
git branch -D feature/add-login-page
```

---

### Step 15: Update Local Main Branch

Pull the latest merged changes.

```bash
git checkout main
git pull origin main
```


## Useful Git Shortcuts

  Shortcut                            Description
  ----------------------------------- -----------------------
  `git log --graph --oneline --all`   Visual history
  `git blame file`                    Author by line
  `git show`                          Commit details
  `git reflog`                        Recover lost commits
  `git cherry-pick <commit>`          Apply specific commit

## Common Troubleshooting

-   Authentication failed → Update PAT or SSH key.
-   Detached HEAD → `git switch <branch>`
-   Merge conflict → Resolve, add, commit.
-   Push rejected → `git pull --rebase` then push.
-   Accidentally deleted commit → `git reflog`.

## Top 20 Git Commands

`git init`, `git clone`, `git status`, `git add`, `git commit`,
`git log`, `git diff`, `git branch`, `git switch`, `git checkout`,
`git merge`, `git fetch`, `git pull`, `git push`, `git stash`,
`git tag`, `git remote`, `git restore`, `git reset`, `git revert`

## Best Practices

-   Commit small logical changes.
-   Write meaningful commit messages.
-   Use feature branches.
-   Pull before pushing.
-   Never commit secrets.
-   Protect the main branch.
-   Review Pull Requests before merging.
