import axios from "axios";
import { GET_ERRORS, GET_USER } from "./types";

export const getUser = id => dispatch => {
  axios
    .get(`/api/v1/users/${id}`)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      let error;
      if (err.response) {
        error = err.response.data;
      } else {
        error = err;
      }

      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });
};
