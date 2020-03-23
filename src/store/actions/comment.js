import request from "superagent";

const baseUrl = "http://localhost:4000";

function allComments(eventData) {
  return {
    type: "ALL_COMMENTS",
    payload: eventData
  };
}

export const getComments = () => (dispatch, getState) => {
  const state = getState();
  if (!state.comment.all.length) {
    request
      .get(`${baseUrl}/comment`)
      .then(response => {
        // console.log(`get events working`)
        const action = allComments(response.body);
        dispatch(action);
      })
      .catch(console.error);
  }
};

function ticketComments(commentData) {
  return {
    type: "TICKET_COMMENTS",
    payload: commentData
  };
}
export const getCommentsForTicket = ticketId => (dispatch, getState) => {
  const state = getState();
  if (!state.comment.ticketComments.length) {
    request
      .get(`${baseUrl}/ticket/${ticketId}/comment`)
      .then(response => {
        // console.log(`getcomments`, response.body);
        const action = ticketComments(response.body);
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
