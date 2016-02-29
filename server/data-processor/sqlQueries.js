/**
 * Contains sql queries that our background jobs use
 */

/**
 * Finds all unique repos in the issues table and inserts repos into the repos table if they do not already
 * exist there.
 */
module.exports.mergeAndUpsertRepos = `insert into repos (org_name, name, record_inserted_at)
          select distinct_repos.org_name, distinct_repos.repo_name, NOW()
          from (
            select distinct org_name, repo_name 
            from issues
            ) distinct_repos
          left join repos r on r.org_name=distinct_repos.org_name and r.name=distinct_repos.repo_name
          where r.name is null`;
               
/**
 * Returns the list of repos that should be refreshed w/ new data from the Github API
 * */     
module.exports.reposToUpdate = `select name, org_name, etag
                                from repos
                                where datediff(NOW(),data_refreshed_at) > 1 
                                or data_refreshed_at is null
                                order by data_refreshed_at asc;`;
                                
/**
 * Calcualtes the number of beginner tickets per repo and update sthe value in the repos table
 */
module.exports.updateBeginnerTicketCount = `update repos r
                                            left join (
                                              select repo_name, org_name, count(*) num_beginner_tickets
                                              from issues
                                              group by repo_name, org_name) bc on bc.repo_name=r.name and bc.org_name=r.org_name
                                            set r.beginner_tickets = coalesce(bc.num_beginner_tickets, 0);`;