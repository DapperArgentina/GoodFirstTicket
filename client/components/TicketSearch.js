
const React = require('react');
const TicketEntry = require('./TicketEntry');

class TicketSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: props.initialSearch
    };
  }

  render () {
    return <input type="text" value={this.state.searchText} />;
  }
}

module.exports = TicketSearch;