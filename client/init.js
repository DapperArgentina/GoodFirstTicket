
//Code that starts app goes here
const React = require('react');
const ReactDOM = require('react-dom');

var issues = [
  {
    title: 'Fix our app',
    repo: "DapperArgentina"
  },
  {
    title: 'Free work',
    repo: "DapperArgentina"
  },
  {
    title: 'Colin broke it',
    repo: "Hack Reactor"
  }];

const App = require('./components/app');

ReactDOM.render(<App tickets={issues}/> , document.getElementById('app'));