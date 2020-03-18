import React from "react";
// import { getEvents } from "../store/actions/event";
// import { connect } from "react-redux";
import "./Homepage.css";

export default class Homepage extends React.Component {
  componentDidMount() {
  }
  render() {
    return <div>This is the homepage.</div>
    // if (!this.props.events.length) {
    //   return <p>Loading...</p>;
    // }
    // const displayEvents = this.props.events.map(event => {
    //   return <EventCard key={event.id} event={event} />;
    // });
    // return <div className="row">{displayEvents}</div>;
  }
}
// function mapStateToProps(state) {
//   return { events: state.event.all };
// }
// // const mapDispatchToProps = { getEvents };
// export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
