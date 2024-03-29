import React, { Component } from "react";
import { getEvents } from "../store/actions/event";
import { getUsers } from "../store/actions/users";
import EventCard from "./EventCard";
import { connect } from "react-redux";

class AllEvents extends Component {
  state = {
    load: true
  };
  async componentDidMount() {
    await this.props.getUsers();
    await this.props.getEvents();
    this.setState({ load: false });
  }

  render() {
    // console.log(`ALLEVENTS `, this.props.users, this.props.events);

    if (this.state.load === false) {
      const eventsCopy = [...this.props.events];
      const sortedEvents = eventsCopy.sort((a, b) => a.startDate - b.startDate);
      return sortedEvents.map(event => {
        const eventAuthorId = event.userId;
        const eventAuthor = this.props.users.find(
          user => user.id === eventAuthorId
        );

        return (
          <div key={event.id}>
            <EventCard user={eventAuthor} event={event} id={event.id} />
          </div>
        );
      });
    }
    return <p>Loading...</p>;
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.all,
    events: state.event.all
  };
}
const mapDispatchToProps = { getEvents, getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(AllEvents);
