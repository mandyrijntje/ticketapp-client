import React, { Component } from "react";
import { connect } from "react-redux";
import CommentContainer from "./CommentContainer";
import { getCommentsForTicket } from "../store/actions/comment";
import { getTicketsForUser } from "../store/actions/ticket";
import { getTicketsForEvent } from "../store/actions/event";

class TicketCard extends Component {
  async componentDidMount() {
    console.log(`TICKET CARD ticketid`, this.props.ticket.id);
    await this.props.getCommentsForTicket(this.props.ticket.id);
    await this.props.getTicketsForEvent(this.props.ticket.eventId);
    await this.props.getTicketsForUser(this.props.user.id);
  }

  riskCalculator = () => {
    let risk = 0;
    let averageTicketPrice = 0;
    const { ticket } = this.props;
    const parseDate = new Date(ticket.createdAt);

    if (this.props.ticketsForUser.length === 1) {
      risk += 10;
    }
    this.props.ticketsForEvent.forEach(ticket => {
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
    console.log(`TICKETCARD USER`, this.props.user);
    console.log(
      `RISK`,
      this.props.ticketsForUser,
      this.props.commentsForTicket,
      this.props.ticketsForEvent
    );

    const now = new Date();
    const updated = new Date(this.props.ticket.updatedAt);
    const hours = Math.abs(now - updated) / 36e5;

    return (
      <div className="col-lg-4 col-md-6 col-12" key={this.props.ticket.id}>
        <h3 className="text-center"> Ticket from {this.props.user.email}</h3>
        <h6 className="text-center"> Risk: {this.riskCalculator()} %</h6>
        <h6 className="text-center"> Price: {this.props.ticket.price} € </h6>
        <img src={this.props.ticket.picture} alt="" className="mr-3" />
        <p className="text-center"> {this.props.ticket.description} € </p>
        <p> Uploaded {Math.round(hours)} hours ago</p>
        <div>
          <h6 className="text-center"> Comments</h6>
          <CommentContainer
            ticket={this.props.ticket}
            comments={this.props.commentsForTicket}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ticketsForEvent: state.event.eventTickets,
    commentsForTicket: state.comment.all,
    ticketsForUser: state.ticket.userTickets
  };
}
const mapDispatchToProps = {
  getCommentsForTicket,
  getTicketsForUser,
  getTicketsForEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketCard);
