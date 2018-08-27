import axios from 'axios';
import secrets from '../config/secrets';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';

export const actionTypes = {
  FETCH_POSTS: 'fetch_posts',
  FETCH_POST: 'fetch_post',
  CREATE_POST: 'create_post',
  DELETE_POST: 'delete_post',
};

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts?key=${secrets.API_KEY}`);

  return {
    type: actionTypes.FETCH_POSTS,
    payload: request
  }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}?key=${secrets.API_KEY}`);

  return {
    type: actionTypes.FETCH_POST,
    payload: request
  }
}

export function createPost(values, callback) {
  // We use callbacks passed in from the components here to programmatically navigate to different routes.
  // This lets the component control navigation, but only after the action creator has
  // finished whatever it does (here, posting a new item).
  const request = axios.post(`${ROOT_URL}/posts?key=${secrets.API_KEY}`, values)
    .then(() => callback());

  return {
    type: actionTypes.CREATE_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}?key=${secrets.API_KEY}`)
    .then(() => callback());

  return {
    type: actionTypes.DELETE_POST,
    payload: id
  }
}