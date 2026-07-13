# 🧭 START HERE — Your Complete Student Guide

Welcome! This is the **one page that walks you through the whole internship** — from your first day to your certificate. Follow it top to bottom. Each step links to a detailed guide if you want more.

> 🎯 **The simple version:** Learn live (Weeks 1–3) → build & ship a DevOps project to AKS (Week 4) → post your progress every week → get your certificate. That's it. **No prior DevOps experience needed — we start from Linux basics.**

---

## ✅ STEP 1 — Get set up (Day 0)

1. **Pay & confirm your seat** — see [`ENROLLMENT-AND-ONBOARDING.md`](ENROLLMENT-AND-ONBOARDING.md).
2. **Join the WhatsApp group** (your cohort hub): https://chat.whatsapp.com/JvShK68sncb4IreV26k4sJ
3. **Install your tools:** Git, VS Code, Docker Desktop, `kubectl`, Azure CLI — and create **GitHub, Docker Hub, and Azure** accounts.
   - Full instructions + screenshots: [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`How-to-GitHub/`](How-to-GitHub/).
4. **Read** [`CURRICULUM.md`](CURRICULUM.md) and [`COHORT-SCHEDULE.md`](COHORT-SCHEDULE.md) so you know what's coming.

> 💳 **Cloud-cost note:** Week 3 and your capstone use your own Azure account. Real cloud resources mean **small charges** while your labs run. Use the free tier and **delete resources after each lab** — details in [`ENROLLMENT-AND-ONBOARDING.md`](ENROLLMENT-AND-ONBOARDING.md).

---

## ✅ STEP 2 — Make it official on LinkedIn (Day 0)

Before any classes:
1. **Add the internship to your LinkedIn profile** (Experience entry).
2. **Post your "I've joined" announcement**, tagging CBC + all 7 mentors.

