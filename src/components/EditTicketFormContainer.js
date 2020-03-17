import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTicket, deleteTicket } from "../store/actions/ticket";
import TicketForm from "./TicketForm"

class EditTicketFormContainer extends Component {
  state = {
    title: "",
    url: ""
  };

  onSubmit = event => {
    event.preventDefault();

    const update = {
      title: this.state.title,
      url: this.state.url
    };

    this.props.updateTicket(this.props.id, update);
  };

  onDelete = () => {
    this.props.deleteTicket(this.props.id);
  };
  onChange = event => {
    const { value, name } = event.target;
    // const value = event.target.value
    // const name = event.target.name

    const update = { [name]: value };

    this.setState(update);
  };

  reset = () => {
    this.setState({ title: "", url: "" });
  };

  render() {

    return (
      <div>
      <TicketForm
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        values={this.state}
      />
        <button className="btn btn-dark" onClick={this.onDelete}>Delete</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
    updateTicket,
  deleteTicket
};
export default connect(null, mapDispatchToProps)(EditTicketFormContainer);
