const React = require('react');
const Repos = require('../js/repos');

class TicketSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: null,
      //default to Javascript for search
      currentLanguage: 'Javascript',
      languages: []
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
      currentLanguage: newLanguage
    });
  }
  
  setLanguages () {
    //We should only run this once per component rendering (ie. componentDidMount)
    //Multiple calls to material_select screws up the rendering
    Repos.getLanguages((languages) => {
      this.setState({
        languages: languages
      }, () => $(`.${this.languageDropDownClass}`).material_select(this.languageHandler));
    });
  }
  
  componentDidMount() { 
    // Use Materialize custom select input
   //$(`.${this.languageDropDownClass}`).material_select(this.languageHandler);
    this.setLanguages();
  }
  
  searchHandler(e) {
    //If it is called by someone pressing enter, we run the searchHandler provided to use
    if (e.charCode === 13 || e.keyCode === 13) {
      this.props.searchHandler(e.target.value, this.state.currentLanguage);
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
  
  dummy () {
    //this doesn't actually get called because onChange doesn't work w/ the materialize select.
    //we just feed it in so React doesn't throw any errors
  }
  
  render () {
    return <div className="row">
              <div className="input-field col s8">
                <input type="text" value={this.state.searchText} 
                  placeholder="search here..." onChange={this.searchHandler} onKeyPress={this.searchHandler} />
              </div>
              <div className="input-field col s2">
                <select className={this.languageDropDownClass} value={this.state.currentLanguage} onChange={this.dummy}>
                  {this.state.languages.map((lang, index) => <option value={lang} key={lang}>{lang}</option>)}
                </select>
              </div>
           </div>;
  }
}

module.exports = TicketSearch;