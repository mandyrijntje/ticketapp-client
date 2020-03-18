import React, { Component } from "react";
import EventCard from "./EventCard";
import { connect } from "react-redux";

class AllEvents extends Component {
  render() {
    return this.props.events.map(event => {
      

      return (
        <div key={event.id}>
          <EventCard users={this.props.users} events={this.props.events} />
          </div>
      );
    });
  }
}

function mapStateToProps(state) {
  console.log(state);

  return {
    users: state.users.all,
    events: state.event.all
  };
}
// const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);