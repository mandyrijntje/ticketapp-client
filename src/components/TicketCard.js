import React, { Component } from "react";
import CommentContainer from "./CommentContainer"

export default class TicketCard extends Component {
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
        <h3 className="text-center"> Risk: {""} %</h3>
        <h3 className="text-center"> Price: {this.props.ticket.price} € </h3>
        <img src={this.props.ticket.picture} alt="" className="mr-3" />
        <p className="text-center"> {this.props.ticket.description} € </p>
        <p> Uploaded {Math.round(hours)} hours ago</p>
        <div>
        <h3 className="text-center"> Comments</h3>
        <CommentContainer/>
        </div>
      </div>
    );
  }
}
