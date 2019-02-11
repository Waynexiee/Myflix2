import axios from "axios";
import { GET_ERRORS, GET_FRIENDSHIP, GET_USER } from "./types";
export const getFriendship = () => dispatch => {
  axios
    .get(`/api/v1/people`)
    .then(res => {
      dispatch({
        type: GET_FRIENDSHIP,
        payload: res.data
      });
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

export const deleteFriendship = id => dispatch => {
  axios
    .delete(`/api/v1/people/${id}`)
    .then(res => {
      dispatch({
        type: GET_FRIENDSHIP,
        payload: res.data
      });
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

export const addFriendship = id => dispatch => {
  axios
    .post(`/api/v1/people`, { friend_id: id })
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
        error = err.data;
      }

      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });
};
