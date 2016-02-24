
##How to setup the server  

###Installing apps on server  
  -Nodejs - we installed via NVM  
  -Git  
  -mysql  
  -npm install -g forever  

###Folders created on server
  -Source code folder - /var/www/gitbegin  
  -Git repo folder - /var/repo/gitbegin.git  
  
###Pushing code to production server  
Read the following link.  You'll want to use the file in /devops/post-receive for the post receive hook. It contains hooks to 
automatically run webpack. Remeber that you'll need to copy any future changes to post-receive to /var/repo/gitbegin.git/hooks.  You could potentially
symlink to the copy in devops.  
  
https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps  

###Automating server startup  
We use the npm forever package and cron jobs to make sure the server always starts and stays running. 
starter.sh contains the script we want to run on startup
The cronjob executes start.sh on reboot.  To add starter.sh to cron:
  -Run `crontab -e`
  -Add the commands from /devops/cronjobs.txt to your cron file.  Make sure to adjust dir paths if necessary 
    
    