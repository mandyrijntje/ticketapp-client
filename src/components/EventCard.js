import React, { Component } from "react";
import AllTickets from "./AllTickets";


class EventCard extends Component {
  render() {
    const now = new Date();
    const updated = new Date(this.props.events.updatedAt);
    const hours = Math.abs(now - updated) / 36e5;

    const eventAuthorId = this.props.events.userId;
    const eventAuthorName = this.props.users.find(
      user => user.id === eventAuthorId
    ).email
   

    return (
      <div className="col-lg-4 col-md-6 col-12" key={this.props.event.id}>
        <h1 className="text-center">
          {" "}
          Event by {eventAuthorName ? eventAuthorName : "Event Enterprises"}
        </h1>
        <h3 className="text-center"> Risk: {""} %</h3>
        <h3 className="text-center"> Price: {this.props.event.price} € </h3>
        <img src={this.props.event.picture} alt="" className="mr-3" />
        <p className="text-center"> {this.props.event.description} € </p>
        <p> Uploaded {Math.round(hours)} hours ago</p>
        <div>
          <h3 className="text-center"> Tickets Available</h3>
          <AllTickets />
        </div>
      </div>
    );
  }
}


export default EventCard;
