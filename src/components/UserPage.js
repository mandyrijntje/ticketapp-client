import React, { Component } from "react";
import { connect } from "react-redux";
import TicketCard from "./TicketCard";
import { getUser } from "../store/actions/user";

class UserPage extends Component {
  componentDidMount() {
    this.props.getUser(Number(this.props.match.params.userId));
  }

  render() {

    if (!this.props.userTickets) {
      return <p>Loading...</p>;
    }

    const displayTickets = this.props.userTickets.map(ticket => {
      return <TicketCard key={ticket.id} ticket={ticket} />;
    });
    return (
      <div>
        <p>{this.props.email}</p>
       <div className="row">{displayTickets}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userTickets: state.users.uniqueUser.tickets,
    email: state.users.uniqueUser.email
  };
}
const mapDispatchToProps = { getUser };

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
