import axios from 'axios';
import secrets from '../config/secrets';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';

export const actionTypes = {
  FETCH_POSTS: 'fetch_posts'
};

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts?${secrets.API_KEY}`);

  return {
    type: actionTypes.FETCH_POSTS,
    payload: request
  }
}