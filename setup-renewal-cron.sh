#!/bin/bash
chmod +x ssl-renew.sh

# Add cron job to run ssl-renew.sh twice a month (on the 1st and 15th at 3:30 AM)
# This ensures certificates are renewed well before the 90-day expiration
(crontab -l 2>/dev/null | grep -v "ssl-renew.sh"; echo "30 3 1,15 * * $(pwd)/ssl-renew.sh >> $(pwd)/ssl-renewal.log 2>&1") | crontab -

echo "You can view the renewal logs at: $(pwd)/ssl-renewal.log"

# Show the current crontab
echo ""
echo "Current crontab entries:"
crontab -l 