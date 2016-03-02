const React = require('react');
const NavBar = require('./NavBar'); 
 
const linksRight = [
  {
    name:"Login", url: '/login'
  },
  {
    name: "Profile", url: '/profile'
  },
  {
    name: "Bounties", url: '/bounties'
  }
];

const linksLeft = [
  {
    name: "Getting Started", url: '/resources'
  },
  {
    name: "Beginner's Section", url: '/'
  },
  {
    name: "Repositories", url: '/repos'
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
      <NavBar linksRight={linksRight} linksLeft={linksLeft}/>
      <div className="row">
        <div className="main col s12 container">
          {this.props.children}
        </div>
      </div>
    </div>
    );
  }

};
module.exports = App;