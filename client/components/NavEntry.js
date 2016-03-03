const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;

const NavEntry = (props) => {
  var url = '';
  if (props.data.name !== 'Profile') {
    url = props.data.url;
  } else {
    url = props.loggedIn ? props.data.url : '/login';
  }

  return (
    <li className='indigo accent-2'>
      <Link className='white-text' to={url}>{props.data.name}</Link>
    </li>
  );
};

module.exports = NavEntry;
