
//Code that starts app goes here
const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
const RepoProfile = require('./components/RepoProfile'); 
const TicketList = require('./components/TicketList'); 

const App = require('./components/app');
const data = require('./dummyData');

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={TicketList} />
      <Route path='repoProfile' component={RepoProfile} />
      {// <Route path='repos' component={RepoList} />
      // <Route path='resources' component={ResourceList} />
      }
    </Route>
  </Router>
), document.getElementById('app'))

