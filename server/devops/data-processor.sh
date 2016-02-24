#!/bin/bash
source /root/.nvm/nvm.sh #this loads nvm's environment vars

echo "Running data-processor batch script"
export PATH=/usr/local/bin:$PATH

cd /var/www/gitbegin

echo --------------------------------------------------------------------------------------------------
echo 
NODE_ENV=production $NVM_BIN/node /var/www/gitbegin/server/data-processor/fetchIssuesRepos.js
NODE_ENV=production $NVM_BIN/node /var/www/gitbegin/server/data-processor/refreshRepos.js
echo
echo --------------------------------------------------------------------------------------------------