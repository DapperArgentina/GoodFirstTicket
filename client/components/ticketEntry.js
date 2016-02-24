const React = require('react');
const TimeAgo = require('../../node_modules/react-timeago/timeago');


const TicketEntry = (props) => (
  <div className="row">
      <div className="col s12 m10">
        <div className="card white">
          <div className="card-content black-text" >
            <span className="card-title"><a className="cyan-text lighten-2" href={props.data.html_url} target="_blank">{props.data.title}</a></span>
              <div className="row">
                <p className="left-align col s6"><span className="octicon octicon-calendar"></span> Created <TimeAgo date={props.data.created_at} /></p>
              </div>
              <div className="row">
                <p className="left-align col s6">Repo: <a className="cyan-text lighten-2" href={props.data.repository_url} target="_blank">{props.data.repo_name}</a></p>
                <p className="right-align col s6">{props.data.language}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
);

module.exports = TicketEntry;