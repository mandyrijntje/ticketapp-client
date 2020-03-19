import React, { Component } from "react";
import TicketCard from "./TicketCard";

class AllTickets extends Component {
  render() {
    console.log(`ALLTICKETS USER`,this.props.user)
    return this.props.tickets.map(ticket => {
      return (
        <div key={ticket.id}>
          <TicketCard user={this.props.user} ticket={ticket} />
        </div>
      );
    });
  }
}

export default AllTickets;
