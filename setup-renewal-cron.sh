#!/bin/bash
chmod +x ssl-renew.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$SCRIPT_DIR/ssl-renewal.log"
RENEW_SCRIPT="$SCRIPT_DIR/ssl-renew.sh"

# Add cron job with absolute paths
(crontab -l 2>/dev/null | grep -v "ssl-renew.sh"; echo "30 3 1,15 * * $RENEW_SCRIPT >> $LOG_FILE 2>&1") | crontab -

echo "Cron job configured. Logs will be written to: $LOG_FILE"
echo ""
echo "Current crontab entries:"
crontab -l 