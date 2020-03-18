import React, { Component } from "react";
import { connect } from "react-redux";
import { getComments } from "../store/actions/comment";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

class CommentContainer extends Component {
  state = {
    load: true
  };

  async componentDidMount() {
    await getComments();
    this.setState({ load: false });
  }

  render() {
    const ticketIdMatch = parseInt(this.props.match.params.id);
    const ticketMatch = this.props.tickets.find(
      ticket => ticket.id === ticketIdMatch
    );

    const filteredComments = this.props.comments.filter(
      comment => comment.ticketId === ticketIdMatch
    );
    // console.log(`my props in allevents`, this.props);
    if (this.state.load === false && ticketMatch) {
      return this.props.comments.map(comment => {
        const commentAuthorId = comment.userId;
        console.log(`hello`, this.props.users);
        const commentAuthor = this.props.users.find(
          user => user.id === commentAuthorId
        );
        return (
          <div key={comment.id}>
            <h1>Comments</h1>
            {filteredComments.length === 0
              ? "No comments yet. Be the first.yy"
              : filteredComments.map(comment => {
                  return <CommentCard user={commentAuthor} comment={comment} />;
                })}

            <CommentForm ticketId={ticketIdMatch} />
          </div>
        );
      });
    }
    return <p>Loading...</p>;
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comment.all,
    tickets: state.ticket.all,
    users: state.users.all
  };
}
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
