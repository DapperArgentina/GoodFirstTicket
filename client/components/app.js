const React = require('react');
const NavBar = require('./NavBar'); 
const TicketList = require('./TicketList'); 
const NavList = require('./NavList'); 

var linksList = ["tickets", "repos", "resources"];

const App = (props) => (
  <div className='app-shell'>
    <NavBar />
    <div className="row">
      <div className="left-nav col-sm-3">
        <NavList links={linksList}/>
      </div>
      <div className="main col-sm-6">
        <TicketList issues={props.tickets} />
      </div>
      <div className="right col-sm-3"></div>
    </div>
   
  </div>
);

module.exports = App;