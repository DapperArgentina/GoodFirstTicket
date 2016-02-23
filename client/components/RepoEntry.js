const React = require('react');
const Link = require('react-router').Link;
const TimeAgo = require('../../node_modules/react-timeago/timeago');

const RepoEntry = (props) => (
  <div className="row">
      <div className="col s12 m10">
        <div className="card white">
          <div className="card-content black-text" >
            <span className="card-title">
              <div className="row">
                <p className="col s1 cyan-text lighten-2">{props.data.org_name}</p>
                <p className="col s1 black-text"> / </p>
                <Link className="col s1 cyan-text lighten-2" to={`/repoProfile`}>{props.data.name}
                </Link>
              </div>
            </span>
                
              <div className="row">
                <p className="left-align grey-text lighten-2 col s12">{props.data.description}</p>
              </div>
              <div className="row">
                <p className="col s4">Repo updated <TimeAgo date={props.data.updated_at} /></p>
                <p className="col s4"><span className="octicon octicon-issue-opened"></span> Beginner tickets {props.data.beginner_tickets}</p>
                <p className="col s4"><span className="octicon octicon-git-branch"></span> Forks {props.data.forks}</p>
              </div>
              <div className="row">
                <p className="right-align col s6">{props.data.language}</p>
                <p className="left-align col s6" ><a className="cyan-text lighten-2" href={props.data.html_url} target="_blank">Repo on GitHub</a></p>
              </div>
          </div>
        </div>
      </div>
    </div>
);

module.exports = RepoEntry;