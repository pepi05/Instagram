import axios from "axios";
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

const fetchAllPosts = (token) => async (dispatch) => {
  dispatch({ type: POSTS_LIST_REQUEST });
  try {
    const { data } = await axios.get("/allpost", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({ type: POSTS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POSTS_LIST_FAIL, payload: error.message });
  }
};

const likePost = (postId, token) => async (dispatch) => {
  dispatch({ type: POST_LIKE_REQUEST });
  try {
    const { data } = await axios.put(
      "/like",
      {
        postId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("DATA", data);
    dispatch({ type: POST_LIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_LIKE_FAIL, payload: error.message });
  }
};

const unlikePost = (postId, token) => async (dispatch) => {
  dispatch({ type: POST_UNLIKE_REQUEST });
  try {
    const { data } = await axios.put(
      "/unlike",
      {
        postId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: POST_UNLIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_UNLIKE_FAIL, payload: error.message });
  }
};

const makeComment = (postId, text, token) => async (dispatch) => {
  dispatch({ type: POST_COMMENT_REQUEST });
  try {
    const { data } = await axios.put(
      "/comment",
      {
        postId,
        text,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: POST_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_COMMENT_FAIL, payload: error.message });
  }
};

const deletePost = (postId, token) => async (dispatch) => {
  dispatch({ type: POST_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/deletepost/${postId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const newData = data.filter((item) => {
      return item._id !== postId;
    });
    dispatch({ type: POST_DELETE_SUCCESS, payload: newData });
  } catch (error) {
    dispatch({ type: POST_DELETE_FAIL, payload: error.message });
  }
};

const createPost = (title, body, data, token) => async (dispatch) => {
  dispatch({ type: POST_CREATE_REQUEST });
  try {
    const newData = await axios.post(
      "https://api.cloudinary.com/v1_1/devm0uxsj/image/upload",
      data
    );
    let url = newData.data.url;
    try {
      const { data } = await axios.post(
        "/createpost",
        {
          title,
          body,
          pic: url,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({ type: POST_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: POST_CREATE_FAIL, payload: error.message });
    }
    dispatch({ type: POST_PICTURE_UPLOAD_SUCCESS, payload: newData });
  } catch (error) {
    dispatch({ type: POST_PICTURE_UPLOAD_FAIL, payload: error.message });
  }
};

const fetchMyPosts = (token) => async (dispatch) => {
  dispatch({ type: MY_POSTS_GET_REQUEST });
  try {
    const { data } = await axios.get("/myposts", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({ type: MY_POSTS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_POSTS_GET_FAIL, payload: error.message });
  }
};

const fetchFollowingPosts = (token) => async (dispatch) => {
  dispatch({ type: MY_FOLLOWERS_POSTS_GET_REQUEST });
  try {
    const { data } = await axios.get("/getsubpost", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({ type: MY_FOLLOWERS_POSTS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_FOLLOWERS_POSTS_GET_FAIL });
  }
};

export {
  fetchAllPosts,
  likePost,
  unlikePost,
  makeComment,
  deletePost,
  createPost,
  fetchMyPosts,
  fetchFollowingPosts,
};
