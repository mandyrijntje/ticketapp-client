const initialState = { all: [] };

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
    default:
      return state;
  }
}
