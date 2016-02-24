const React = require('react');
const Link = require('react-router').Link;
const TimeAgo = require('../../node_modules/react-timeago/timeago');

const RepoEntry = (props) => (
  <div className="row">
      <div className="col s12 m10">
        <div className="card white">
          <div className="card-content black-text" >
              <span className="card-title">
                <Link className="left cyan-text lighten-2" to={`/repoProfile/${props.data.id}`}>{props.data.name}
                </Link>
              </span>
              <div className="row">
                <p className="left-align grey-text lighten-2 col s12">{props.data.description}</p>
              </div>
              <div className="row">
                <strong className="left-align col s3"><span className="octicon octicon-history"></span> Updated <TimeAgo date={props.data.updated_at} /></strong>
                <strong className="center col s3"><span className="octicon octicon-issue-opened"></span> Beginner tickets {props.data.beginner_tickets}</strong>
                <strong className="center col s3"><span className="octicon octicon-git-branch"></span> Forks {props.data.forks}</strong>
                <div className="right-align col s3 mega-octicon octicon-thumbsup"></div>
              </div>
              <div className="row">
                <strong className="left-align col s3 cyan-text lighten-2">{props.data.org_name}</strong>
                <strong className="center col s3" ><a className="cyan-text lighten-2" href={props.data.html_url} target="_blank">Repo on GitHub</a></strong>
                <strong className="center col s3">{props.data.language || 'not specified'}</strong>
                <div className="right-align col s3 mega-octicon octicon-thumbsdown"></div>
              </div>
          </div>
        </div>
      </div>
    </div>
);

module.exports = RepoEntry;