const React = require('react');
const TicketEntry = require('./TicketEntry');

const TicketList = (props) => (
  <div className="ticket-list">
    <h3>Open Issues</h3>
      {props.issues.map ((ticket, index) => 
        <TicketEntry data={ticket} key={index} />
      )}
  </div>
);

module.exports = TicketList;