overall organization
webpack - init file, bundle file, what to do to start writing code and see the changes
react-router - 

Our client-side uses React, React-Router and ES6 and achieves this with webpack. Webpack compiles all of the client-side files into a single .js file that the browser can read.

The init.js file is the root of our client side, the "entry" in the webpack.config.js file. This is where webpack begins it's compiling process, and outputs that compilation to bundle.js. Init.js simply points to the children components through the App component and through the Router. 

React Router refers to the specified path and renders that component when that specific path is referenced. Thepath names are somewhat arbitrary but must match the path name where it is requested, although we decided to match path names to the component names. In our app, the requests are mostly from the navBar component. The router establishes that the RepoList, RepoProfile, and ResourceList components are all siblings of each other and will occupy the same space within the App component.
