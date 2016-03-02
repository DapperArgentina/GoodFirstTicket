
#Server

The backend is comprised of a few parts:
  - A web server which is responsible for serving static content and data via our REST API.  The entry point for this
  server is server/server.js.  We've used a cronjob and forever to make sure the server is always running on server startup
  and after crashes.  The folder server/devops contains information on setting this up.
  - A background job which runs every hour, polls Github's API for beginner issues and then updates our mysql database accordingly.
  The code for this is located in the server/data-processor folder.  The shell scripts and cronjob information which are responsible 
  for executing the code are located in server/devops.
  - A mysql database which holds information on the github beginner issues and their associated repositories.
  
## Requirements  

- Node 5.6
- MySQL 5.5

##Setup
  
###Database Setup
First, you need to setup the mysql database.  Steps are:
  1. Install mysql if you do not already have it
  2. Open a mysql terminal and run the commands in server/db/setup.sql one by one.  This file contains the commands
  to create the database, create a user to interact w/ the db and create the tables necessary for the db.  MAKE SURE TO CHANGE
  THE PASSWORD IN THE 2ND COMMAND
  3. Copy server/config.example.js and rename to config.js.  Fill in your database credentials.
  4. Execute the following two files in order using node.  This will reach out to the Github API and populate
  your database w/ live data.  server/data-processor/fetchIssuesRepos.js and server/data-processor/refreshRepos.js.
  5. View the repos and issues tables and make sure you have data.
  
###Dev Environment
After setting your database up, you're almost ready to start working, just run `npm install` to install dependencies, `npm run start`
will start the web server.   If you want to rerun the background data collection, you can either run the .js files manually
as we did when setting up the database or run devops/data-processor.sh.

###Prod Environment
Below are instructions for setting up a production environment, where the web server is always running and the background jobs
run automatically.
  
####Pushing code to production server  
Read the following link.  You'll want to use the file in /devops/post-receive for the post receive hook. It contains hooks to 
automatically run webpack. Remember that you'll need to copy any future changes to post-receive to /var/repo/gitbegin.git/hooks.  You could potentially
symlink to the copy in devops.
  
https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps

Below is the folder structure we are using for the git workflow.
  - Source code folder - /var/www/gitbegin
  - Git repo folder - /var/repo/gitbegin.git 
  
####Automating server startup and background jobs
We use the npm forever package and cron jobs to make sure the server always starts and stays running. Cron is also used to automate
the background Git data collection.  These scripts are located at devops/starter.sh and devops/data-processor.sh. To set this up:
  1. Install the npm forever package using `npm install -g forever`
  2. Open cron w/ the command `crontab -e`
  3. Copy the cron configurations from devops/cronjobs.txt to your crontab config file.
  
###My stuff isn't working.
If you're having problems w/ the automation, cron and the data-processor background job write their logs to /server/logs.
The web server logs write to the default forever location.  You can find this by running the command 'forever logs' and it 
will print the location of the log.

