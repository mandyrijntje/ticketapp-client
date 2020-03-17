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
  const { tickets } = state;
  if (!tickets.all.length) {
    request
      .get(`${baseUrl}/tickets`)
      .then(response => {
        const action = allTickets(response.body);
        dispatch(action);
      })
      .catch(console.error);
  }
};

function newImage(newImageData) {
  return {
    type: "NEW_IMAGE",
    payload: newImageData
  };
}

export const createTicket = data => (dispatch, getState) => {
  const state = getState();

  const { userLoggedIn } = state;

  return request
    .post(`${baseUrl}/images`)
    .set("Authorization", `Bearer ${userLoggedIn.jwt}`)
    .send({ ...data, userId: userLoggedIn.id })
    .then(response => {
      const action = newImage(response.body);
      dispatch(action);
    })
    .catch(console.error);
};

function changeImage(newImage) {
  return {
    type: "CHANGE_IMAGE",
    payload: newImage
  };
}

export function updateImage(id, update) {
  return async function(dispatch, getState) {
    const state = getState();

    const { userLoggedIn } = state;
    try {
      const response = await request
        .put(`${baseUrl}/images/${id}`)
        .set("Authorization", `Bearer ${userLoggedIn.jwt}`)
        .send(update);
      const action = changeImage(response.body);

      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
}

export const uniqueImageDelete = id => ({
  type: "IMAGE_DELETE_SUCCESS",
  payload: id
});

export const deleteImage = id => (dispatch, getState) => {
  const state = getState();

  const { userLoggedIn } = state;
  request
    .delete(`${baseUrl}/images/${id}`)
    .set("Authorization", `Bearer ${userLoggedIn.jwt}`)
    .then(response => {
      dispatch(uniqueImageDelete(id));
    })
    .catch(console.error);
};
