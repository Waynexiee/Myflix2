import { GET_QUEUE_ITEMS } from "../actions/types";
const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUEUE_ITEMS:
      return action.payload;
    default:
      return state;
  }
}
