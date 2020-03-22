import React, { Component } from "react";
import { connect } from "react-redux";
import CommentContainer from "./CommentContainer";
import { getTickets } from "../store/actions/ticket";
import { getCommentsForTicket } from "../store/actions/comment";
import { getTicketsForUser } from "../store/actions/ticket";
import { getTicketsForEvent } from "../store/actions/event";

class TicketCard extends Component {
  state = {
    load: true
  };
  async componentDidMount() {
    await getCommentsForTicket(this.props.ticket.id);
    await getTicketsForUser(this.props.ticket.userId);
    await getTicketsForEvent(this.props.ticket.eventId);
    this.setState({ load: false });
  }

  riskCalculator = () => {
    let risk = 0;
    let averageTicketPrice = 0;
    const { ticket } = this.props;
    const parseDate = new Date(ticket.createdAt);

    if (this.props.ticketsForUser.length === 1) {
      risk = risk + 10;
    }
    this.props.ticketsForEvent.forEach(ticket => {
      averageTicketPrice = averageTicketPrice + ticket.price;
    });
    averageTicketPrice =
      (averageTicketPrice - ticket.price) /
      (this.props.ticketsForEvent.length - 1);
    if (ticket.price < averageTicketPrice) {
      risk =
        risk + ((averageTicketPrice - ticket.price) / averageTicketPrice) * 100;
    } else if (
      ticket.price > averageTicketPrice &&
      ((ticket.price - averageTicketPrice) / averageTicketPrice) * 100 > 10
    ) {
      risk = risk + 10;
    } else {
      risk =
        risk - ((ticket.price - averageTicketPrice) / averageTicketPrice) * 100;
    }

    if (parseDate.getHours() < 9 || parseDate.getHours() > 17) {
      risk = risk + 10;
    } else {
      risk = risk - 10;
    }
    if (this.props.commentsForTicket.length > 3) {
      risk = risk + 5;
    }
    return risk > 5 ? (risk > 95 ? 95 : risk) : 5;
  };

  render() {
    // console.log(
    //   `RISK`,
    //   this.props.tickets,
    //   this.props.ticketsForUser,
    //   this.props.commentsForTicket,
    //   this.props.ticketsForEvent
    // );

    const now = new Date();
    const updated = new Date(this.props.ticket.updatedAt);
    const hours = Math.abs(now - updated) / 36e5;
    if (this.state.load === false) {
      return (
        <div className="col-lg-4 col-md-6 col-12" key={this.props.ticket.id}>
          <h3 className="text-center"> Ticket from {this.props.user.email}</h3>
          <h6 className="text-center">
            {" "}
            We calculated that the risk of this ticket being a fraud is:{" "}
            {Math.round(this.riskCalculator())} %
          </h6>
          <h6 className="text-center"> Price: {this.props.ticket.price} € </h6>
          <img src={this.props.ticket.picture} alt="" className="mr-3" />
          <p className="text-center"> {this.props.ticket.description} </p>
          <p> Uploaded {Math.round(hours)} hours ago</p>
          <div>
            <h6 className="text-center"> Comments</h6>
            <CommentContainer ticket={this.props.ticket} />
          </div>
        </div>
      );
    }
    return <p>Loading...</p>;
  }
}

function mapStateToProps(state) {
  return {
    ticketsForUser: state.ticket.userTickets,
    ticketsForEvent: state.event.eventTickets,
    commentsForTicket: state.comment.ticketComments
  };
}
const mapDispatchToProps = {
  getTickets,
  getCommentsForTicket,
  getTicketsForUser,
  getTicketsForEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketCard);
