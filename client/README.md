#Client-side README#

Our client-side uses React, React-Router, and ES6 and achieves this with webpack. Webpack compiles all of the client-side files into a single .js file that the browser can read.

The init.js file is the root of our client side, the "entry" in the webpack.config.js file. This is where webpack begins it's compiling process, and outputs that compilation to bundle.js. Init.js simply points to the children components through the App component and through the Router. 

React Router refers to the specified path and renders that component when that specific path is referenced. The path names are somewhat arbitrary, but must match the path name where it is requested, although we decided to match path names to the component names. In our app, the requests are mostly from the NavBar component. The router establishes that the RepoList, RepoProfile, and ResourceList components are all siblings of each other and will occupy the same space within the App component.

To begin developing the client side, first run in your terminal 
```javascript
npm install
``` 
This will give you webpack and other dependencies. Then, in the root directory or in this client directory, run 
```javascript
npm run dev
``` 
When it is done (it may take a while), navigate to the page at the top of the webpack command execution. It should be http://localhost:8080/webpack-dev-server/
