const React = require('react');
const NavBar = require('./NavBar'); 
 
const linksList = [
  {
    name: "tickets", url: '/'
  },
  {
    name: "repos", url: '/repos'
  }, 
  {
    name: "resources", url: '/resources'
  },
  {
    name: "repoProfile", url: '/repoProfile'
  }
];


const App = class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      route: '/'
    };
  }
  
  render () {
    return (
    <div className='app-shell grey lighten-2'>
      <NavBar links={linksList}/>
      <div className="row">
        <div className="main col-sm-10 container">
          {this.props.children}
        </div>
      </div>
    </div>
    );
  }

};
module.exports = App;