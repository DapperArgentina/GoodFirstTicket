const React = require('react');

const NavEntry = (props) => (
  <div className="nav-entry">
    <a href='#'><h5>{props.data}</h5></a>
  </div>
);

module.exports = NavEntry;