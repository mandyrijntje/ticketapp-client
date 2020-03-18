import request from "superagent";

const baseUrl = "http://localhost:4000";

function allComments(commentData) {
  return {
    type: "ALL_COMMENTS",
    payload: commentData
  };
}
export const getComments = ticketParamId => (dispatch, getState) => {
    const state = getState();
  if (!ticketParamId) {
    ticketParamId = state.ticket.id;
  }
 
  if (!state.comment.all.length) {
    request
      .get(`${baseUrl}/ticket/${ticketParamId}/comment`)
      .then(response => {
        const action = allComments(response.body.comments);
        dispatch(action);
      })
      .catch(console.error);
  }
};

export function postComment(comment, email, ticketId) {
    return {
      type: "POST_COMMENT",
      payload: {
        email: email,
        comment: comment,
        ticketId: ticketId
      }
    };
  }
