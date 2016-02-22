const React = require('react');
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

module.exports = App;