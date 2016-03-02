const React = require('react');

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  handleSubmit() {
    console.log(this)
    this.props.addNewUser(this.state.id, this.state.name, this.state.email, this.props.fetchAllUsers)
  }

  handleUsernameChange(e) {
   this.setState({id: e.target.value});
  }
  handlePasswordChange(e) {
   this.setState({name: e.target.value});
  }
  handleConfirmPwdChange(e) {
   this.setState({email: e.target.value});
  }

  render() {
    return (
      <div className="signupDiv">
        <h1>Signup</h1>
        <form className="commentForm">
          <input
            type="text"
            placeholder="username"
            onChange={this.handleUsernameChange.bind(this)}
          />
          <input
            type="text"
            placeholder="password"
            onChange={this.handlePasswordChange.bind(this)}
          />
          <input
            type="text"
            placeholder="confirm password"
            onChange={this.handleConfirmPwdChange.bind(this)}
          />
          <button type="button" onClick={this.handleSubmit.bind(this)}>Submit new user</button>
        </form>
      </div>
    );
  }
}

module.exports = Signup;
