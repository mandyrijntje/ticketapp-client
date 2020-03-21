import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createTicket } from "../store/actions/ticket";
import TicketForm from "./TicketForm";
import { getUser } from "../store/actions/user";
import { getEvents } from "../store/actions/event";

class CreateTicketFormContainer extends React.Component {
  async componentDidMount() {
    // const
    await this.props.getEvents();
    // await this.props.createTicket(this.state, this.props.history, )
    // await this.props.events.map(event => this.props.createTicket(this.state, this.props.history, event.id));
  }

  state = {
    picture: "",
    price: "",
    description: "",
    eventParamId: null
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSelect = eventParamId => {
    this.setState({ eventParamId: eventParamId.value });
    console.log(`Option selected:`, eventParamId.value);
  };

  onSubmit = event => {
    event.preventDefault();
    this.props
      .createTicket(this.state, this.state.eventParamId, this.props.history)
      .then(() => this.props.getUser());
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
          events={this.props.events}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.event.all
  };
}
const mapDispatchToProps = { createTicket, getEvents, getUser };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateTicketFormContainer)
);
