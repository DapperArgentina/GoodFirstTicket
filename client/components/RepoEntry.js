const React = require('react');
const Link = require('react-router').Link;
const TimeAgo = require('../../node_modules/react-timeago/timeago');

class RepoEntry extends React.Component {
  constructor (repo) {
    super(repo);

    this.state = {
      thumbsUp: 0,
      thumbsDown: 0,
      repo: repo
    };
  }


  onThumbsUp () {
    this.setState({
      thumbsUp: this.state.thumbsUp + 1
    });
  }

  onThumbsDown () {
    this.setState({
      thumbsDown: this.state.thumbsDown - 1
    });
  }  

  render() {
    return (
    <div className="row">
        <div className="col s12 m10">
          <div className="card white">
            <div className="card-content black-text" >
                <span className="card-title">
                  <Link className="left cyan-text lighten-2" to={`/repoProfile/${this.state.repo.data.id}`}>{this.state.repo.data.name}
                  </Link>
                </span>
                <div className="row">
                  <p className="left-align grey-text lighten-2 col s12">{this.state.repo.data.description}</p>
                </div>
                <div className="row">
                  <strong className="left-align col s3"><span className="octicon octicon-history"></span> updated <TimeAgo date={this.state.repo.data.updated_at} /></strong>
                  <strong className="center col s3"><span className="octicon octicon-issue-opened"></span> beginner tickets {this.state.repo.data.beginner_tickets}</strong>
                  <strong className="center col s3"><span className="octicon octicon-git-branch"></span> forks {this.state.repo.data.forks}</strong>
                  <div className="right-align col s3 mega-octicon octicon-thumbsup" onClick={ () => {this.onThumbsUp()} }>
                    <span className="green-text lighten-2"> {this.state.thumbsUp}</span>
                  </div>
                </div>
                <div className="row">
                  <strong className="left-align col s3"><a className="cyan-text lighten-2" href={"http://www.github.com/" + this.state.repo.data.org_name} target="_blank">{this.state.repo.data.org_name}</a></strong>
                  <strong className="center col s3" ><a className="cyan-text lighten-2" href={this.state.repo.data.html_url} target="_blank">repo on github</a></strong>
                  <strong className="center col s3">{this.state.repo.data.language || 'not specified'}</strong>
                  <div className="right-align col s3 mega-octicon octicon-thumbsdown"  onClick={ () => {this.onThumbsDown()} }>
                    <span className="red-text lighten-2"> {this.state.thumbsDown}</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = RepoEntry;


