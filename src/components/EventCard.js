import React, { Component } from "react";
import AllTickets from "./AllTickets";
import { getTickets } from "../store/actions/ticket";
import { connect } from "react-redux";

class EventCard extends Component {
  componentDidMount() {
    this.props.getTickets()
  }
  render() {
    const now = new Date();
    const updated = new Date(this.props.event.updatedAt);
    const hours = Math.abs(now - updated) / 36e5;

    return (
      <div className="col-lg-4 col-md-6 col-12" key={this.props.event.id}>
        <h1 className="text-center">
          {" "}
          Event by{" "}
          {this.props.user.email ? this.props.user.email : "Event Enterprises"}
        </h1>
        <h3 className="text-center"> Risk: {""} %</h3>
        <h3 className="text-center"> Price: {this.props.event.price} € </h3>
        <img src={this.props.event.picture} alt="" className="mr-3" />
        <p className="text-center"> {this.props.event.description} € </p>
        <p> Uploaded {Math.round(hours)} hours ago</p>
        <div>
          <h3 className="text-center"> Tickets Available</h3>
          <AllTickets users={this.props.users} tickets={this.props.tickets}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(`hello again`, state.users.all);
  return {
    users: state.users.all,
    tickets: state.ticket.all
  };
}
const mapDispatchToProps = { getTickets };

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
