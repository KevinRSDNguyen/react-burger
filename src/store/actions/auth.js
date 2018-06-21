import axios from "axios";
import * as actionTypes from "./actionTypes";

// Set loading to true
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = { email, password, returnSecureToken: true };
    axios
      .post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD8ZRt-1yo5P5rYakSzJMrmN68MG_fbuX4",
        authData
      )
      .then(({ data }) => {
        console.log(data);
        dispatch(authSuccess(data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
