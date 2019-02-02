import {
  GET_VIDEOS,
  GET_VIDEO,
  GET_ADVANCED_SEARCH_VIDEOS
} from "../actions/types";
const initialState = { categories: {}, video: {}, videos: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOS:
      return { ...state, categories: action.payload };
    case GET_VIDEO:
      return { ...state, video: action.payload };
    case GET_ADVANCED_SEARCH_VIDEOS:
      return { ...state, videos: action.payload };
    default:
      return state;
  }
}
