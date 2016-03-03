const React = require('react');
const TimeAgo = require('../../node_modules/react-timeago/timeago');
const Link = require('react-router').Link;

const TicketEntry = (props) => {
  var bounty = props.bounty ? <div className="col s3 right-align"> <p> this.props.bounty </p> </div> : null;
  var button = props.bounty ? <div className="col s3"><a href='#/bounty' className='btn indigo accent-2'>Increase </a></div> : <div className="col s3 offset-s3"><a href='#/bounty' className='btn indigo accent-2'> Add Bounty </a></div>;
  return (
    <div className="row">
      <div className="col s12 m10">
        <div className="card white">
          <div className="card-content black-text" >
            <span className="card-title activator"><a className="light-blue-text accent-1" href={props.data.html_url} target="_blank">{props.data.title}</a><i className="material-icons right">more_vert</i></span>
            <div className="row">
              <div className="col s12 m12">  
                {props.data.labels.map(function(label, index) {
                  return (
                    <div className="chip" style={{'backgroundColor': '#' + label.color}} key={index}>
                      {label.name}
                    </div>
                  );
                }
              )}
              </div>
            </div>
            <div className="row">
              <p className="left-align col s6"><span className="octicon octicon-calendar"></span> created <TimeAgo date={props.data.created_at} /></p>
            </div>
            <div className="row">
              <p className="left-align col s4">repo: <Link className="cyan-text lighten-2" to={`/repoProfile/${props.data.repo_id}`}>{props.data.repo_name}
              </Link></p>
              {bounty}
              {button}
              <p className="right-align col s2">{props.data.language}</p>
            </div>
          </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">{props.data.title}<i className="material-icons right">close</i></span>
          <p>{props.data.body}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

module.exports = TicketEntry;

