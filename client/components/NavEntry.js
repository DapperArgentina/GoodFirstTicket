const React = require('react');

const NavEntry = (props) => (
  <li>
    <a href='#'>{props.data}</a>
  </li>
);

module.exports = NavEntry;