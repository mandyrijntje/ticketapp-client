import React, { Component } from "react";
import TicketCard from "./TicketCard";

export default class AllTickets extends Component {
  render() {
    console.log(`ALLTICKETS USER`,this.props.user, this.props.tickets)
    return this.props.tickets.map(ticket => {
      return (
        <div key={ticket.id}>
          {<TicketCard user={this.props.user} ticket={ticket} />}
        </div>
      );
    });
  }
}

