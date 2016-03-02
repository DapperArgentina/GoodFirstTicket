const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;

const NavEntry = (props) => (
  <li className='indigo accent-2'>
    <Link className='white-text' to={props.data.url}>{props.data.name}</Link>
  </li>
);

module.exports = NavEntry;