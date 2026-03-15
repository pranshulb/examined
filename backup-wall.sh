#!/bin/bash
DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/root/.openclaw/workspace/projects/examined/backups"
BACKUP_FILE="$BACKUP_DIR/wall-backup-$DATE.json"

# Fetch current wall data
curl -s "https://pranshul.cafe/api/wall" > "$BACKUP_FILE"

# Check if valid
ENTRIES=$(python3 -c "import json; d=json.load(open('$BACKUP_FILE')); print(len(d.get('entries',[])))" 2>/dev/null)
if [ "$ENTRIES" = "" ] || [ "$ENTRIES" = "0" ]; then
  echo "WARNING: backup has 0 entries or failed"
else
  echo "Backed up $ENTRIES entries to $BACKUP_FILE"
fi

# Git commit
cd /root/.openclaw/workspace/projects/examined
git add backups/
git commit -m "wall backup $DATE ($ENTRIES entries)" 2>/dev/null
git push 2>/dev/null
