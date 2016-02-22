
module.exports.mergeAndUpsertRepos = `insert into repos (org_name, name, record_inserted_at)
          select distinct_repos.org_name, distinct_repos.repo_name, NOW()
          from (
            select distinct org_name, repo_name 
            from issues
            ) distinct_repos
          left join repos r on r.org_name=distinct_repos.org_name and r.name=distinct_repos.repo_name
          where r.name is null`;
          
          
module.exports.reposToUpdate = `select name, org_name, etag
                                from repos
                                where datediff(NOW(),data_refreshed_at) > 1 
                                or data_refreshed_at is null
                                limit 20`;