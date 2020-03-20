const initialState = { all: [], uniqueUser: {} };

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case "ALL_USERS": {
      return {
        ...state,
        all: action.payload
      };
    }
    case "JWT": {
      return {
        ...state,
        all: [action.payload, ...state.all]
      };
    }
    case "CREATE_USER": {
      return {
        ...state,
        all: [action.payload, ...state.all]
      };
    }
    case "UNIQUE_USER": {
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
    case "CHANGE_EVENT": {
      const eventsUpdated = state.uniqueUser.events.map(event => {
        const condition = event.id === action.payload.id;

        if (condition) {
          return action.payload;
        }
        return event;
      });
      return {
        ...state,
        uniqueUser: { ...state.uniqueUser, events: eventsUpdated }
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
    case "EVENT_DELETE_SUCCESS": {
      const eventId = action.payload;
      const allMinusDeleted = state.uniqueUser.events.filter(
        event => event.id !== eventId
      );
      return {
        ...state,
        uniqueUser: { ...state.uniqueUser, events: allMinusDeleted }
      };
    }
    default:
      return state;
  }
}
