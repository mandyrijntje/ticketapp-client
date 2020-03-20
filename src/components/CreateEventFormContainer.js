import React from "react";
import { connect } from "react-redux";
import { createTicket } from "../store/actions/ticket";
import TicketForm from "./TicketForm";
import { getUser } from "../store/actions/user";

class CreateEventFormContainer extends React.Component {
  state = {
    name: "",
    description: "",
    picture: "",
    startDate: "",
    endDate: ""
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.createEvent(this.state).then(() => this.props.getUser());
    this.setState({
      name: "",
      description: "",
      picture: "",
      startDate: "",
      endDate: ""
    });
  };
  render() {
    return (
      <div>
        <p>Make something unforgettable.</p>
        <EventForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          values={this.state}
        />
      </div>
    );
  }
}
export default connect(null, { createEvent, getUser })(
  CreateEventFormContainer
);
