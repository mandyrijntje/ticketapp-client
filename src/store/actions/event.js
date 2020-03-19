import request from "superagent";

const baseUrl = "http://localhost:4000";

function allEvents(eventData) {
  return {
    type: "ALL_EVENTS",
    payload: eventData
  };
}

function eventTickets(ticketData) {
  return {
    type: "EVENT_TICKETS",
    payload: ticketData
  };
}
export const getTicketsForEvent = eventParamId => (dispatch, getState) => {
  const state = getState();
  if (!state.ticket.all.length) {
    request
      .get(`${baseUrl}/event/${eventParamId}/ticket`)
      .then(response => {
        const action = eventTickets(response.body.tickets);
        dispatch(action);
      })
      .catch(console.error);
  }
};

export const getEvents = () => (dispatch, getState) => {
  const state = getState();
  const { event } = state;
  if (!event.all.length) {
    request
      .get(`${baseUrl}/event`)
      .then(response => {
        const action = allEvents(response.body.events);
        console.log(`response`, response);
        dispatch(action);
      })
      .catch(console.error);
  }
};


function newEvent(newEventData) {
  return {
    type: "NEW_EVENT",
    payload: newEventData
  };
}

export const createEvent = data => (dispatch, getState) => {
  console.log(data);
  const state = getState();

  const { userLogState } = state;

  return request
    .post(`${baseUrl}/event`)
    .set("Authorization", `Bearer ${userLogState.jwt}`)
    .send({ ...data, userId: userLogState.id })
    .then(response => {
      const action = newEvent(response.body);
      dispatch(action);
    })
    .catch(console.error);
};

function changeEvent(newEvent) {
  return {
    type: "CHANGE_EVENT",
    payload: newEvent
  };
}

export function updateEvent(id, update) {
  return async function(dispatch, getState) {
    const state = getState();

    const { userLogState } = state;
    try {
      const response = await request
        .put(`${baseUrl}/event/${id}`)
        .set("Authorization", `Bearer ${userLogState.jwt}`)
        .send(update);
      const action = changeEvent(response.body);

      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
}

export const uniqueEventDelete = id => ({
  type: "EVENT_DELETE_SUCCESS",
  payload: id
});

export const deleteEvent = id => (dispatch, getState) => {
  const state = getState();

  const { userLogState } = state;
  request
    .delete(`${baseUrl}/event/${id}`)
    .set("Authorization", `Bearer ${userLogState.jwt}`)
    .then(response => {
        console.log(response.body)
      dispatch(uniqueEventDelete(id));
    })
    .catch(console.error);
};
