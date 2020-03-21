import React from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { login } from "../store/actions/user";
import { withRouter } from "react-router";

class LoginFormContainer extends React.Component {
  state = { email: "", password: "" };
  onSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password, this.props.history);
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <LoginForm
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        values={this.state}
      />
    );
  }
}
export default withRouter(connect(null, { login })(LoginFormContainer));
