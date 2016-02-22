const NavEntry = require('./NavEntry');
const React = require('react');

const NavBar = (props) => (
  <div className="navbar-fixed">
    <nav className="cyan lighten-2" role="navigation">
      <div className="nav-wrapper container col s12 m4 l8"><a id="logo-container" href="#" className="brand-logo">Good First Ticket</a>
        <ul className="right hide-on-med-and-down">
          {props.links.map ((link, index) => 
            <NavEntry data={link} key={index} />
          )}
        </ul>
        <ul id="nav-mobile" className="side-nav">
          {props.links.map ((link, index) => 
            <NavEntry data={link} key={index} />
          )}
        </ul>
        <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
      </div>
    </nav>
  </div>
);

module.exports = NavBar;