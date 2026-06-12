# 📄 CBC Bangalore Cloud & DevOps Internship — Submission Guide

**Repository:** https://github.com/careerbytecode/CBC-Ban-DevOps-Internship

A short, printable cheat-sheet for forking, working, and submitting your **Week-4 DevOps capstone**. (Full version with explanations: [`CONTRIBUTING.md`](CONTRIBUTING.md).)

> 🛡️ You never push to the CareerByteCode repo. You work in **your own fork** and submit a **Pull Request**. Nobody can delete your work; you can't affect anyone else's.

---

## ⚡ The 3 everyday commands (memorise these)
```bash
git add .
git commit -m "your message"
git push origin intern/your-name
```

---

## 🟢 ONE-TIME SETUP

**1. Create a GitHub account** → https://github.com (verify your email).

**2. Fork the repo** 🍴
- Open https://github.com/careerbytecode/CBC-Ban-DevOps-Internship
- Top-right → **Fork** → **Create fork**
- You now have `https://github.com/YOUR-USERNAME/CBC-Ban-DevOps-Internship`

**3. Copy your fork's URL** — green **Code** button → copy the HTTPS link (it has *your* username).

**4. Install the DevOps tools** (if needed): **Git**, **VS Code**, **Docker Desktop**, **kubectl**, **Azure CLI** → and create **GitHub, Docker Hub & Azure** accounts. Open **Git Bash**.

**5. Clone YOUR fork**
```bash
git clone https://github.com/YOUR-USERNAME/CBC-Ban-DevOps-Internship.git
cd CBC-Ban-DevOps-Internship
```

**6. Make your branch (once)**
```bash
git checkout -b intern/your-name
git branch                 # should show * intern/your-name
```

**7. Make your folder (once)**
```bash
mkdir interns/Firstname-Lastname
cp _template/SUBMISSIONS.md interns/Firstname-Lastname/
```

---

## 🔨 BUILD YOUR DEVOPS CAPSTONE
- Confirm your assigned project with your mentors first (it's listed in [`PROJECTS-CATALOG.md`](PROJECTS-CATALOG.md)).
- Create your project inside **`interns/Firstname-Lastname/`** only:
```bash
cd interns/Firstname-Lastname
cp -r ../../_template "Project01-[DEVOPS]-Your-DevOps-Project"
cd "Project01-[DEVOPS]-Your-DevOps-Project"
mv PROJECT_README_TEMPLATE.md README.md
```
- App in `app/` (+ `Dockerfile`), manifests in `k8s/`, pipeline in `azure-pipelines.yml`, provisioning in `scripts/`, diagrams in `architecture/`, proof in `screenshots/`, and **fill the `README.md` completely**.
- ❌ Do **not** modify other interns' folders, the `_template/`, or any root file.

> 💳 **Cloud cost reminder:** test locally first (`docker`, minikube/kind) — it's free. On Azure, use free credits and run `az group delete --name <your-rg> --yes --no-wait` after every lab.

---

## ⬆️ SAVE & UPLOAD TO YOUR FORK
```bash
git add .
git commit -m "Add capstone: Your DevOps project"
git push origin intern/your-name
```
> 🔐 Password prompt? Use a **Personal Access Token** (GitHub → Settings → Developer settings → Tokens), not your password.

---

## 📬 SUBMIT (one Pull Request, first time only)

1. Open **your fork** on GitHub → click **Compare & pull request**.
2. Confirm the direction:
   - base: **`careerbytecode/CBC-Ban-DevOps-Internship`** → **`main`**
   - compare: **`YOUR-USERNAME/CBC-Ban-DevOps-Internship`** → **`intern/your-name`**
3. Title: **`Intern Submission — Your Name`**
4. Click **Create pull request**. ✅

> 🔁 Every later `push` updates the **same** PR automatically. Never open a second PR.

---

## 🔄 KEEP YOUR FORK FRESH
On your fork's page click **Sync fork → Update branch** before starting new work.

---

## 🧑‍🏫 AFTER REVIEW (if changes requested)
```bash
git add .
git commit -m "Updated based on mentor feedback"
git push origin intern/your-name
```
The PR updates automatically.

---

## 📣 DON'T FORGET — weekly posts
Each week (Weeks 1–4): one **LinkedIn post** + one **short video** on LinkedIn & Instagram, tagging **@CareerByteCode + Manish Kumar + Gowrishankar + Kesavan + Mamtha + Srinivas + Manoj + Sunil**, with `careerbytecode` added as an Instagram collaborator. Log every link in your folder's `SUBMISSIONS.md`. Rules: [`SOCIAL-MEDIA-AND-VIDEO.md`](SOCIAL-MEDIA-AND-VIDEO.md) · scripts: [`WEEKLY-SCRIPTS.md`](WEEKLY-SCRIPTS.md).

---

## 📏 RULES
1. Never push to the CareerByteCode repo — only your fork.
2. Always work on `intern/your-name`.
3. Only edit `interns/Your-Name/`.
4. Never touch another intern's files, the `_template/`, or any root file.
5. Submit only through your one Pull Request.
6. Sync your fork before new work.

_Part of the CareerByteCode Bangalore — Cloud & DevOps Internship Program._
