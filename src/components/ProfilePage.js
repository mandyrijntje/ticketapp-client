import React, { Component } from "react";
import CreateTicketFormContainer from "./CreateTicketFormContainer";
import ProfileTickets from "./ProfileTickets";
import { getUser } from "../store/actions/user";
import { connect } from "react-redux";

class ProfilePage extends Component {
  componentDidMount() {
    if (this.props.userLogState.jwt) {
      this.props.getUser(this.props.userLogState.id);
    }
  }

  render() {
    if (!this.props.userLogState.jwt) {
      return <p>Login to access your imageboard</p>;
    }

    if (!this.props.userTickets) {
      return (
        <div>
          <p>{this.props.email}</p>
          <CreateTicketFormContainer />
        </div>
      );
    }
    return (
      <div>
        <p>Welcome {this.props.email}</p>
        <CreateTicketFormContainer />
        <div className="row">
          {" "}
          <ProfileTickets tickets={this.props.userTickets} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  return {
    userTickets: state.users.uniqueUser.tickets,
    email: state.users.uniqueUser.email,
    userLogState: state.userLogState
  };
}
const mapDispatchToProps = { getUser };

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
