import React, { Component } from 'react';
const Repos = require('../js/repos');
const TimeAgo = require('../../node_modules/react-timeago/timeago');

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
  "comments": "Wow, this is wonderful, number one!!"
};

class RepoProfile extends Component {
  constructor (props) {
    super(props);

    this.state = {
      thumbsUp: 0,
      thumbsDown: 0,
      repoToRender: {}
    }

    this.getRepo = this.getRepo.bind(this);
    
  }

  getRepo(id){
    //Fetch repos;
    //refactor to exclude 'self/this' with es6 syntax?
    var self = this;
    Repos.getRepoById(id, function(data) {
      self.setState({
        repoToRender: data
      });
    });
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

  componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the repo profile
    $('.main-repo-view')[0].scrollTop = 0;
  }
  
  componentDidMount () {
    this.getRepo(this.props.routeParams.repoId);
  }


  render() {
    return (
    <div className="row main-repo-view"> 
      <div className="col s12 m10">
        <h4>Repo Profile</h4>
        <div className="card white">
            <div className="card-content black-text">
              <span className="cyan-text lighten-2 card-title" hfre={this.state.repoToRender.html_url}>{this.state.repoToRender.name}</span>
              <div className="row">
                <p className="left-align grey-text lighten-2 col s12">{this.state.repoToRender.description}</p>
              </div>
              <div className="row">
                <strong className="left-align col s3"><span className="octicon octicon-history"></span> Updated <TimeAgo date={this.state.repoToRender.updated_at} /></strong>
                <strong className="center col s3"><span className="octicon octicon-issue-opened"></span> Beginner tickets {this.state.repoToRender.beginner_tickets}</strong>
                <strong className="center col s3"><span className="octicon octicon-git-branch"></span> Forks {this.state.repoToRender.forks}</strong>
                <div className="right-align col s3 mega-octicon octicon-thumbsup" onClick={ () => {this.onThumbsUp()} }>
                  <span className="green-text lighten-2"> {this.state.thumbsUp}</span>
                </div>
              </div>
              <div className="row">
                <strong className="left-align col s3 cyan-text lighten-2">{this.state.repoToRender.org_name}</strong>
                <strong className="center col s3" ><a className="cyan-text lighten-2" href={this.state.repoToRender.html_url} target="_blank">Repo on GitHub</a></strong>
                <strong className="center col s3">{this.state.repoToRender.language || 'not specified'}</strong>
                <div className="right-align col s3 mega-octicon octicon-thumbsdown"  onClick={ () => {this.onThumbsDown()} }>
                  <span className="red-text lighten-2"> {this.state.thumbsDown}</span>
                </div>
              </div>
              <div className="row">
                <p className="left-align col s6"><strong>Comments</strong>: {this.state.repoToRender.comments}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
};



module.exports = RepoProfile;