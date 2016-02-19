const React = require('react');
const TicketSearch = require('./TicketSearch');
const TicketEntry = require('./ticketEntry');
const $ = require('jquery');
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
    
    //for really clean scrolling, we could do something like below to calculate the max height and then set the max height css 
    // var maxHeight = $(window).height() - $('.navbar').outerHeight() - margin * 2;
    
    return (
    <div className="main-ticket-view">
      <TicketSearch />
      <h3>Open Issues</h3>
      <div className="ticket-list">
          {this.state.tickets.map ((ticket, index) => 
            <TicketEntry data={ticket} key={index} />
          )}
      </div>
    </div>
    );  
  }
  
}

module.exports = TicketList;