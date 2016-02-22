
//Code that starts app goes here
const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
const TicketList = require('./components/TicketList'); 
const RepoList = require('./components/RepoList'); 
const RepoProfile = require('./components/RepoProfile'); 

const App = require('./components/app');
const data = require('./dummyData');


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
), document.getElementById('app'))

//Makes dropdowns work in materialize. Should run after app has loaded.
$(document).ready(function() {
  $('select').material_select();
});
