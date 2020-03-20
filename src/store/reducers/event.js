const initialState = { all: [], eventTickets:[], userEvents:[] };

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case "ALL_EVENTS": {
      return {
        ...state,
        all: action.payload
      };
    }
    case "NEW_EVENT": {
      return {
        ...state,
        all: [action.payload, ...state.all]
      };
    }
    case "EVENT_TICKETS": {
      return {
        ...state,
        eventTickets: action.payload
      };
    }
    case "USER_EVENTS": {
      return {
        ...state,
        userEvents: action.payload
      };
    }
    default:
      return state;
  }
}
