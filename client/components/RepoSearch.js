const React = require('react');

class TicketSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: null,
      //default to Javascript for search
      language: 'Javascript'
    };
    
    this.searchHandler = this.searchHandler.bind(this);
    this.languageHandler = this.languageHandler.bind(this);
  }

  languageHandler(e) {
    this.setState({
      language: e.target.value
    })
  }

  searchHandler(e) {
    //If it is called by someone pressing enter, we run the searchHandler provided to use
    if (e.charCode === 13 || e.keyCode === 13) {
      this.props.searchHandler(e.target.value, this.state.language);
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
              <select value={this.state.language} onChange={this.languageHandler}>
                <option value="Javascript">Javascript</option>
                <option value="HTML">HTML</option>
                <option value="C">C</option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="Ruby">Ruby</option>
                <option value="XSLT">XSLT</option>
                <option value="TypeScript">TypeScript</option>
                <option value="C++">C++</option>
                <option value="PHP">PHP</option>
              </select>
           </div>;
  }
}

module.exports = TicketSearch;