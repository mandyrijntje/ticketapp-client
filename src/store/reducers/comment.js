const initialState = {
  all: [],
  ticketComments: []
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case "ALL_COMMENTS": {
      // console.log(`comment get is workin`)
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
    case "TICKET_COMMENTS": {
      // console.log(`comment get is workin`)
      return {
        ...state,
        ticketComments: state.all.filter(ticket => {
          for (let i = 0; i < action.payload.length - 1; i++) {
            if (ticket === action.payload[i]) {
              return ticket;
            }
          }
          return action.payload;
        })
      };
    }
    default: {
      return state;
    }
  }
}
