import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AllUsers extends Component {
  render() {
    const displayUsers = this.props.emails.map(user => {
      return (        
          <Link key={user.id} to={`users/${user.id}`}>
          <button type="button" className="list-group-item list-group-item-action">{user.email}</button>
          </Link>
      
      );
    });

    return (<div className="list-group">
    <button type="button" className="list-group-item list-group-item-dark">
    Browse through other users like you.
    </button>
    {displayUsers}
    </div>)
  }
}