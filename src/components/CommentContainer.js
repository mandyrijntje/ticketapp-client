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
  async componentWillMount() {
    await this.props.getCommentsForTicket(this.props.ticket.id);
    await this.props.getUsers();
    this.setState({ load: false });
  }

  render() {
    console.log(`params in comment`, this.props.match.params);
    const ticketIdMatch = parseInt(this.props.match.params.id);
    const ticketMatch = this.props.tickets.find(
      ticket => ticket.id === ticketIdMatch
    );

    const filteredComments = this.props.comments.filter(
      comment => comment.ticketId === ticketIdMatch
    );
    if (this.state.load === false && ticketMatch) {
      return (
        <div>
          <h1>Comments</h1>
          {filteredComments.length === 0
            ? "No comments yet. Be the first.yy"
            : filteredComments.map(comment => {
                const commentAuthorId = comment.userId;
                const commentAuthor = this.props.users.find(
                  user => user.id === commentAuthorId
                );

                return (
                  <CommentCard
                    key={comment.id}
                    user={commentAuthor}
                    comment={comment}
                  />
                );
              })}

          <CommentForm ticketId={ticketIdMatch} />
        </div>
      );
    }
    return <p>Loading...</p>;
  }
}

function mapStateToProps(state) {
  return {
    tickets: state.ticket.all,
    users: state.users.all,
    comments: state.comment.all
  };
}
const mapDispatchToProps = { getCommentsForTicket, getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
