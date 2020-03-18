import React, { Component } from "react";
import TicketCard from "./TicketCard";

class AllTickets extends Component {
  render() {
    return this.props.tickets.map(ticket => {
      return (
        <div key={ticket.id}>
          <TicketCard
            users={this.props.users.find(user => user.id === ticket.userId)}
            ticket={ticket}
          />
        </div>
      );
    });
  }
}

export default AllTickets;
