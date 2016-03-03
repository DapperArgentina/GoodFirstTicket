const React = require('react');

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      username: '',
      password: '',
      confirmedPassword: ''
    };
  }

  handleSubmit() {
    this.setState({
      error: false
    });
    // check if passwords match
// On submit api call to server if 500 setState error true
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleConfirmedPasswordChange(e) {
    this.setState({confirmedPassword: e.target.value});
  }

  render() {
    var error = this.state.error ? <p className="error"> {"Passwords don't match. Try again."} </p> : null;
    return (
      <div className="row loginDiv">
        <div className="col s4 offset-m4">
          <div id='signin'>
            <h2>Signup</h2>
            <form name="userForm" noValidate>
              <div className="form-group">
                <input type='text' placeholder="Username" name='username' className='form-control, validate' required onChange={this.handleUsernameChange.bind(this)}/>

              </div>
              <div className="form-group">
                <input type="password" placeholder="Password" name='password' className="form-control, validate" required onChange={this.handlePasswordChange.bind(this)}/>
              </div>
              <div className="form-group">
                <input type="password" placeholder="Re-enter password" name='confirmPassword' className="form-control, validate" required onChange={this.handleConfirmedPasswordChange.bind(this)}/>
              </div>
              {error}
              <button type="submit" className="waves-effect waves-light btn" onClick={this.handleSubmit.bind(this)}>Sign Up</button>
            </form>
            <a href="#/login">Already have an account? <strong>Sign in!</strong></a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Signup;
