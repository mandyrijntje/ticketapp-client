import React from "react";
import SignupForm from "./SignupForm";
import { connect } from "react-redux";
import { signup, getUser } from "../store/actions/user";

class SignupFormContainer extends React.Component {

  state = { email: "", password: "" };

  onSubmit = event => {
    event.preventDefault();
    this.props.signup(
      this.state.email,
      this.state.password,
      this.props.history
    )
this.props.getUser();
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div>
        <SignupForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          values={this.state}
        />
      </div>
    );
  }
}
export default connect(null, { signup, getUser })(SignupFormContainer);