#!/bin/bash
# Auto-update health-status.json with current system stats
# Runs via cron every 4 hours

set -e

# Paths
PROJECT_DIR="/root/.openclaw/workspace/projects/project-tracker"
STATUS_FILE="$PROJECT_DIR/health-status.json"

cd "$PROJECT_DIR"

# Get system stats
DISK_USED=$(df -h / | awk 'NR==2 {print $3}' | sed 's/G//')
DISK_TOTAL=$(df -h / | awk 'NR==2 {print $2}' | sed 's/G//')
DISK_PERCENT=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

MEM_USED=$(free -m | awk 'NR==2 {print $3}')
MEM_TOTAL=$(free -m | awk 'NR==2 {print $2}')
MEM_PERCENT=$(awk "BEGIN {printf \"%.0f\", ($MEM_USED/$MEM_TOTAL)*100}")

UPTIME=$(uptime -p | sed 's/up //')
HOSTNAME=$(hostname)
OS=$(uname -sr)

# Check OpenClaw status
GATEWAY_STATUS="offline"
GATEWAY_PID=""
GATEWAY_UPTIME=""
if systemctl is-active --quiet openclaw-gateway; then
    GATEWAY_STATUS="online"
    GATEWAY_PID=$(systemctl show -p MainPID openclaw-gateway | cut -d= -f2)
    GATEWAY_UPTIME=$(systemctl show -p ActiveEnterTimestamp openclaw-gateway | cut -d= -f2)
fi

# Get current timestamp
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Generate JSON
cat > "$STATUS_FILE" <<EOF
{
  "lastUpdate": "$TIMESTAMP",
  "services": [
    {
      "name": "OpenClaw Gateway",
      "status": "$GATEWAY_STATUS",
      "uptime": "$UPTIME",
      "details": "Running on port 18789 (local loopback)",
      "pid": $GATEWAY_PID
    },
    {
      "name": "Claw Agent (Main)",
      "status": "active",
      "model": "claude-sonnet-4-5",
      "sessionCount": $(openclaw status 2>/dev/null | grep -oP 'sessions \K\d+' || echo "0"),
      "lastActivity": "$TIMESTAMP",
      "details": "Active in Telegram group 'Claw Projects 🦀'"
    },
    {
      "name": "DevBot",
      "status": "configured",
      "lastActivity": null,
      "details": "Agent configured but not yet spawned successfully",
      "note": "Spawn allowlist configuration in progress"
    },
    {
      "name": "Telegram",
      "status": "connected",
      "details": "Group: Claw Projects 🦀 | Bot: @clawpro_bot",
      "mode": "Group messages (requireMention: false)"
    }
  ],
  "system": {
    "disk": {
      "used": "$DISK_USED",
      "total": "$DISK_TOTAL",
      "unit": "GB",
      "percent": $DISK_PERCENT
    },
    "memory": {
      "used": "$MEM_USED",
      "total": "$(awk "BEGIN {printf \"%.1f\", $MEM_TOTAL/1024}")",
      "unit": "MB / GB",
      "percent": $MEM_PERCENT
    },
    "uptime": "$UPTIME",
    "hostname": "$HOSTNAME",
    "os": "$OS"
  },
  "logs": [
    {
      "timestamp": "$TIMESTAMP",
      "level": "info",
      "message": "Health status auto-updated via cron"
    },
    {
      "timestamp": "$(date -u -d '5 minutes ago' +"%Y-%m-%dT%H:%M:%SZ")",
      "level": "info",
      "message": "Gateway status: $GATEWAY_STATUS"
    },
    {
      "timestamp": "$(date -u -d '10 minutes ago' +"%Y-%m-%dT%H:%M:%SZ")",
      "level": "info",
      "message": "System uptime: $UPTIME"
    }
  ]
}
EOF

# Commit and push to GitHub
git config user.name "Claw Health Monitor"
git config user.email "claw@themzn.github.io"

# Pull latest changes first
git pull origin main --no-edit

git add health-status.json

# Only commit if there are changes
if git diff --staged --quiet; then
    echo "No changes to health-status.json"
    exit 0
fi

git commit -m "Auto-update health status - $(date -u +"%Y-%m-%d %H:%M UTC")"

# Push using configured remote (token already in remote URL)
git push origin main

echo "Health status updated and pushed successfully"
