import request from "superagent";

const baseUrl = "http://localhost:4000";

function getallUsers(userData) {
  return {
    type: "ALL_USERS",
    payload: userData
  };
}

export const getUsers = () => (dispatch, getState) => {
  const state = getState();
  const { users } = state;
  console.log(users);
  if (!users.all.length) {
    request
      .get(`${baseUrl}/user`)
      .then(response => {
        const action = getallUsers(response.body);
        console.log("GetAllUsers is working", response.body);
        dispatch(action);
      })
      .catch(console.error);
  }
};
