
//Code that starts app goes here
const React = require('react');
const ReactDOM = require('react-dom');

var issues = [{},{},{}];

const App = require('./components/app');

ReactDOM.render(<App tickets={issues}/> , document.getElementById('app'));