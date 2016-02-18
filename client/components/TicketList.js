const React = require('react');
const TicketEntry = require('./TicketEntry');

const TicketList = (props) => (
  <div class="ticket-list">
    <h3>Open Issues</h3>
      {props.issues.map ((ticket) => 
        <TicketEntry data={ticket} />
      )}
  </div>
)