const React = require('react');
const NavEntry = require('./NavEntry');

const NavList = (props) => (
  
  <div className="nav-list">
    {props.links.map ((link, index) => 
      <NavEntry data={link} key={index} />
    )}
  </div>
);

module.exports = NavList;