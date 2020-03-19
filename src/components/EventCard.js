import React, { Component } from "react";
import AllTickets from "./AllTickets";
import { getTicketsForEvent } from "../store/actions/event";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class EventCard extends Component {
  state = {
    load: true
  };
  async componentDidMount() {
    await this.props.getTicketsForEvent(this.props.event.id);
    this.setState({ load: false });
  }
  render() {
    console.log(`EVENTCARD USER`, this.props.user, this.props.tickets);
    const now = new Date();
    const updated = new Date(this.props.event.updatedAt);
    const hours = Math.abs(now - updated) / 36e5;
    if (this.state.load === false) {
      return (
        <div className="col-lg-4 col-md-6 col-12" key={this.props.event.id}>
          <h1 className="text-center">{this.props.event.name}</h1>
          <h3 className="text-center">
            {" "}
            Created by:{" "}
            {this.props.user.email ? (
              <Link
                to={{
                  pathname: `/users/${this.props.user.id}`
                }}
              >
                {this.props.user.email}
              </Link>
            ) : (
              "Event Enterprises"
            )}
          </h3>
          <h3 className="text-center">
            {" "}
            {this.props.event.startDate} to {this.props.event.endDate}{" "}
          </h3>
          <img src={this.props.event.picture} alt="" className="mr-3" />
          <p className="text-center"> {this.props.event.description} </p>
          <p> Uploaded {Math.round(hours / 24)} days ago</p>
          <div>
            <h3 className="text-center"> Tickets Available</h3>
            <AllTickets user={this.props.user} tickets={this.props.tickets} />
          </div>
        </div>
      );
    }
    return <p>Loading...</p>;
  }
}

function mapStateToProps(state) {
  return {
    tickets: state.ticket.all
  };
}
const mapDispatchToProps = { getTicketsForEvent };

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
