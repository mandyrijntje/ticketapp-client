import React, { Component } from "react";
import CreateImageFormContainer from "./CreateImageFormContainer";
import UserLoggedInImages from "./UserLoggedInImages";
import { getUser, logout } from "../store/actions/user";
import { connect } from "react-redux";

class PersonalPage extends Component {
  componentDidMount() {
    if (this.props.userLoggedIn.jwt) {
    this.props.getUser(this.props.userLoggedIn.id);
  }
}

  onLogout = () => {
    this.props.logout();
    this.props.history.push("/");
  };
  render() {
    if (!this.props.userLogState.jwt) {
      return <p>Login to access your imageboard</p>;
    }

    if (!this.props.userImages) {
      return (
        <div>
          <p>{this.props.userName}</p>
          <CreateImageFormContainer />
        </div>
      );
    }
    return (
      <div>
        <p>Welcome {this.props.userName}</p>
        <button className="btn btn-dark" onClick={this.onLogout}>
          Logout
        </button>
        <CreateImageFormContainer />
        <div className="row">
          {" "}
          <UserLoggedInImages images={this.props.userImages} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userImages: state.users.uniqueUser.images,
    userName: state.users.uniqueUser.username,
    userLoggedIn: state.userLogState
  };
}
const mapDispatchToProps = { getUser, logout };

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage);
