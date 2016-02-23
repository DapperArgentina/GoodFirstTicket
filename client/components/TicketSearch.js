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
    this.languageDropDownClass = 'issue-language-dropdown';
  }

  languageHandler() {
    //The way this is invoked, we have no access to event details so we grab value usingjquery
    var newLanguage = this.grabSelectedLanguageVal();
    this.props.searchHandler(this.state.searchText, newLanguage);
    this.setState({
      language: newLanguage
    });
  }
  
  componentDidMount() {
    // Use Materialize custom select input
    $(`.${this.languageDropDownClass}`).material_select(this.languageHandler);
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
  
  grabSelectedLanguageVal() {
    var $selected = $(`.${this.languageDropDownClass}`).find('.selected');
    return $selected[0].innerText.trim();
  }
  
  render () {
    return <div className="row">
              <div className="input-field col s8">
                <input type="text" value={this.state.searchText} 
                  placeholder="Search here..." onChange={this.searchHandler} onKeyPress={this.searchHandler} />
              </div>
              <div className="input-field col s2">
                <select className="issue-language-dropdown" value={this.state.language} onChange={this.languageHandler}>
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
              </div>
           </div>;
  }
}

module.exports = TicketSearch;