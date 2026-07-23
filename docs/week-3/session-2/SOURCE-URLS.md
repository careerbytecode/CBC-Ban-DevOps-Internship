# 🖼️ Screenshots for the Entra ID walkthrough

This folder holds the **52 screenshots** used by
[`../entra-id-user-group-rbac.md`](../entra-id-user-group-rbac.md).

---

## ⚠️ Why the images were broken

The notes originally pointed at GitHub's user-attachments CDN:

```
https://github.com/user-attachments/assets/<uuid>
```

Those URLs are **authentication-gated and bound to the repository they were first uploaded into**.
A request from anywhere else gets **`HTTP 404 Not Found`** — which is exactly what was happening,
so every image rendered as a broken "image" placeholder.

This matters even more for this repo because:

| Reason | Effect |
|---|---|
| The repo is **private** | Assets bound to another context can't be resolved |
| Interns **fork** this repo | External URLs break in every fork |
| Notes may be read offline / exported | External URLs need a live, signed-in session |

**The fix:** keep the screenshots **inside the repository** and reference them with relative
paths (`images/01-....png`). Local images work in the private repo, in every fork, in clones,
offline, and in PDF exports.

---

## 📥 How to populate this folder

You need the 52 image files. Pick whichever route is easiest:

### Option A — you already have the screenshots on disk ✅ *fastest*
Rename them to match the filenames listed in [`SOURCE-URLS.md`](SOURCE-URLS.md) and drop them here.
The names are numbered in the order they appear in the document (`01-…` → `52-…`).

### Option B — save them from the browser
Open [`SOURCE-URLS.md`](SOURCE-URLS.md) while signed in to GitHub on the account that
originally uploaded them. For each row: open the URL → right-click → **Save image as** →
save into this folder using the **Local file** name from the table.

### Option C — bulk download with a session cookie
```bash
export GH_SESSION="<your github user_session cookie value>"
bash download-images.sh
```
Instructions for finding the cookie are at the top of
[`download-images.sh`](download-images.sh).

> 🔎 **If every download 404s**, the assets belong to an account or repository your session
> cannot reach. Ask whoever originally authored the walkthrough for the raw screenshot files —
> they are the only person who can export them.

---

## ✅ Checking your work

From the repository root:

```bash
# list any image referenced by the notes but missing from this folder
grep -o 'images/[0-9][^"]*\.png' ../entra-id-user-group-rbac.md | sort -u | while read -r f; do
  [ -f "$(basename "$f")" ] || echo "MISSING: $(basename "$f")"
done
```

No output means every screenshot is present. 🎉

---

## 📝 Notes

- Files are referenced as `.png`. If your originals are `.jpg`, either convert them or update the
  extension in both `../entra-id-user-group-rbac.md` and `SOURCE-URLS.md`.
- Keep `.gitkeep` so the folder survives in Git while it is still empty.
- Screenshots may contain tenant names, usernames or IPs — review before committing to anywhere public.

_Part of the CareerByteCode Bangalore — Cloud & DevOps Internship Program._
