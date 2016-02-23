
//Code that starts app goes here
const React = require('react');
const ReactDOM = require('react-dom');
const { Router, Route, Link, IndexRoute, hashHistory } = require('react-router');
const TicketList = require('./components/TicketList'); 
const RepoList = require('./components/RepoList'); 
const RepoProfile = require('./components/RepoProfile'); 

const App = require('./components/app');

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={TicketList} />
      <Route path='repos' component={RepoList} />
      <Route path='repoProfile' component={RepoProfile} />
      {// <Route path='repos' component={RepoList} />
      // <Route path='resources' component={ResourceList} />
      }
    </Route>
  </Router>
), document.getElementById('app'));
