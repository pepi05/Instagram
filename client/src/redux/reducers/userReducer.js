import {
  EXTERNAL_USER_FETCH_FAIL,
  EXTERNAL_USER_FETCH_REQUEST,
  EXTERNAL_USER_FETCH_SUCCESS,
  LOGGED_USER_INFO_FAIL,
  LOGGED_USER_INFO_REQUEST,
  LOGGED_USER_INFO_SUCCESS,
  PROFILE_PICTURE_UPDATE_FAIL,
  PROFILE_PICTURE_UPDATE_REQUEST,
  PROFILE_PICTURE_UPDATE_SUCCESS,
  PROFILE_PICTURE_UPLOAD_FAIL,
  PROFILE_PICTURE_UPLOAD_REQUEST,
  PROFILE_PICTURE_UPLOAD_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_UNFOLLOW_FAIL,
  USER_UNFOLLOW_SUCCESS,
} from "../constants/userConstants";
import { updateObject } from "../../utility";

const initialState = {
  profilePicture: null,
  loggedUserInfo: null,
  externalFetchedUserInfo: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST: {
      return { loading: true };
    }
    case USER_SIGNIN_SUCCESS: {
      // return { loading: false, userInfo: action.payload };
      return updateObject(state, {
        ...state,
        loading: false,
        loggedUserInfo: action.payload,
      });
    }
    case USER_SIGNIN_FAIL: {
      return { loading: false, error: action.payload };
    }

    case USER_REGISTER_REQUEST: {
      return { loading: true };
    }
    case USER_REGISTER_SUCCESS: {
      return { loading: false };
    }
    case USER_REGISTER_FAIL: {
      return { loading: false, error: action.payload };
    }
    case PROFILE_PICTURE_UPLOAD_REQUEST: {
      return { loading: true };
    }
    case PROFILE_PICTURE_UPLOAD_SUCCESS: {
      return { loading: false };
    }
    case PROFILE_PICTURE_UPLOAD_FAIL: {
      return { loading: false, error: action.payload };
    }
    case PROFILE_PICTURE_UPDATE_REQUEST: {
      return { loading: true };
    }
    case PROFILE_PICTURE_UPDATE_SUCCESS: {
      console.log("PAYLOAD", action.payload);
      return updateObject(state, {
        loading: false,
        loggedUserInfo: {
          ...state.loggedUserInfo,
          user: action.payload,
        },
      });
    }
    case PROFILE_PICTURE_UPDATE_FAIL: {
      return { loading: false, error: action.payload };
    }
    case LOGGED_USER_INFO_REQUEST: {
      return { loading: true };
    }
    case LOGGED_USER_INFO_SUCCESS: {
      return updateObject(state, {
        loading: false,
        loggedUserInfo: action.payload,
      });
    }
    case LOGGED_USER_INFO_FAIL: {
      return { loading: false, error: action.payload };
    }
    case EXTERNAL_USER_FETCH_REQUEST: {
      return updateObject(state, {
        loading: true,
      });
    }
    case EXTERNAL_USER_FETCH_SUCCESS: {
      return updateObject(state, {
        loading: false,
        externalFetchedUserInfo: action.payload,
      });
    }
    case EXTERNAL_USER_FETCH_FAIL: {
      return { loading: false, error: action.payload };
    }

    case USER_FOLLOW_REQUEST: {
      return { loading: true };
    }
    case USER_FOLLOW_SUCCESS: {
      return {
        loading: false,
        data: { ...state, followers: action.payload },
      };
    }
    case USER_FOLLOW_FAIL: {
      return { loading: false, error: action.payload };
    }
    case USER_UNFOLLOW_SUCCESS: {
      return {
        loading: false,
        data: { ...state, followers: action.payload },
      };
    }
    case USER_UNFOLLOW_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

// const fetchedUserReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case USER_INFO_REQUEST: {
//       return { loading: true };
//     }
//     case USER_INFO_SUCCESS: {
//       return updateObject(state, {
//         loading: false,
//         fetchedUserInfo: action.payload,
//       });
//       // return { loading: false, userInfo: action.payload };
//     }
//     default:
//       return state;
//   }
// };

export { userReducer };
