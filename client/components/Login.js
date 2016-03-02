const React = require('react');

class Login extends React.Component {

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

  render() {
    return (
      <div className="loginDiv">
        <h1>Login</h1>
        <a href={"127.0.0.1:8080/gitHubRedirect"}>Login with github!</a>
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
          <button type="button" onClick={this.handleSubmit.bind(this)}>Submit new user</button>
        </form>
      </div>
    );
  }
}

module.exports = Login;
