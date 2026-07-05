# 🛠️ Mentor Setup — Repository & GitHub Settings

**For mentors/admins of the `careerbytecode` org only.** This records the one-time GitHub configuration that makes the fork + Pull Request workflow safe for a whole cohort of interns.

> 🎯 **Why:** when interns have direct Write access and push to `main`, they can (and did) overwrite/delete each other's files. The fix is: interns get **no access** — they **fork** and submit **Pull Requests**, and `main` is **protected**.

---

## 1. Create the repository
- Org: **careerbytecode** → **New repository**
- Name: **`CBC-Ban-DevOps-Internship`**
- Visibility: **Public** (so interns can fork)
- **Do not** initialize with a README/.gitignore/license (push this content instead).

## 2. Push this content
```bash
# inside this folder (remote is already set to the new repo)
git push -u origin main
```

## 3. Access control (the key fix) 🔒
- **Do NOT add interns as collaborators**, and **remove** any existing student team's Write access.
  → Settings → **Collaborators and teams** → remove student access.
- Interns need **zero** access — they fork instead.
- Add only **mentors** as **Write** or **Maintain** (so they can review and merge PRs):
  - Manish Kumar · Gowrishankar · Kesavan · Mamtha · Srinivas · Manoj · Sunil

## 4. Allow forking
- Settings → **General** → **Features** → ensure **"Allow forking"** is **ON** (default for public repos).

## 5. Protect the `main` branch 🛡️
Settings → **Branches** → **Add branch ruleset** (or **Add classic branch protection rule**) for `main`:
- ✅ **Require a pull request before merging**
  - ✅ Require **1 approval** (a mentor)
  - ✅ (Optional) **Require review from Code Owners** — enforces the `CODEOWNERS` file
- ✅ **Block force pushes**
- ✅ **Restrict deletions** (no one can delete branches/files via force)
- (Optional) ✅ **Do not allow bypassing the above settings**

This guarantees: nothing reaches `main` except through a mentor-approved Pull Request.

## 6. Auto-assign reviewers — CODEOWNERS
This repo ships a `.github/CODEOWNERS` file so every PR auto-requests a mentor review. **Before it works:**
1. Replace the placeholder handles in `.github/CODEOWNERS` with the mentors' **real GitHub usernames** (the `@handle` they log in with — *not* their LinkedIn URL).
2. Each listed mentor must have **Write** or **Maintain** access (Step 3).
3. Enable **Require review from Code Owners** on the `main` rule (Step 5).

## 7. Pull Request template
This repo also ships `.github/pull_request_template.md`, so every intern PR opens with a ready checklist (own-folder-only, README complete, AKS deployed, posts tagged, links logged). No setup needed — GitHub uses it automatically.

---

## ✅ Result
- Interns **fork** → work on `intern/<name>` → open **one PR** → mentors review & merge.
- `main` is protected; **no intern can edit or delete another intern's work**, ever.
- Mentors are the only ones who merge into `main`.

## 🗂️ Capstone registry
- This cohort works from a fixed set of **10 DevOps projects** in [`PROJECTS-CATALOG.md`](PROJECTS-CATALOG.md), each assigned to one student.
- Interns **confirm their assigned project with mentors**; they log their own work in their folder's `SUBMISSIONS.md`. Keep `PROJECTS-CATALOG.md` maintained as students are confirmed.

## 🔁 Reviewing PRs (mentor quick guide)
1. **Pull requests** tab → open the intern's PR.
2. **Files changed** → confirm they only touched **their own** `interns/<Name>/` folder.
3. Leave comments, then **Approve** → **Merge pull request** (Squash & merge keeps history tidy).
4. Update `tracking/MASTER-TRACKER.csv` and run `scripts/build_leaderboard.py`.

_Part of the CareerByteCode Bangalore — Cloud & DevOps Internship Program._
