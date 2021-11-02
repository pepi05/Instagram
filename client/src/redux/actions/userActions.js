import {
  EXTERNAL_USER_FETCH_FAIL,
  EXTERNAL_USER_FETCH_REQUEST,
  EXTERNAL_USER_FETCH_SUCCESS,
  LOGGED_USER_INFO_FAIL,
  LOGGED_USER_INFO_REQUEST,
  LOGGED_USER_INFO_SUCCESS,
  PROFILE_PICTURE_UPDATE_SUCCESS,
  PROFILE_PICTURE_UPLOAD_FAIL,
  PROFILE_PICTURE_UPLOAD_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_UNFOLLOW_FAIL,
  USER_UNFOLLOW_REQUEST,
  USER_UNFOLLOW_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

const register = (name, email, password, data) => async (dispatch) => {
  // dispatch({ type: PROFILE_PICTURE_UPLOAD_REQUEST, payload: data });
  try {
    const newData = await axios.post(
      "https://api.cloudinary.com/v1_1/devm0uxsj/image/upload",
      data
    );
    let url = newData.data.url;
    try {
      const { data } = await axios.post("/signup", {
        name,
        email,
        password,
        url,
      });

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }

    dispatch({ type: PROFILE_PICTURE_UPLOAD_SUCCESS, payload: newData });
  } catch (error) {
    dispatch({ type: PROFILE_PICTURE_UPLOAD_FAIL, payload: error.message });
  }
};

const updateProfilePicture = (data, token) => async (dispatch) => {
  // dispatch({ type: PROFILE_PICTURE_UPDATE_REQUEST, payload: image });
  try {
    const newData = await axios.post(
      "https://api.cloudinary.com/v1_1/devm0uxsj/image/upload",
      data
    );
    const url = newData.data.url;

    try {
      const { data } = await axios.put(
        "/updatepic",
        {
          pic: url,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("DATA", data);

      dispatch({ type: PROFILE_PICTURE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      // dispatch({ type: PROFILE_PICTURE_UPDATE_FAIL, payload: error.message });
    }
    // dispatch({ type: PROFILE_PICTURE_UPLOAD_SUCCESS, payload: newData });
  } catch (error) {
    dispatch({ type: PROFILE_PICTURE_UPLOAD_FAIL, payload: error.message });
  }
};

const externalUserInfoFetch = (userid, token) => async (dispatch) => {
  dispatch({ type: EXTERNAL_USER_FETCH_REQUEST });
  try {
    const { data } = await axios.get(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({ type: EXTERNAL_USER_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EXTERNAL_USER_FETCH_FAIL, payload: error.message });
  }
};

const userLogout = (localStorage) => async (dispatch) => {
  try {
    if (localStorage) {
      localStorage.clear();
    }
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: localStorage });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

const fetchLoggedUser = (userid, token) => async (dispatch) => {
  dispatch({ type: LOGGED_USER_INFO_REQUEST });
  try {
    const { data } = await axios.get(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({
      type: LOGGED_USER_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: LOGGED_USER_INFO_FAIL, payload: error.message });
  }
};

const followUser = (userid, token, loggedUserId) => async (dispatch) => {
  dispatch({ type: USER_FOLLOW_REQUEST });
  try {
    const { data } = await axios.put(
      "/follow",
      {
        followId: userid,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("data od fetch", data);
    dispatch({ type: USER_FOLLOW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_FOLLOW_FAIL, payload: error.message });
  }
};

const unfollowUser = (userid, token) => async (dispatch) => {
  dispatch({ type: USER_UNFOLLOW_REQUEST });
  try {
    const { data } = await axios.put(
      "/unfollow",
      {
        unfollowId: userid,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    dispatch({ type: USER_UNFOLLOW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_UNFOLLOW_FAIL, payload: error.message });
  }
};

export {
  signin,
  register,
  updateProfilePicture,
  externalUserInfoFetch,
  userLogout,
  fetchLoggedUser,
  followUser,
  unfollowUser,
};
