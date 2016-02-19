
//Code that starts app goes here
const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./components/app');
const data = require('./dummyData');

ReactDOM.render(<App tickets={data.items}/> , document.getElementById('app'));