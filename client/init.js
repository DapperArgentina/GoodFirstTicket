
//Code that starts app goes here
const React = require('react');
const ReactDOM = require('react-dom');
const { Router, Route, Link, IndexRoute, hashHistory } = require('react-router');
const TicketList = require('./components/TicketList'); 
const RepoList = require('./components/RepoList'); 
const RepoProfile = require('./components/RepoProfile'); 

const App = require('./components/app');

ReactDOM.render((
  <App />
), document.getElementById('app'));
