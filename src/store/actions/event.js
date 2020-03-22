import request from "superagent";

const baseUrl = "http://localhost:4000";

function userEvents(eventData) {
  return {
    type: "USER_EVENTS",
    payload: eventData
  };
}

export const getEventsForUser = userParamId => (dispatch, getState) => {
  const state = getState();
  if (!state.event.userEvents.length) {
    request
      .get(`${baseUrl}/users/${userParamId}/event`)
      .then(response => {
        const action = userEvents(response.body.events);
        dispatch(action);
      })
      .catch(console.error);
  }
};

function eventTickets(ticketData) {
  return {
    type: "EVENT_TICKETS",
    payload: ticketData
  };
}
export const getTicketsForEvent = eventParamId => (dispatch, getState) => {
  const state = getState();
  if (!state.event.eventTickets.length) {
    request
      .get(`${baseUrl}/event/${eventParamId}/ticket`)
      .then(response => {
        // console.log(`GET TICKETS`, response.body);
        const action = eventTickets(response.body);
        dispatch(action);
      })
      .catch(console.error);
  }
};

function allEvents(eventData) {
  return {
    type: "ALL_EVENTS",
    payload: eventData
  };
}

export const getEvents = () => (dispatch, getState) => {
  const state = getState();
  const { event } = state;
  if (!event.all.length) {
    request
      .get(`${baseUrl}/event`)
      .then(response => {
        // console.log(`get events working`)
        const action = allEvents(response.body.events);
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

export const createEvent = (data, history) => (dispatch, getState) => {
  const state = getState();

  const { userLogState } = state;
  const userId = userLogState.id;
  return request
    .post(`${baseUrl}/users/${userId}/event`)
    .set("Authorization", `Bearer ${userLogState.jwt}`)
    .send({ ...data, userId: userLogState.id })
    .then(response => {
      const action = newEvent(response.body);
      dispatch(action);
    }).then(() => history.push("/profile"))
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
      dispatch(uniqueEventDelete(id));
    })
    .catch(console.error);
};
