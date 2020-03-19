import React, { Component } from "react";
import { connect } from "react-redux";
import CommentContainer from "./CommentContainer";
import { getCommentsForTicket } from "../store/actions/comment";

class TicketCard extends Component {
  async componentDidMount() {
    await this.props.getCommentsForTicket(this.props.ticket.id);
    await this.props.getTicketsForEvent(this.props.ticket.eventId);
  }

  riskCalculator = () => {
    let risk = 0;
    let averageTicketPrice = 0;
    const { ticket } = this.props;
    const parseDate = new Date(ticket.createdAt);

    if (this.props.ticketsForUser.length === 1) {
      risk += 10;
    }
    this.props.ticketsForEvent.map(ticket => {
      averageTicketPrice = averageTicketPrice + ticket.price;
    });
    averageTicketPrice = averageTicketPrice / this.props.ticketsForEvent.length;
    if (ticket.price > averageTicketPrice) {
      risk += ((ticket.price - averageTicketPrice) / averageTicketPrice) * 100;
    } else {
      risk -= ((ticket.price - averageTicketPrice) / averageTicketPrice) * 100;
    }
    if (parseDate.getHours() < 9 || parseDate.getHours() > 17) {
      risk += 10;
    } else {
      risk -= 10;
    }
    if (this.props.commentsForTicket.length > 3) {
      risk += 5;
    }
    return risk > 5 ? (risk > 95 ? 95 : risk) : 5;
  };

  render() {
    const now = new Date();
    const updated = new Date(this.props.ticket.updatedAt);
    const hours = Math.abs(now - updated) / 36e5;

    // const ticketAuthorId = this.props.ticket.userId
    // const ticketAuthor = this.props.users.find(user=>user.id===ticketAuthorId)
    // const ticketAuthorName = ticketAuthor.email
    console.log(`my props in ticketcard`, this.props);
    return (
      <div className="col-lg-4 col-md-6 col-12" key={this.props.ticket.id}>
        <h1 className="text-center"> Ticket from {this.props.user.email}</h1>
        <h3 className="text-center"> Risk: {this.riskCalculator()} %</h3>
        <h3 className="text-center"> Price: {this.props.ticket.price} € </h3>
        <img src={this.props.ticket.picture} alt="" className="mr-3" />
        <p className="text-center"> {this.props.ticket.description} € </p>
        <p> Uploaded {Math.round(hours)} hours ago</p>
        <div>
          <h3 className="text-center"> Comments</h3>
          <CommentContainer ticket={this.props.ticket} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ticketsForEvents: state.event.uniqueEvent,
    commentsForTicket: state.comment.all,
    ticketsForUser: state.users.uniqueUser.tickets
  };
}
const mapDispatchToProps = { getCommentsForTicket };

export default connect(mapStateToProps, mapDispatchToProps)(TicketCard);
