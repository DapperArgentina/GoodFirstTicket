const React = require('react');

const RepoProfile = (props) => (
  <div className="repo-profile">
    <h1 classname="jumbotron" href={props.repo.html_url}>{props.repo.name}</h1>
    <h4>{props.repo.owner.login}</h4>
    <p>{props.repo.language}</p>
    <p>Issues: {props.repo.open_issues_count}</p>
    <p>Starred: {props.repo.stargazers_count}</p>
    <p>Watchers: {props.repo.watchers_count}</p>
    <p>{props.repo.description}</p>
  </div>
);

module.exports = RepoProfile;