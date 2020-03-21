import React from "react";
// import { getEvents } from "../store/actions/event";
// import { connect } from "react-redux";
import "./Homepage.css";

export default class Homepage extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="body">
        <p>This is the homepage.</p>
        <h1>"Lorem ipsum, dolor SIT amet!"</h1>
        <h4>-Dolor Sit, lorem ipsum dolor sit amet.</h4>
      </div>
    );
  }
}
