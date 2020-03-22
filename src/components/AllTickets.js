import React, { Component } from "react";
import TicketCard from "./TicketCard";
import { getUsers } from "../store/actions/users";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class AllTickets extends Component {
  async componentDidMount() {
    await this.props.getUsers();
  }

  render() {
    // console.log(`ALLTICKETS USER`, this.props.user, this.props.tickets);
    const ticketsCopy = [...this.props.tickets];
    const displayTickets = ticketsCopy.map(ticket => {
      const ticketAuthorId = ticket.userId;
      const ticketAuthor = this.props.users.find(
        user => user.id === ticketAuthorId
      );
      return (
        <div key={ticket.id}>
          <Link
            key={ticket.id}
            to={`event/${ticket.eventId}/ticket/${ticket.id}`}
          >
            {<TicketCard user={ticketAuthor} ticket={ticket} id={ticket.id} />}
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
function mapStateToProps(state) {
  return {
    users: state.users.all
  };
}
const mapDispatchToProps = { getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(AllTickets);
