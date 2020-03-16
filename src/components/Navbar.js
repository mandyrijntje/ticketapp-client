import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top ml-5">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-5">
            <li className="nav-item active mx-5">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link mx-5">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/event" className="nav-link mx-5">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ticket" className="nav-link mx-5">
                Tickets
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mr-0">
            <li className="nav-item mx-5">
              <Link to="/login" className="nav-link">
                Login/Signup
              </Link>
            </li>
            </ul>
        </div>
      </nav>
    );
  }
}
