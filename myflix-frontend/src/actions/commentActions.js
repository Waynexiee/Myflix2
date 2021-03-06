import axios from "axios";
import { GET_ERRORS, GET_VIDEO } from "./types";
export const addComment = (video_id, comment) => dispatch => {
  axios
    .post(`/api/v1/videos/${video_id}/reviews`, comment)
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
        error = err.data;
      }

      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });
};
