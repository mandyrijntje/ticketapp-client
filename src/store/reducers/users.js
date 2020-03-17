const initialState = { all: [], uniqueUser: {} };

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case "ALL_USERS": {
      return {
        ...state,
        all: action.payload
      };
    }
    case "CREATE_USER": {
      return {
        ...state,
        all: [action.payload, ...state.all]
      };
    }
    case "UNIQUE_USER": {
        console.log("reducer")
      return {
        ...state,
        uniqueUser: action.payload
      };
    }
    case "CHANGE_TICKET": {
      const ticketsUpdated = state.uniqueUser.tickets.map(ticket => {
        const condition = ticket.id === action.payload.id;

        if (condition) {
          return action.payload;
        }
        return ticket;
      });
      return {
        ...state,
        uniqueUser: { ...state.uniqueUser, tickets: ticketsUpdated }
      };
    }
    case "TICKET_DELETE_SUCCESS": {
      const ticketId = action.payload;
      const allMinusDeleted = state.uniqueUser.tickets.filter(
        ticket => ticket.id !== ticketId
      );
      return {
        ...state,
        uniqueUser: { ...state.uniqueUser, tickets: allMinusDeleted }
      };
    }
    default:
      return state;
  }
}
