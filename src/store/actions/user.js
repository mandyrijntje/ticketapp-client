import request from "superagent";

const baseUrl = "http://localhost:4000";

function logUserIn(loginData) {
  return {
    type: "JWT",
    payload: loginData
  };
}

export const login = (email, password) => dispatch => {
  request
    .post(`${baseUrl}/login`)
    .send({ email: email, password: password })
    .then(response => {
      const action = logUserIn(response.body);
      dispatch(action);
    })
    .catch(console.error);
};

function createUser(email) {
    return {
      type: "CREATE_USER",
      payload: email
    };
  }
  
  export const signup = (email, password, history) => dispatch => {
    request
      .post(`${baseUrl}/user`)
      .send({ email: email, password: password })
      .then(response => {
        const action = createUser(response.body);
        dispatch(action);
      })
      .then(() => history.push("/profile"))
      .catch(console.error);
  };

  function singleUser(uniqueUser) {
    return {
      type: "UNIQUE_USER",
      payload: uniqueUser
    };
  }
  
  export const getUser = userParamId => (dispatch, getState) => {
    if (!userParamId) {
      const state = getState();
      userParamId = state.userLoggedIn.id;
    }
  
    return request
      .get(`${baseUrl}/user/${userParamId}`)
      .then(response => {
        const body = response.body;
  
        const uniqueUser = {
          id: body.id,
          username: body.username,
          images: body.images
        };
        const action = singleUser(uniqueUser);
        dispatch(action);
      })
      .catch(console.error);
  };

 
  