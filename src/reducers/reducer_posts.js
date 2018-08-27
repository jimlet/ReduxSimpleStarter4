import { actionTypes } from '../actions';
import _ from 'lodash';

// Do NOT modify state here.
// ALWAYS create a new object and return that - this is why we're usin some lodash helper functions.

export default function(state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_POSTS:
      // action.payload.data holds the response from the API.
      // It comes back as an array of objects, but we want a single object, with a key for each item.
      // This is a common task, so lodash has a function that can do this for us.
      return _.mapKeys(action.payload.data, 'id');
    case actionTypes.FETCH_POST:
      // [action.payload.data.id] is an example of key interpolation.
      // It's NOT an array.
      // Says make a new key in the object with the value of action.payload.data.id.

      // BTW, an object is almost always a better data storage structure in an app than an array is.
      // If we had left this as an array, adding to and modifying it would be so much more tedious - 
      // find the item to be updated, remove it, readd it, etc.
      // With an object, we just overwrite it everytime like this:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case actionTypes.DELETE_POST:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}