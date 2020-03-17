import request from "superagent";

const baseUrl = "http://localhost:4000";

function logUserIn(loginData) {
  return {
    type: "JWT",
    payload: loginData
  };
}

export const login = (email, password, history) => dispatch => {
  request
    .post(`${baseUrl}/login`)
    .send({ email: email, password: password })
    .then(response => {
      const action = logUserIn(response.body);
      dispatch(action);
    }).then(() => history.push("/profile"))
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
      .post(`${baseUrl}/users`)
      .send({ email: email, password: password })
      .then(response => {
        const action = createUser(response.body);
        dispatch(action);
      })
      .then(() => history.push("/profile"))
      .catch(console.error);
  };

  function singleUser(uniqueUser) {
    console.log('action passed')
    return {
      
      type: "UNIQUE_USER",
      payload: uniqueUser
    };
  }
  
  export const getUser = userParamId => (dispatch, getState) => {
    if (!userParamId) {
      const state = getState();
      userParamId = state.userLogState.id;
    }
    console.log('action started')
    return request
      .get(`${baseUrl}/users/${userParamId}`)
      .then(response => {
        const body = response.body;
  
        const uniqueUser = {
          id: body.id,
          email: body.email,
          tickets: body.tickets
        };
        console.log(uniqueUser)
        const action = singleUser(uniqueUser);
        dispatch(action);
      })
      .catch(console.error);
  };

  export function logout() {
    return {
      type: "LOG_OUT",
      payload: ""
    };
  }
  