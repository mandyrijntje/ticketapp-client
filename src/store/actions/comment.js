export function setReview(comment, email, ticketId) {
    return {
      type: "STORE_REVIEW",
      payload: {
        email: email,
        comment: comment,
        ticketId: ticketId
      }
    };
  }