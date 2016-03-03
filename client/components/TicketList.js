const React = require('react');
const TicketSearch = require('./TicketSearch');
const TicketEntry = require('./ticketEntry');
const Issues = require('../js/issues');

class TicketList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      ticketsToRender: [],
      bounties: this.props.bounties || false
    };
    console.log(this.state);
    this.getIssues = this.getIssues.bind(this);
    this.getBounties = this.getBounties.bind(this);
  }
  
  getIssues(searchTerm, language){
    //Fetch issues;
    var self = this;

    Issues.getIssues(function(data) {
      self.setState({
        numberOfTickets: data.length,
        ticketsToRender: data.slice(0,199)
      });
    }, console.log, searchTerm, language);
  }

  getBounties(searchTerm, language) {
    //Fetch issues;
    var self = this;

    Issues.getBounties(function(data) {
      self.setState({
        numberOfTickets: data.length,
        ticketsToRender: data.slice(0, 199)
      });
    }, console.log, searchTerm, language);
  }

  componentDidMount () {
    this.state.bounties ? this.getBounties() : this.getIssues();
  }
  componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the ticket list
    $('.main-ticket-view')[0].scrollTop = 0;
  }
  render () {
    if (this.state.bounties) {
      return (
      <div>
        <TicketSearch searchHandler={this.getBounties} />
        <h4>{this.state.numberOfTickets} issues found on github</h4>
        <blockquote> Github issues with bounties on it
        </blockquote>
        <div className="main-ticket-view">
            {this.state.ticketsToRender.map ((ticket, index) => (
                <TicketEntry data={ticket} key={index} />
              )
            )}
        </div>
      </div>
      );      
    } else {
    //for really clean scrolling, we could do something like below to calculate the max height and then set the max height css 
    // var maxHeight = $(window).height() - $('.navbar').outerHeight() - margin * 2;
    
      return (
      <div>
        <TicketSearch searchHandler={this.getIssues} />
        <h4>{this.state.numberOfTickets} beginner tickets on github</h4>
        <blockquote>labeled on github as easy, beginner, good first bug, etc.
        </blockquote>
        <div className="main-ticket-view">
            {this.state.ticketsToRender.map ((ticket, index) => (
                <TicketEntry data={ticket} key={index} />
              )
            )}
        </div>
      </div>
      );
    }  
  }
  
}

module.exports = TicketList;