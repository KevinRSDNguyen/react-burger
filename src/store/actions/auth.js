import axios from "axios";
import * as actionTypes from "./actionTypes";

// Set loading to true
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

// Can register or login
export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = { email, password, returnSecureToken: true };
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD8ZRt-1yo5P5rYakSzJMrmN68MG_fbuX4";
    if (!isSignup) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD8ZRt-1yo5P5rYakSzJMrmN68MG_fbuX4";
    }
    axios
      .post(url, authData)
      .then(({ data }) => {
        dispatch(authSuccess(data.idToken, data.localId));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
