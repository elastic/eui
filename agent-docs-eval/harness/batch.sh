#!/usr/bin/env bash
# Runs and grades one eval batch per case group, then prints only the summary rows and failed runs,
# so an agent session reads ~20 lines instead of driving the loop itself.
# Usage: batch.sh NAME ARMS GROUP... where GROUP is CASES:K, e.g.
#   batch.sh cc-x c 'N1,F1,T2:2' 'S9,D1,T1,I1:1'
# Group i goes to batch NAME (first) or NAME-<i>. Run outside the sandbox, one at a time.
set -euo pipefail
cd "$(dirname "$0")"
name=$1 arms=$2; shift 2
R=~/eui-eval/results
i=0 batches=()
for group in "$@"; do
  cases=${group%:*} k=${group##*:}
  b=$name; [ $i -gt 0 ] && b=$name-$((i + 1))
  n=$(( $(tr ',' '\n' <<<"$cases" | wc -l) * $(tr ',' '\n' <<<"$arms" | wc -l) ))
  node run.mjs --agent claude --effort medium --cases "$cases" --arms "$arms" --k "$k" \
    --parallel $(( n * k < 6 ? n * k : 6 )) --batch "$b" > "$R/_$b.txt" 2>&1
  batches+=("$b"); i=$((i + 1))
done
for b in "${batches[@]}"; do
  node grade.mjs "$b" > "$R/_$b-grade.txt" 2>&1
  echo "== $b"
  grep -E '^\| [A-Z][0-9]+ ' "$R/_$b-grade.txt" | cut -d'|' -f2-7,10-12
  grep -E '^- [A-Z][0-9]+-[a-z]-[0-9]+: pick=false' "$R/_$b-grade.txt" | sed -E 's/lookups=[^ ]* //' | cut -c1-240 || true
done
