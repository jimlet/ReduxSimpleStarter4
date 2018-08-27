import { actionTypes } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_POSTS:
      // action.payload.data holds the response from the API.
      // It comes back as an array of objects, but we want a single object, with a key for each item.
      // This is a common task, so lodash has a function that can do this for us.
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}