👉 Copy-paste both from [`WEEKLY-SCRIPTS.md`](WEEKLY-SCRIPTS.md#0️⃣-day-0--add-the-internship-to-your-linkedin-profile).

---

## ✅ STEP 3 — Attend the live training (Weeks 1–3)

- Each week has **one live class (~1.5–2 hours)** on **Google Meet** (links posted in WhatsApp before each class; some may be in person in Bangalore).
- **Week 1:** Linux + Shell + Docker · **Week 2:** Kubernetes + Monitoring · **Week 3:** Azure & CI/CD.
- Your **attendance is logged** and counts toward your certificate and leaderboard points.
- Full week-by-week plan: [`COHORT-SCHEDULE.md`](COHORT-SCHEDULE.md).

---

## ✅ STEP 4 — Post your progress EVERY week (Weeks 1–4)

This is required and it's a weekly habit — **one LinkedIn post + one short video each week.**

**Each week:**
1. **LinkedIn post** about what you learned — tag **@CareerByteCode + all 7 mentors** (Manish Kumar, Gowrishankar, Kesavan, Mamtha, Srinivas, Manoj, Sunil).
2. **Short video (60–90s)** about that week — post it on **LinkedIn** *and* **Instagram**.
3. On **Instagram**, add **`careerbytecode` as a Collaborator** (Tag people → Invite collaborator → search `careerbytecode`).

👉 **Exact words to copy-paste** for every week: [`WEEKLY-SCRIPTS.md`](WEEKLY-SCRIPTS.md)
👉 **The rules** (tagging, video tips, why it counts): [`SOCIAL-MEDIA-AND-VIDEO.md`](SOCIAL-MEDIA-AND-VIDEO.md)

> 💡 Tagging the **@CareerByteCode page** is how mentors verify your post. The IG **collaborator invite** is how we verify your video. No tag / no invite = it doesn't count.

---

## ✅ STEP 5 — Build your DevOps capstone (Week 4)

This is where you use the repo to ship a real **DevOps project** to AKS.

### 5a. Fork the repo, then clone YOUR fork (one time)
First **fork**: open the repo on GitHub → **Fork** (top-right) → **Create fork**. Now you have your own copy.
Then clone **your fork** (the URL has *your* username) and make your branch:
```bash
git clone https://github.com/YOUR-USERNAME/CBC-Ban-DevOps-Internship.git
cd CBC-Ban-DevOps-Internship
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
git checkout -b intern/your-name      # your personal branch (use it the whole capstone)
```

### 5b. Create your own folder — **THE GOLDEN RULE**
> ⚡ You work **only in your own fork**, and only inside **`interns/Your-Name/`**. You can't touch the CareerByteCode repo at all — so no one can delete your work, and you can't affect anyone else's.
```bash
cd interns
mkdir Firstname-Lastname && cd Firstname-Lastname
cp ../../_template/SUBMISSIONS.md .
```

### 5c. Confirm your assigned DevOps project
- Each intern is assigned **one of the 10 DevOps projects** in [`PROJECTS-CATALOG.md`](PROJECTS-CATALOG.md).
- **Confirm your assigned project with your mentors**, then check you're listed in the Cohort Capstone Registry in that same file.

### 5d. Start your project from the template
```bash
# inside interns/Firstname-Lastname/
cp -r ../../_template "Project01-[DEVOPS]-Your-DevOps-Project"
cd "Project01-[DEVOPS]-Your-DevOps-Project"
mv PROJECT_README_TEMPLATE.md README.md
```
Build your app in `app/`, your manifests in `k8s/`, your pipeline in `azure-pipelines.yml`, save proof in `screenshots/`, and **fill in your `README.md` completely**.
Full build guide: [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## ✅ STEP 6 — Push to your fork, then open ONE Pull Request

Every time you finish some work, the **3 commands**:
```bash
git add .
git commit -m "Add capstone: Your DevOps project"
git push origin intern/your-name
```

**First time only:** open your fork on GitHub → **Compare & pull request** → set base to **`careerbytecode/CBC-Ban-DevOps-Internship` → `main`**, compare to **your `intern/your-name`** → title `Intern Submission — Your Name` → **Create pull request**.

> 🔁 Every later push **updates the same PR** — never open a second one.
> 🔐 Password prompt? Use a **Personal Access Token**, not your password. Full details + fixes in [`CONTRIBUTING.md`](CONTRIBUTING.md) / [`SUBMISSION-GUIDE.md`](SUBMISSION-GUIDE.md).

Then **log all your post & video links** in your `SUBMISSIONS.md`, and push again. Your mentors verify from there.

---

## ✅ STEP 7 — Demo Day (Week 4)

Present your DevOps project live to mentors and peers — a short demo (your app running on AKS, the pipeline, the monitoring dashboard) + Q&A. This is your moment to show what you shipped. 🎤

---

## ✅ STEP 8 — Get your certificate 🎓

Your **verifiable CareerByteCode certificate** (with a unique reference ID) is issued once your mentors confirm you've completed everything:

- 🟢 Attended the Weeks 1–3 live classes
- 🟢 5 LinkedIn posts (joining + W1 + W2 + W3 + capstone), each tagging CBC + all 7 mentors
- 🟢 5 videos (one per week) on LinkedIn **and** Instagram (with `careerbytecode` collaborator)
- 🟢 1 DevOps capstone deployed to AKS, pushed to your folder, registered in the catalog, with a complete README
- 🟢 Presented on Demo Day
- 🟢 All links logged in your `SUBMISSIONS.md`

Your certificate also shows your **total live mentor hours**. Full details: [`CERTIFICATE-CRITERIA.md`](CERTIFICATE-CRITERIA.md).

---

## 🏆 Bonus — climb the leaderboard

Every verified action (attendance, posts, videos, assignments, capstone) earns points. The most active interns top the [`LEADERBOARD.md`](LEADERBOARD.md) and enter the [`HALL-OF-FAME.md`](HALL-OF-FAME.md). **Top interns are invited to grow as CareerByteCode mentors and get access to freelancing opportunities.** It's all completion-based — do the work, climb the board.

---

## 🗺️ Quick links

| I want to… | Go to |
|------------|-------|
| Know what I'll learn | [`CURRICULUM.md`](CURRICULUM.md) |
| See the week-by-week plan | [`COHORT-SCHEDULE.md`](COHORT-SCHEDULE.md) |
| Copy a post / video script | [`WEEKLY-SCRIPTS.md`](WEEKLY-SCRIPTS.md) |
| Understand posting rules | [`SOCIAL-MEDIA-AND-VIDEO.md`](SOCIAL-MEDIA-AND-VIDEO.md) |
| Fork, build & submit | [`CONTRIBUTING.md`](CONTRIBUTING.md) · [`SUBMISSION-GUIDE.md`](SUBMISSION-GUIDE.md) |
| See my assigned DevOps project | [`PROJECTS-CATALOG.md`](PROJECTS-CATALOG.md) |
| Know certificate requirements | [`CERTIFICATE-CRITERIA.md`](CERTIFICATE-CRITERIA.md) |
| Pay / onboarding / cloud costs | [`ENROLLMENT-AND-ONBOARDING.md`](ENROLLMENT-AND-ONBOARDING.md) |

---

💬 [WhatsApp group](https://chat.whatsapp.com/JvShK68sncb4IreV26k4sJ) · 📧 careerbytec@gmail.com · 🌐 www.careerbytecode.com

_Part of the CareerByteCode Bangalore — Cloud & DevOps Internship Program._
