import axios from "axios";
import {
  GET_ERRORS,
  GET_VIDEOS,
  GET_ADVANCED_SEARCH_VIDEOS,
  GET_VIDEO
} from "./types";
export const searchVideos = () => {};

export const getVideos = () => dispatch => {
  axios
    .get("/api/v1/videos")
    .then(res => {
      dispatch({
        type: GET_VIDEOS,
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

export const advanced_search = data => dispatch => {
  axios
    .get(`/api/v1/videos/advanced_search?query=${data}`)
    .then(res => {
      dispatch({
        type: GET_ADVANCED_SEARCH_VIDEOS,
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

export const getVideo = id => dispatch => {
  axios
    .get(`/api/v1/videos/${id}`)
    .then(res => {
      dispatch({
        type: GET_VIDEO,
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
