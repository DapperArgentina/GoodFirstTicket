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
    
    this.getIssues = this.getIssues.bind(this);
    
    this.getIssues();
  }
  
  getIssues(searchTerm, language){
    //Fetch issues;
    var self = this;
    GH.getIssues(function(data) {
      console.log(data);
      self.setState({
        tickets: data
      });
    }, console.log, searchTerm, language);
  }
  
  render () {
    
    //for really clean scrolling, we could do something like below to calculate the max height and then set the max height css 
    // var maxHeight = $(window).height() - $('.navbar').outerHeight() - margin * 2;
    
    return (
    <div>
      <TicketSearch searchHandler={this.getIssues} />
      <h4>Open Issues</h4>
      <div className="main-ticket-view">
          {this.state.tickets.map ((ticket, index) => 
            <TicketEntry data={ticket} key={index} />
          )}
      </div>
    </div>
    );  
  }
  
}

module.exports = TicketList;