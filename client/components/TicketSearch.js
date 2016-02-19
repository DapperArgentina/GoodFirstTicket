const React = require('react');

class TicketSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: props.initialSearch
    };
  }

  render () {
    return <div className="col-md-10 col-md-offset-1">
              <input className="form-control" type="text" value={this.state.searchText} placeholder="Search here..." />
           </div>;
  }
}

module.exports = TicketSearch;