import React, { Component } from "react";
import EditEventFormContainer from "./EditEventFormContainer";
import EventCard from "./EventCard";

class ProfileEvents extends Component {
  state = {
    eventsInEdit: []
  };

  toggleForm = event => {
    const newState = this.state.eventsInEdit.includes(event.id)
      ? this.state.eventsInEdit.filter(id => id !== event.id)
      : this.state.eventsInEdit.concat(event.id);

    this.setState({ eventsInEdit: newState });
  };

  render() {
    return this.props.events.map(event => {
      const showForm = this.state.eventsInEdit.includes(event.id);

      return (
        <div key={event.id}>
          <EventCard user={this.props.user} event={event} />
         <div>
           <button
            className="btn btn-dark"
            onClick={() => this.toggleForm(event)}
          >
            Edit mode
          </button>
          
          {showForm && <EditEventFormContainer id={event.id} />}
        </div>
          </div>
      );
    });
  }
}

export default ProfileEvents;
