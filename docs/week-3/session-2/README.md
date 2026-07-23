#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Download the 52 Entra ID screenshots from GitHub user-attachments.
#
# WHY YOU NEED THIS: these assets are auth-gated. An anonymous request gets 404.
# You must supply a browser session cookie from an account that can see them.
#
# HOW TO GET THE COOKIE:
#   1. Sign in to github.com in your browser.
#   2. Open DevTools (F12) -> Application/Storage -> Cookies -> https://github.com
#   3. Copy the VALUE of the "user_session" cookie.
#   4. Run:   export GH_SESSION="<paste-value>"    then    bash download-images.sh
#
# If this still 404s, the assets belong to a repo/account your session cannot
# reach -- ask whoever originally wrote the notes for the raw screenshot files.
# ---------------------------------------------------------------------------
set -u
cd "$(dirname "$0")"

if [ -z "${GH_SESSION:-}" ]; then
  echo "ERROR: GH_SESSION is not set. See the instructions at the top of this script."
  exit 1
fi

ok=0; fail=0
while IFS=$'\t' read -r fname url; do
  [ -z "$fname" ] && continue
  code=$(curl -sS -L -w '%{http_code}' -o "$fname" \
        --cookie "user_session=${GH_SESSION}" \
        --max-time 60 "$url")
  if [ "$code" = "200" ] && [ -s "$fname" ]; then
    echo "  OK   $fname"; ok=$((ok+1))
  else
    echo "  FAIL $fname  (HTTP $code)"; rm -f "$fname"; fail=$((fail+1))
  fi
done < urls.tsv

echo ""
echo "Downloaded: $ok   Failed: $fail"
[ "$fail" -gt 0 ] && echo "For failures, see SOURCE-URLS.md and save them manually."
