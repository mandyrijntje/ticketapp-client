import React, { Component } from "react";
import { connect } from "react-redux";
import { getCommentsForTicket } from "../store/actions/comment";
import { getUsers } from "../store/actions/users";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

class CommentContainer extends Component {
  // state = {
  //   load: true
  // };
  async componentDidMount() {
    // await this.props.getCommentsForTicket(this.props.ticket.id);
    await this.props.getUsers();
    // this.setState({ load: false });
  }

  render() {
    console.log(`comment container props`, this.props.comments)
    const filteredComments = this.props.comments.filter(
      comment => comment.ticketId === this.props.ticket.id
    );
    // if (this.state.load === false && this.props.ticket.id) {
    return (
      <div>
        <h1>Comments</h1>
        {filteredComments.length === 0
          ? "No comments yet. Be the first."
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

        <CommentForm ticketId={this.props.ticket.id} />
      </div>
    );
    // }
    // return <p>Loading...</p>;
  }
}

function mapStateToProps(state) {
  return {
    // tickets: state.ticket.all,
    users: state.users.all
    // comments: state.comment.all
  };
}
const mapDispatchToProps = { getCommentsForTicket, getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
