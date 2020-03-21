import React from "react";
import { connect } from "react-redux";
import { createTicket } from "../store/actions/ticket";
import TicketForm from "./TicketForm";
import { getUser } from "../store/actions/user";

class CreateTicketFormContainer extends React.Component {
  state = {
    picture: "",
    price: "",
    description: ""
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.createTicket(this.state).then(() => this.props.getUser());
    this.setState({
      picture: "",
      price: "",
      description: ""
    });
  };
  render() {
    return (
      <div>
        <h2>Create a ticket, sell it, get rich.</h2>
        <TicketForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          values={this.state}
        />
      </div>
    );
  }
}
export default connect(null, { createTicket, getUser })(
  CreateTicketFormContainer
);
