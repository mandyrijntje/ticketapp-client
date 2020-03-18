import request from "superagent";

const baseUrl = "http://localhost:4000";

function allTickets(ticketData) {
  return {
    type: "ALL_TICKETS",
    payload: ticketData
  };
}
export const getTickets = () => (dispatch, getState) => {
  const state = getState();
  const { ticket } = state;
  if (!ticket.all.length) {
    request
      .get(`${baseUrl}/ticket`)
      .then(response => {
        const action = allTickets(response.body.tickets);
        dispatch(action);
      })
      .catch(console.error);
  }
};

function newTicket(newTicketData) {
  return {
    type: "NEW_TICKET",
    payload: newTicketData
  };
}

export const createTicket = data => (dispatch, getState) => {
    console.log(data)
  const state = getState();

  const { userLogState } = state;

  return request
    .post(`${baseUrl}/ticket`)
    .set("Authorization", `Bearer ${userLogState.jwt}`)
    .send({ ...data, userId: userLogState.id })
    .then(response => {
      const action = newTicket(response.body);
      dispatch(action);
    })
    .catch(console.error);
};

function changeTicket(newTicket) {
  return {
    type: "CHANGE_TICKET",
    payload: newTicket
  };
}

export function updateTicket(id, update) {
  return async function(dispatch, getState) {
    const state = getState();

    const { userLogState } = state;
    try {
      const response = await request
        .put(`${baseUrl}/ticket/${id}`)
        .set("Authorization", `Bearer ${userLogState.jwt}`)
        .send(update);
      const action = changeTicket(response.body);

      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
}

export const uniqueTicketDelete = id => ({
  type: "TICKET_DELETE_SUCCESS",
  payload: id
});

export const deleteTicket = id => (dispatch, getState) => {
  const state = getState();

  const { userLogState } = state;
  request
    .delete(`${baseUrl}/ticket/${id}`)
    .set("Authorization", `Bearer ${userLogState.jwt}`)
    .then(response => {
      dispatch(uniqueTicketDelete(id));
    })
    .catch(console.error);
};
