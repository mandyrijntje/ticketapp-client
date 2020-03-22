import React, { Component } from "react";
import { connect } from "react-redux";
import { getCommentsForTicket } from "../store/actions/comment";
import { getUsers } from "../store/actions/users";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

class CommentContainer extends Component {
  state = {
    load: true
  };
  async componentDidMount() {
    // console.log(this.props.ticket.id)
    await this.props.getCommentsForTicket(this.props.ticket.id);
    await this.props.getUsers();
    this.setState({ load: false });
  }

  render() {
    // console.log(`comment container props`, this.props.comments)
    if (
      this.state.load === false &&
      !this.props.userLogState.jwt &&
      this.props.comments.length === 0
    ) {
      return (
        <div>
          <p>You must be logged in to comment.</p>
        </div>
      );
    } else if (
      this.state.load === false &&
      !this.props.userLogState.jwt &&
      this.props.comments.length !== 0
    ) {
      return this.props.comments.map(comment => {
        const commentAuthorId = comment.userId;
        const commentAuthor = this.props.users.find(
          user => user.id === commentAuthorId
        );

        return (
          <div>
            <p>You must be logged in to comment.</p>
            <CommentCard
              key={comment.id}
              user={commentAuthor}
              comment={comment}
            />
          </div>
        );
      });
    } else if (
      this.state.load === false &&
      this.props.userLogState.jwt &&
      this.props.comments.length === 0
    ) {
      return (
        <div>
          <p>No comments yet. Be the first.</p>
          <CommentForm ticketId={this.props.ticket.id} />
        </div>
      );
    } else if (
      this.state.load === false &&
      this.props.userLogState.jwt &&
      this.props.comments.length !== 0
    ) {
      return this.props.comments.map(comment => {
        const commentAuthorId = comment.userId;
        const commentAuthor = this.props.users.find(
          user => user.id === commentAuthorId
        );

        return (
          <div>
            <p>Something to say?</p>
            <CommentCard
              key={comment.id}
              user={commentAuthor}
              comment={comment}
            />
            <CommentForm ticketId={this.props.ticket.id} />
          </div>
        );
      });
    } else {
      return <p>Loading comments.</p>;
    }
  }
}

function mapStateToProps(state) {
  return {
    userLogState: state.userLogState,
    users: state.users.all,
    comments: state.comment.ticketComments
  };
}
const mapDispatchToProps = { getCommentsForTicket, getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
