const initialState = { all: [], userTickets:[] };

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case "ALL_TICKETS": {
      return {
        ...state,
        all: action.payload
      };
    }
    case "NEW_TICKET": {
      return {
        ...state,
        all: [action.payload, ...state.all]
      };
    }
    case "USER_TICKETS": {
      return {
        ...state,
        userTickets: action.payload
      };
    }
    default:
      return state;
  }
}
