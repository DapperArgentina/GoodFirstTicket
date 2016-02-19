const React = require('react');
const TicketSearch = require('./TicketSearch');
const TicketEntry = require('./ticketEntry');


const GH = require('../../gitHubWorker');


class TicketList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      tickets: []
    };
    
    //Fetch issues;
    var self = this;
    GH.getIssues(function(data) {
      self.setState({
        tickets: data.items
      });
    }, console.log);
  }
  
  render () {
    return (
    <div className="main-ticket-view">
      <TicketSearch />
      <div className="ticket-list">
        <h3>Open Issues</h3>
          {this.state.tickets.map ((ticket, index) => 
            <TicketEntry data={ticket} key={index} />
          )}
      </div>
    </div>
    );  
  }
  
}

module.exports = TicketList;