import React, { Component } from "react";
import EditTicketFormContainer from "./EditTicketFormContainer";
import TicketCard from "./TicketCard";

class ProfileTickets extends Component {
  state = {
    ticketsInEdit: []
  };

  toggleForm = ticket => {
    const newState = this.state.ticketsInEdit.includes(ticket.id)
      ? this.state.ticketsInEdit.filter(id => id !== ticket.id)
      : this.state.ticketsInEdit.concat(ticket.id);

    this.setState({ ticketsInEdit: newState });
  };

  render() {
    return this.props.tickets.map(ticket => {
      const showForm = this.state.ticketsInEdit.includes(ticket.id);

      return (
        <div key={ticket.id}>
          <TicketCard user={this.props.user} ticket={ticket} />
         <div>
           <button
            className="btn btn-dark"
            onClick={() => this.toggleForm(ticket)}
          >
            Edit mode
          </button>
          
          {showForm && <EditTicketFormContainer id={ticket.id} />}
        </div>
          </div>
      );
    });
  }
}

export default ProfileTickets;
