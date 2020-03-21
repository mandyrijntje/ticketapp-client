import React, { Component } from "react";

export default class CommentCard extends Component {
  render() {
    return (
      <div>
        <p>
          <b>{this.props.user.email}: </b>
        </p>
        <p>{this.props.comment.comment}</p>
      </div>
    );
  }
}
