# 🛠️ Scripts — Leaderboard Builder

This folder holds the script that auto-generates the cohort leaderboard. **For mentors only.**

## What it does
`build_leaderboard.py` reads:
- `../tracking/MASTER-TRACKER.csv` → computes each intern's **points** (per the rubric)
- `../tracking/MENTOR-HOURS.md` → computes each intern's **classes & hours**

…and writes:
- `../LEADERBOARD.md` → **PUBLIC** board: top performers + badges only
- `../tracking/private/FULL-STANDINGS.md` → **PRIVATE** full ranking (git-ignored — share in WhatsApp)

## How to run
No installs needed (standard library only). From the repo root:

```bash
# Build for the latest cohort in the tracker
python scripts/build_leaderboard.py

# Build for a specific cohort
python scripts/build_leaderboard.py --cohort "[Month YYYY]"

# Also print the Hall-of-Fame block to paste into HALL-OF-FAME.md (at cohort close)
python scripts/build_leaderboard.py --cohort "[Month YYYY]" --finalize
```

## Workflow each week
1. Update `MASTER-TRACKER.csv` (mark Y/N as interns complete tasks; add bonus points).
2. Add the week's live class to `MENTOR-HOURS.md`.
3. Run the script → commit the refreshed `LEADERBOARD.md`.
4. Share `tracking/private/FULL-STANDINGS.md` in the cohort WhatsApp group (do **not** commit it).

## At cohort close
Run with `--finalize`, then paste the printed block into `HALL-OF-FAME.md` (top 3 + Best Capstone).

> ⚠️ **Best Capstone** is mentor-selected: set `Best Capstone (Y/N) = Y` for the chosen intern in the tracker. **Most Improved / Community Helper** go in the `Extra Badges` column (separate multiple with `;`).

## Tweaking the rubric
Point weights live in the `PTS` dictionary at the top of `build_leaderboard.py`. Change a number, re-run, done.

> ℹ️ The script keeps the `MASTER-TRACKER.csv` column names exactly as shipped — don't rename columns, or scoring will break.

_Part of the CareerByteCode Bangalore — Cloud & DevOps Internship Program._
