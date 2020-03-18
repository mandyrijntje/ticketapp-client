import React, { Component } from "react";
import TicketCard from "./TicketCard";

class AllTickets extends Component {
  render() {
    return this.props.tickets.map(ticket => {
      

      return (
        <div key={ticket.id}>
          <TicketCard ticket={ticket} />
          </div>
      );
    });
  }
}

export default AllTickets;
