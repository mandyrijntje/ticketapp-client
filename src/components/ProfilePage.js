import React, { Component } from "react";
import CreateTicketFormContainer from "./CreateTicketFormContainer";
import CreateEventFormContainer from "./CreateEventFormContainer";
import ProfileTickets from "./ProfileTickets";
import ProfileEvents from "./ProfileEvents";
import { getUser } from "../store/actions/user";
import { getTicketsForUser } from "../store/actions/ticket";
import { getEventsForUser } from "../store/actions/event";
import { connect } from "react-redux";

class ProfilePage extends Component {
  componentDidMount() {
    if (this.props.userLogState.jwt) {
      this.props.getUser(this.props.userLogState.id);
    }
  }

  render() {
    if (!this.props.userLogState.jwt) {
      return <p>Login to access this honey!</p>;
    } else if (!this.props.userTickets && !this.props.userEvents) {
      return (
        <div>
          <p>Welcome {this.props.email}!</p>
          <p>{this.props.email}</p>
          <CreateTicketFormContainer />
          <CreateEventFormContainer />
        </div>
      );
    } else if (this.props.userTickets && !this.props.userEvents) {
      return (
        <div>
          <p>Welcome {this.props.email}!</p>
          <CreateTicketFormContainer />
          <CreateEventFormContainer />
          <div className="row">
            {" "}
            <ProfileTickets
              user={this.props.user}
              tickets={this.props.userTickets}
              events={this.props.userEvents}
            />
          </div>
        </div>
      );
    } else if (!this.props.userTickets && this.props.userEvents) {
      return (
        <div>
          <p>Welcome {this.props.email}!</p>
          <CreateTicketFormContainer />
          <CreateEventFormContainer />
          <div className="row">
            {" "}
            <ProfileEvents
              user={this.props.user}
              tickets={this.props.userTickets}
              events={this.props.userEvents}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>Welcome {this.props.email}!</p>
          <CreateTicketFormContainer />
          <CreateEventFormContainer />
          <div className="row">
            {" "}
            <ProfileTickets
              user={this.props.user}
              tickets={this.props.userTickets}
              events={this.props.userEvents}
            />{" "}
            <ProfileEvents
              user={this.props.user}
              tickets={this.props.userTickets}
              events={this.props.userEvents}
            />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.users.uniqueUser,
    userTickets: state.users.uniqueUser.tickets,
    userEvents: state.users.uniqueUser.events,
    email: state.users.uniqueUser.email,
    userLogState: state.userLogState
  };
}
const mapDispatchToProps = { getUser, getTicketsForUser, getEventsForUser };

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
