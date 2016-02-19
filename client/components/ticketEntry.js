const React = require('react');

const TicketEntry = (props) => (
  <div className="ticket-entry">
    <h4>{props.data.title}</h4>
    <p>{props.data.repository_url}</p>
  </div>
);

module.exports = TicketEntry;