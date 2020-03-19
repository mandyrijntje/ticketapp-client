import React, { Component } from "react";
import TicketCard from "./TicketCard";

class AllTickets extends Component {

  async componentDidMount(){
    await this.props.getTickets();
    await this.props.getUsers()
  }

 

  render() {
    console.log(`my props in alltickets`, this.props);
    return this.props.tickets.map(ticket => {
      const ticketAuthorId = ticket.userId;
      const ticketAuthor = this.props.users.find(
        user => user.id === ticketAuthorId
      );
      
      return (
        <div key={ticket.id}>
          <TicketCard
            user={ticketAuthor}
            ticket={ticket}
            risk={this.riskCalculated}
          />
        </div>
      );
    });
  }
}

export default AllTickets;
