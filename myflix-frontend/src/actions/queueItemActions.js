import axios from "axios";
import { GET_QUEUE_ITEMS, GET_ERRORS } from "./types";
export const updateQueueItems = items => dispatch => {
  axios
    .post(`/api/v1/update_queue`, { queue_items: items })
    .then(res => {
      dispatch({
        type: GET_QUEUE_ITEMS,
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

export const getQueueItems = () => dispatch => {
  axios
    .get(`/api/v1/my_queue`)
    .then(res => {
      dispatch({
        type: GET_QUEUE_ITEMS,
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

export const deleteItem = id => dispatch => {
  axios
    .delete(`/api/v1/my_queue/${id}`)
    .then(res => {
      dispatch({
        type: GET_QUEUE_ITEMS,
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
