import {
  MY_FOLLOWERS_POSTS_GET_FAIL,
  MY_FOLLOWERS_POSTS_GET_REQUEST,
  MY_FOLLOWERS_POSTS_GET_SUCCESS,
  MY_POSTS_GET_FAIL,
  MY_POSTS_GET_REQUEST,
  MY_POSTS_GET_SUCCESS,
  POSTS_LIST_FAIL,
  POSTS_LIST_REQUEST,
  POSTS_LIST_SUCCESS,
  POST_COMMENT_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_PICTURE_UPLOAD_FAIL,
  POST_PICTURE_UPLOAD_SUCCESS,
  POST_UNLIKE_FAIL,
  POST_UNLIKE_REQUEST,
  POST_UNLIKE_SUCCESS,
} from "../constants/postConstants";

import { updateObject } from "../../utility";

const initialState = {};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LIST_REQUEST: {
      return { loading: true };
    }
    case POSTS_LIST_SUCCESS: {
      // return { loading: false, posts: action.payload };
      return updateObject(state, {
        loading: false,
        posts: action.payload,
      });
    }
    case POSTS_LIST_FAIL: {
      return { loading: false, error: action.payload };
    }
    case POST_LIKE_REQUEST: {
      return { loading: true };
    }
    case POST_LIKE_SUCCESS: {
      // return { loading: false, likes: action.payload };
      return updateObject(state, {
        loading: false,
        likes: action.payload,
      });
    }

    case POST_LIKE_FAIL: {
      return { loading: false, error: action.payload };
    }
    case POST_UNLIKE_REQUEST: {
      return { loading: true };
    }
    case POST_UNLIKE_SUCCESS: {
      // return { loading: false, likes: action.payload };
      return updateObject(state, {
        loading: false,
        likes: action.payload,
      });
    }
    case POST_UNLIKE_FAIL: {
      return { loading: false, error: action.payload };
    }
    case POST_COMMENT_REQUEST: {
      return { loading: true };
    }
    case POST_COMMENT_SUCCESS: {
      // return { loading: false, comments: action.payload };
      return updateObject(state, {
        loading: false,
        comments: action.payload,
      });
    }
    case POST_COMMENT_FAIL: {
      return { loading: false, error: action.payload };
    }
    case POST_DELETE_REQUEST: {
      return { loading: true };
    }
    case POST_DELETE_SUCCESS: {
      // return { loading: false, posts: action.payload };
      return updateObject(state, {
        loading: false,
        posts: action.payload,
      });
    }
    case POST_DELETE_FAIL: {
      return { loading: false, error: action.payload };
    }
    case POST_CREATE_REQUEST: {
      return { loading: true };
    }
    case POST_CREATE_SUCCESS: {
      // return { loading: false, post: action.payload };
      // return { loading: false };
      return updateObject(state, {
        loading: false,
        post: action.payload,
      });
    }
    case POST_CREATE_FAIL: {
      return { loading: false, error: action.payload };
    }
    case POST_PICTURE_UPLOAD_SUCCESS: {
      // return { loading: false, postPicture: action.payload };
      return { loading: false };
    }
    case POST_PICTURE_UPLOAD_FAIL: {
      return { loading: false, error: action.payload };
    }
    case MY_POSTS_GET_REQUEST: {
      return { loading: true };
    }
    case MY_POSTS_GET_SUCCESS: {
      // return { loading: false, myPosts: action.payload };
      return updateObject(state, {
        loading: false,
        myPosts: action.payload,
      });
    }
    case MY_POSTS_GET_FAIL: {
      return { loading: false, error: action.payload };
    }
    case MY_FOLLOWERS_POSTS_GET_REQUEST: {
      return { loading: true };
    }
    case MY_FOLLOWERS_POSTS_GET_SUCCESS: {
      // return { loading: false, posts: action.payload };
      return updateObject(state, {
        loading: false,
        posts: action.payload,
      });
    }
    case MY_FOLLOWERS_POSTS_GET_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export { postReducer };
