
##How to setup the server  

###Installing apps on server  
  - Nodejs v5.6 - we installed via NVM  
  - Git  
  - mysql  v5.5.47
  - npm install -g forever  

###Folders created on server
  - Source code folder - /var/www/gitbegin  
  - Git repo folder - /var/repo/gitbegin.git  
  
###Pushing code to production server  
Read the following link.  You'll want to use the file in /devops/post-receive for the post receive hook. It contains hooks to 
automatically run webpack. Remeber that you'll need to copy any future changes to post-receive to /var/repo/gitbegin.git/hooks.  You could potentially
symlink to the copy in devops.  
  
https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps  

###Automating server startup and background jobs
We use the npm forever package and cron jobs to make sure the server always starts and stays running. Cron is also used to automate
the background Git data collection.  These scrips are located at devops/starter.sh and devops/data-processor.sh.  Cron can be accessed 
using the command `crontab -e`.  The actual job code that should be added to cron is in devops/cronjobs.txt.
