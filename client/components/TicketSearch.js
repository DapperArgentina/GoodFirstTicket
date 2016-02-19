const React = require('react');

class TicketSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: null
    };
    
    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler(e) {
    //If it is called by someone pressing enter, we run the searchHandler provided to use
    if (e.charCode === 13 || e.keyCode === 13) {
      this.props.searchHandler(e.target.value);
    }
    
    //In all cases we update our component state
    this.setState({
      searchText: e.target.value
    });
  }
  render () {
    return <div className="col-md-10 col-md-offset-1">
              <input className="form-control" type="text" value={this.state.searchText} 
                placeholder="Search here..." onChange={this.searchHandler} onKeyPress={this.searchHandler} />
           </div>;
  }
}

module.exports = TicketSearch;