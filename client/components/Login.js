const React = require('react');

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  handleSubmit() {
    this.setState({
      error: false
    });
// On submit api call to server if 500 setState error true
  }

  handleUsernameChange(e) {
    this.setState({id: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({name: e.target.value});
  }

  render() {
    var error = this.state.error ? <p className="error"> Invalid information. Try again. </p> : null;
    return (
      <div className="row row-centered loginDiv">
        <div className="col s4 offset-s4 col-centered">
          <div id='signin'>
            <h2>Login</h2>
            <form name="userForm" noValidate>
              <div className="form-group">
                <input type='text' placeholder="Username" name='username' className='form-control, validate' required onChange={this.handleUsernameChange.bind(this)}/>
                {error}
              </div>
              <div className="form-group">
                <input type="password" placeholder="Password" name='password' className="form-control" required onChange={this.handlePasswordChange.bind(this)}/>
              </div>
              <button type="submit" className="waves-effect waves-light btn" onClick={this.handleSubmit.bind(this)}>Sign In</button> <a href={"http://127.0.0.1:3000/gitHubRedirect"} className='btn git indigo accent-2'><img src={'./github.png'} /></a>
            </form>
            <a href="#/signup">{"Don't have an account?"} <strong>Sign up!</strong></a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Login;
