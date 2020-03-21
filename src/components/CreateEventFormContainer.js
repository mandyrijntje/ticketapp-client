import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createEvent } from "../store/actions/event";
import EventForm from "./EventForm";
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
    this.props
      .createEvent(this.state, this.props.history)
      .then(() => this.props.getUser());
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
        <h2>Make something unforgettable.</h2>
        <EventForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          values={this.state}
        />
      </div>
    );
  }
}
export default withRouter(
  connect(null, { createEvent, getUser })(CreateEventFormContainer)
);
