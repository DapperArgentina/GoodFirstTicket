const NavEntry = require('./NavEntry');
const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;


const NavBar = class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    $('.button-collapse').sideNav();
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="indigo accent-2" role="navigation">
        <a className='new dropdown-button left hide-on-med-and-down' data-beloworigin="true" href='#' data-activates='new'>{'New to Github?'}<i className="material-icons left">arrow_drop_down</i></a>
          <ul id="new" className='dropdown-content'>
          {this.props.linksLeft.map ((link, index) =>
            <NavEntry data={link} key={index} />
          )}
          </ul>
          <a id="logo-container" href="#" className="brand-logo center"><img src={'./rsz_b.png'} /></a>
            <ul className="right hide-on-med-and-down">
              {this.props.linksRight.map ((link, index) =>
                <NavEntry data={link} key={index} loggedIn={this.props.loggedIn}/>
              )}
              <li className='Bounty deep-orange'><Link to={this.props.loggedIn ? '/bounty' : '/login'}>Add Bounty</Link></li>
            </ul>
            <ul id="nav-mobile" className="side-nav">
              {this.props.linksRight.map ((link, index) =>
                <NavEntry data={link} key={index} />
              )}
              {this.props.linksLeft.map ((link, index) =>
                <NavEntry data={link} key={index} />
              )}
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>

        </nav>
      </div>
    );
  }

};

module.exports = NavBar;
