const React = require('react');
const NavEntry = require('./NavEntry');
const Route = require('react-router').Route;
const Link = require('react-router').Link;

const NavList = (links) => (
  
  <div className="nav-list">
    {props.links.map ((link, index) => 
      <NavEntry data={link} key={index} />
    )}
  </div>
);

module.exports = NavList;