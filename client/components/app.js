const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;
const NavBar = require('./NavBar'); 
const TicketList = require('./TicketList'); 
const NavList = require('./NavList'); 

var linksList = ["tickets", "repos", "resources"];

const App = (props) => (
  <div className='app-shell grey lighten-2'>
    <NavBar links={linksList}/>
    <div className="row">
      <div className="main col-sm-10 container">
        <TicketList issues={props.tickets} />
      </div>
    </div>
   
  </div>
);

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='tickets' component={TicketList}>
      <Route path='repos' component={RepoList}>
      <Route path='resources' component={ResourceList}>
      <Route path='repoProfile' component={RepoProfile}>
    </Route>
  </Router>
))

module.exports = App;