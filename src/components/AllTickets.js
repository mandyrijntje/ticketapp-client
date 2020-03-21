import React, { Component } from "react";
import TicketCard from "./TicketCard";
import { Link } from "react-router-dom";

export default class AllTickets extends Component {
  render() {
    // console.log(`ALLTICKETS USER`, this.props.user, this.props.tickets);
    const displayTickets = this.props.tickets.map(ticket => {
      return (
        <div key={ticket.id}>
          <Link
            key={ticket.id}
            to={`event/${this.props.event.id}/ticket/${ticket.id}`}
          >
            {<TicketCard user={this.props.user} ticket={ticket} />}
          </Link>
        </div>
      );
    });
    return (
      <div className="list-group">
        <button type="button" className="list-group-item list-group-item-dark">
          See available tickets
        </button>
        {displayTickets}
      </div>
    );
  }
}
