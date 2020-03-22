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
  if (!users.all.length) {
    request
      .get(`${baseUrl}/users`)
      .then(response => {
        // console.log(`get users working`);
        const action = getallUsers(response.body);
        dispatch(action);
      })
      .catch(console.error);
  }
};
