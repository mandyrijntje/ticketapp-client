const initialState = {
  all: []
};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case "ALL_COMMENTS": {
      return {
        ...state,
        all: action.payload
      };
    }
    case "POST_COMMENT": {
      return {
        ...state,
        all: state.all.concat({
          email: action.payload.email,
          comment: action.payload.comment,
          ticketId: action.payload.ticketId
        })
      };
    }
    default: {
      return state;
    }
  }
}
