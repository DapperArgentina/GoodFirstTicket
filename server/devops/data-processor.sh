#!/bin/bash
source /root/.nvm/nvm.sh #this loads nvm's environment vars

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
        export PATH=/usr/local/bin:$PATH
        cd /var/www/gitbegin
        NODE_ENV=production node /var/www/gitbegin/server/data-processor/fetchIssuesRepos.js
        NODE_ENV=production node /var/www/gitbegin/server/data-processor/refreshRepos.js
fi