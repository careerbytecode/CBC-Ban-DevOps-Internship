#!/usr/bin/env python3
"""
CareerByteCode Cloud & DevOps Internship — Leaderboard Builder
==========================================================

Reads:
  - tracking/MASTER-TRACKER.csv   (performance -> points)
  - tracking/MENTOR-HOURS.md      (sessions   -> hours)

Writes:
  - LEADERBOARD.md                        (PUBLIC: top performers + badges only)
  - tracking/private/FULL-STANDINGS.md    (PRIVATE: every student ranked; git-ignored)

Prints (with --finalize):
  - A Hall-of-Fame block (top 3 + Best Capstone) to paste into HALL-OF-FAME.md

Usage:
  python scripts/build_leaderboard.py --cohort "June 2026"
  python scripts/build_leaderboard.py                 # uses the last cohort in the CSV
  python scripts/build_leaderboard.py --finalize       # also print the Hall-of-Fame block

Standard library only — no pip installs needed.
"""

import argparse
import csv
import re
import sys
from pathlib import Path

# ----- Scoring rubric (edit weights here if needed) -----
PTS = {
    "joined_post": 10,
    "attendance": 10,      # per live session (W1, W2, W3)
    "weekly_post": 15,     # per post (W1, W2, W3, Capstone)
    "weekly_video": 15,    # per video (W1, W2, W3, Demo)
    "assignment": 10,      # per assignment (W1, W2, W3)
    "demo_day": 30,        # capstone shipped + presented
    "catalog": 5,          # capstone registered in PROJECTS-CATALOG.md
}
PUBLIC_TOP_N = 5           # how many appear on the public board

ROOT = Path(__file__).resolve().parents[1]
TRACKER = ROOT / "tracking" / "MASTER-TRACKER.csv"
HOURS_MD = ROOT / "tracking" / "MENTOR-HOURS.md"
LEADERBOARD = ROOT / "LEADERBOARD.md"
PRIVATE_DIR = ROOT / "tracking" / "private"


def yes(v: str) -> bool:
    return str(v).strip().lower() in {"y", "yes", "true", "1"}


def num(v: str) -> int:
    try:
        return int(float(str(v).strip()))
    except (ValueError, TypeError):
        return 0


def load_tracker():
    if not TRACKER.exists():
        sys.exit(f"ERROR: {TRACKER} not found.")
    with TRACKER.open(newline="", encoding="utf-8") as f:
        rows = [r for r in csv.DictReader(f) if (r.get("Student Name") or "").strip()]
    return rows


def parse_hours(cohort: str, students: set):
    """Parse the markdown table in MENTOR-HOURS.md -> {student: {'sessions': n, 'mins': n}}."""
    out = {s: {"sessions": 0, "mins": 0} for s in students}
    if not HOURS_MD.exists():
        return out
    for line in HOURS_MD.read_text(encoding="utf-8").splitlines():
        if not line.strip().startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 6:
            continue
        if cells[0].lower() in {"date", ""} or set(cells[0]) <= {"-", ":"}:
            continue  # header / divider
        row_cohort, mins, present = cells[1], num(cells[4]), cells[5]
        if row_cohort != cohort:
            continue
        if present.strip().upper() == "ALL":
            targets = students
        else:
            targets = {p.strip() for p in present.split(";") if p.strip()}
        for s in targets:
            if s in out:
                out[s]["sessions"] += 1
                out[s]["mins"] += mins
    return out


def score(row) -> int:
    p = 0
    p += PTS["joined_post"] * yes(row.get("Joined Post (Y/N)"))
    for k in ("Attendance W1 (Y/N)", "Attendance W2 (Y/N)", "Attendance W3 (Y/N)"):
        p += PTS["attendance"] * yes(row.get(k))
    for k in ("W1 Post (Y/N)", "W2 Post (Y/N)", "W3 Post (Y/N)", "Capstone Post (Y/N)"):
        p += PTS["weekly_post"] * yes(row.get(k))
    for k in ("W1 Video LI+IG (Y/N)", "W2 Video LI+IG (Y/N)", "W3 Video LI+IG (Y/N)", "Demo Video (Y/N)"):
        p += PTS["weekly_video"] * yes(row.get(k))
    for k in ("W1 Assignment (Y/N)", "W2 Assignment (Y/N)", "W3 Assignment (Y/N)"):
        p += PTS["assignment"] * yes(row.get(k))
    p += PTS["demo_day"] * yes(row.get("Demo Day (Y/N)"))
    p += PTS["catalog"] * yes(row.get("Registered in Catalog (Y/N)"))
    p += num(row.get("Bonus Points"))
    return p


def badges(row, rank) -> list:
    b = []
    if rank == 1:
        b.append("🥇 Top Intern")
    posts = all(yes(row.get(k)) for k in
                ("W1 Post (Y/N)", "W2 Post (Y/N)", "W3 Post (Y/N)", "Capstone Post (Y/N)"))
    if posts:
        b.append("🔥 Consistency")
    if yes(row.get("Best Capstone (Y/N)")):
        b.append("🚀 Best Capstone")
    extra = (row.get("Extra Badges") or "").strip()
    if extra:
        emoji = {"most improved": "🌟", "community helper": "🤝"}
        for tag in [t.strip() for t in extra.split(";") if t.strip()]:
            b.append(f"{emoji.get(tag.lower(), '🏅')} {tag}")
    return b


