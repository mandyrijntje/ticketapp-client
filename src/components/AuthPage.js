import React from "react";
import { connect } from "react-redux";
import "./AuthPage.css";
import LoginFormContainer from "./LoginFormContainer";
import { Link, Redirect } from "react-router-dom";

class AuthPage extends React.Component {
  componentDidMount() {
    // this.props.getTickets();
  }
  render() {
    if (!this.props.userLogState.jwt) {
      return (
        <div>
          <LoginFormContainer />
          <p>Not a member yet?</p>
          <Link to="/signup">Join</Link>
        </div>
      );
    }
    return <Redirect to="/profile" />;
  }
}
function mapStateToProps(state) {
  return { userLogState: state.userLogState };
}
const mapDispatchToProps = {  };
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
