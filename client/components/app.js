const React = require('react');
const NavBar = require('./NavBar'); 
const TicketList = require('./TicketList'); 

const App = (props) => (
  <div className='app-shell'>
    <NavBar />
    <TicketList issues={props.tickets}/>
  </div>
);

module.exports = App;