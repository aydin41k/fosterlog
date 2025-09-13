echo "Running startup.sh"
cp /home/site/wwwroot/nginx-default /etc/nginx/sites-available/default && service nginx reload && service supervisor restart

# Copy .user.ini to public directory
cp /home/site/wwwroot/.user.ini /home/site/wwwroot/public/.user.ini

php /home/site/wwwroot/artisan migrate --force
echo "Migrated database"

nohup php /home/site/wwwroot/artisan queue:work --tries=3 >> /var/log/queue.log 2>&1 &
nohup sh -c 'while true; do php /home/site/wwwroot/artisan schedule:run >> /var/log/schedule.log 2>&1; sleep 60; done' &
echo "Started job queue and scheduler"