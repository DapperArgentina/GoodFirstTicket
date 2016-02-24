
//Code that starts app goes here
const React = require('react');
const ReactDOM = require('react-dom');
const { Router, Route, Link, IndexRoute, hashHistory, RouterContext } = require('react-router');

const App = require('./components/app');
const TicketList = require('./components/TicketList'); 
const RepoList = require('./components/RepoList'); 
const RepoProfile = require('./components/RepoProfile'); 
const ResourceList = require('./components/ResourceList');

var wrapComponent = function(Component, props) {
  return React.createClass({
    render: function() {
      return React.createElement(Component, props);
    }
  });
};

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={wrapComponent(TicketList, {p1: 'woah'})} />
      <Route path='repos' component={RepoList} />
      <Route path='repoProfile/:profileName' component={RepoProfile} />
      <Route path='resources' component={ResourceList} />
    </Route>
  </Router>
), document.getElementById('app'));