def build(cohort=None, finalize=False):
    rows = load_tracker()
    cohorts = [r["Cohort"].strip() for r in rows if r.get("Cohort", "").strip()]
    if not cohort:
        cohort = cohorts[-1] if cohorts else ""
    rows = [r for r in rows if r.get("Cohort", "").strip() == cohort]
    if not rows:
        sys.exit(f"ERROR: no students found for cohort '{cohort}'.")

    students = {r["Student Name"].strip() for r in rows}
    hours = parse_hours(cohort, students)

    table = []
    for r in rows:
        name = r["Student Name"].strip()
        h = hours.get(name, {"sessions": 0, "mins": 0})
        table.append({
            "name": name,
            "linkedin": (r.get("LinkedIn URL") or "").strip(),
            "points": score(r),
            "sessions": h["sessions"],
            "hours": round(h["mins"] / 60, 1),
            "row": r,
        })
    table.sort(key=lambda x: (-x["points"], x["name"]))
    for i, t in enumerate(table, 1):
        t["rank"] = i
        t["badges"] = badges(t["row"], i)

    _write_public(cohort, table)
    _write_private(cohort, table)
    print(f"✅ LEADERBOARD.md updated for cohort '{cohort}' ({len(table)} students).")
    print(f"✅ Private full standings -> {PRIVATE_DIR/'FULL-STANDINGS.md'} (git-ignored).")
    if finalize:
        _print_hall_of_fame_block(cohort, table)


def _write_public(cohort, table):
    top = table[:PUBLIC_TOP_N]
    lines = [
        f"# 🏆 Leaderboard — `{cohort}` Cohort",
        "",
        "Recognising the most active, consistent interns of the cohort. "
        "Ranking is **completion-based** (verified by mentors) — not likes or follower counts — "
        "so anyone who does the work can reach the top.",
        "",
        "> 🔒 This public board celebrates our **top performers and badge winners**. "
        "Every intern's full standing is shared privately within the cohort.",
        "",
        "## ⭐ Top performers",
        "",
        "| Rank | Intern | Points | Sessions | Hours | Badges |",
        "|------|--------|--------|----------|-------|--------|",
    ]
    medals = {1: "🥇", 2: "🥈", 3: "🥉"}
    for t in top:
        name = f"[{t['name']}]({t['linkedin']})" if t["linkedin"] else t["name"]
        rank = f"{medals.get(t['rank'], t['rank'])}"
        lines.append(f"| {rank} | {name} | {t['points']} | {t['sessions']} | {t['hours']} | "
                     f"{' · '.join(t['badges']) or '—'} |")
    lines += [
        "",
        "## 🎖️ Badges",
        "- 🥇 **Top Intern** — #1 on points this cohort",
        "- 🔥 **Consistency** — posted every week (W1, W2, W3 + capstone)",
        "- 🚀 **Best Capstone** — standout Week-4 project (mentor-selected)",
        "- 🌟 **Most Improved** · 🤝 **Community Helper** — mentor-awarded",
        "",
        "## 🎯 How points are earned",
        "| Action | Points |",
        "|--------|--------|",
        f"| Attend each live session (W1–W3) | +{PTS['attendance']} each |",
        f"| \"I've joined\" post + profile update | +{PTS['joined_post']} |",
        f"| Weekly LinkedIn post (W1, W2, W3, capstone) | +{PTS['weekly_post']} each |",
        f"| Weekly video (LinkedIn + IG collab) | +{PTS['weekly_video']} each |",
        f"| Assignment submitted on time | +{PTS['assignment']} each |",
        f"| Capstone shipped + Demo Day | +{PTS['demo_day']} |",
        f"| Capstone registered in catalog | +{PTS['catalog']} |",
        "| Mentor bonus (early submission, helping peers) | +5 |",
        "",
        "## 🚀 What top interns win",
        "Being a top intern isn't just a badge. Standout interns are **invited to join the "
        "CareerByteCode community as emerging mentors** — growing their own brand and reach — "
        "and are **offered access to CareerByteCode freelancing opportunities**. "
        "It's an invitation earned through real, consistent work (not a guaranteed placement).",
        "",
        "🏛️ All-time winners live in [`HALL-OF-FAME.md`](HALL-OF-FAME.md).",
        "",
        "_Auto-generated by `scripts/build_leaderboard.py`. Part of the CareerByteCode Cloud & DevOps Internship Program._",
    ]
    LEADERBOARD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def _write_private(cohort, table):
    PRIVATE_DIR.mkdir(parents=True, exist_ok=True)
    lines = [
        f"# 🔒 FULL STANDINGS (PRIVATE) — `{cohort}` Cohort",
        "",
        "> Do not commit to the public repo. Share within the cohort (e.g. WhatsApp) only.",
        "",
        "| Rank | Intern | Points | Sessions | Hours | Badges |",
        "|------|--------|--------|----------|-------|--------|",
    ]
    for t in table:
        lines.append(f"| {t['rank']} | {t['name']} | {t['points']} | {t['sessions']} | "
                     f"{t['hours']} | {' · '.join(t['badges']) or '—'} |")
    (PRIVATE_DIR / "FULL-STANDINGS.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def _print_hall_of_fame_block(cohort, table):
    best = next((t["name"] for t in table if yes(t["row"].get("Best Capstone (Y/N)"))), "—")
    print("\n" + "=" * 60)
    print("HALL OF FAME ENTRY — paste into HALL-OF-FAME.md:")
    print("=" * 60)
    print(f"\n### {cohort}")
    print("| Rank | Intern | Points |")
    print("|------|--------|--------|")
    for t in table[:3]:
        print(f"| {t['rank']} | {t['name']} | {t['points']} |")
    print(f"\n**🚀 Best Capstone:** {best}\n")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="Build the internship leaderboard.")
    ap.add_argument("--cohort", help="Cohort name (defaults to the last one in the CSV).")
    ap.add_argument("--finalize", action="store_true",
                    help="Also print the Hall-of-Fame block for this cohort.")
    args = ap.parse_args()
    build(cohort=args.cohort, finalize=args.finalize)
