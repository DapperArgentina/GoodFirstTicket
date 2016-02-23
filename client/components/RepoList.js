const React = require('react');
const RepoSearch = require('./RepoSearch');
const RepoEntry = require('./RepoEntry');
const $ = require('jquery');
const GH = require('../js/gitHubWorker');

class RepoList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      repos: []
    };
    
    this.getRepos = this.getRepos.bind(this);
    
    this.getRepos();
  }
  
  getRepos(searchTerm, language){
    //Fetch repos;
    //refactor to exclude 'self/this' with es6 syntax?
    var self = this;
    GH.getRepos(function(data) {
      console.log(data);
      self.setState({
        repos: data
      });
    }, console.log, searchTerm, language);
  }
  
  render () {
    
    //for really clean scrolling, we could do something like below to calculate the max height and then set the max height css 
    // var maxHeight = $(window).height() - $('.navbar').outerHeight() - margin * 2;
    
    return (
    <div >
      <RepoSearch searchHandler={this.getRepos} />
      <h4>Repositories</h4>
      <div className="main-repo-view">
        {this.state.repos.map ((repo, index) => 
          <RepoEntry data={repo} key={index} />
        )}
      </div>
    </div>
    );  
  }
  
}

module.exports = RepoList;