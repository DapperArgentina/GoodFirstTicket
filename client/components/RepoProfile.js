const React = require('react');

const data = {
  "internal_id":1,
  "id":1357796,
  "name":"emscripten",
  "org_name":"kripken",
  "html_url":"https://github.com/kripken/emscripten",
  "language":"C",
  "beginner_tickets":35,
  "description":"Emscripten: An LLVM-to-JavaScript Compiler",
  "stargazers_count":9723,
  "watchers_count":9723,
  "has_wiki":1,
  "has_pages":0,
  "open_issues":740,
  "forks":1177,
  "created_at":"2011-02-12T05:23:30.000Z",
  "updated_at":"2016-02-22T04:27:46.000Z",
  "pushed_at":"2016-02-20T19:46:56.000Z",
  "data_refreshed_at":"2016-02-22T05:14:34.000Z",
  "record_inserted_at":"2016-02-22T05:14:34.000Z",
  "etag":"\"5621117469930ec9afd5538762cb0514\"",
  "comments": "Wow, this is wonderful!"
};

const RepoProfile = () => (
  <div className="row">
      <div className="col s12 m10">
        <div className="card white">
          <div className="card-content black-text" >
            <span className="card-title">{data.name}</span>
              <div className="row">
                <p className="left-align col s6">Beginner Tickets: {data.beginner_tickets}</p>
                <p className="left-align col s6">Comments: {data.comments}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
);

// Zombie code
{
/*
<div className="repo-profile">
    <h1 className="jumbotron" href={data.html_url}>{data.name}</h1>
    <p>Beginner Tickets: {data.beginner_tickets}</p>
    <p>Comments: {data.comments}</p>
  </div>

const RepoProfile = () => (
  <div className="repo-profile">
    <h1 className="jumbotron" href={data.html_url}>{data.name}</h1>
    <h4>{props.repo.owner.login}</h4>
    <p>{props.repo.language}</p>
    <p>Issues: {props.repo.open_issues_count}</p>
    <p>Starred: {props.repo.stargazers_count}</p>
    <p>Watchers: {props.repo.watchers_count}</p>
    <p>{props.repo.description}</p>
  </div>
);
*/
}


module.exports = RepoProfile;