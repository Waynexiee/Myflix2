import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//register
export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("/api/v1/register", newUser)
    .then(res => history.push("/sign_in"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//login
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/v1/sign_in", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      history.push("/videos");
    })
    .catch(err => {
      let error;
      if (err.response) {
        error = err.response.data;
      } else {
        error = err.data;
      }

      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  if (history) {
    history.push("/");
  } else {
    window.location.href = window.location.hostname + "/";
  }
};
