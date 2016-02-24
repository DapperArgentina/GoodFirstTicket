const React = require('react');
const NavBar = require('./NavBar'); 
const TicketList = require('./TicketList'); 
// const NavList = require('./NavList'); 

//Code that starts app goes here
const { Router, Route, Link, IndexRoute, hashHistory } = require('react-router');
const RepoList = require('./RepoList'); 
const RepoProfile = require('./RepoProfile'); 
const linksList = [
  {
    name: "tickets", url: '/'
  },
  {
    name: "repos", url: '/repos'
  }, 
  {
    name: "resources", url: '/resources'
  },
  {
    name: "repoProfile", url: '/repoProfile'
  }
  ];

const App = (props) => (
  <div className='app-shell grey lighten-2'>
    <NavBar links={linksList}/>
    <div className="row">
      <div className="main col-sm-10 container">
        <Router history={hashHistory}>
          <Route path='/' component={TicketList} />
          <Route path='/repos' component={RepoList} />
          <Route path='/repoProfile' component={RepoProfile} />
        </Router>
      </div>
    </div>
  </div>
);
{
// render((
//   <Router history={hashHistory}>
//     <Route path='/' component={App}>
//       <IndexRoute component={TicketList} />
//       <Route path='repos' component={RepoList} />
//       <Route path='repoProfile' component={RepoProfile} />
//       <Route path='resources' component={ResourceList} />
//     </Route>
//   </Router>
// )
}
module.exports = App;