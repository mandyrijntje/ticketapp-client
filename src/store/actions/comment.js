import request from "superagent";

const baseUrl = "http://localhost:4000";

function allComments(commentData) {
  return {
    type: "ALL_COMMENTS",
    payload: commentData
  };
}
export const getCommentsForTicket = ticketParamId => (dispatch, getState) => {
  const state = getState();
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

export function postComment(commentData) {
  return {
    type: "POST_COMMENT",
    payload: commentData
  };
}
