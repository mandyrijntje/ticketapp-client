const initialState = { all: [] };

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
    default:
      return state;
  }
}
