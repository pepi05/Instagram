import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  followUser,
  unfollowUser,
  externalUserInfoFetch,
} from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
const UserProfile = () => {
  const [userProfile, setUserProfile] = useState();

  const [showFollow, setShowFollow] = useState();
  // let state = true;
  const fetchedUser = useSelector(
    (state) => state.user.externalFetchedUserInfo
  );

  const { userid } = useParams();

  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  const loggedUser = JSON.parse(localStorage.getItem("userInfo"));

  const loggedUserId = loggedUser.user._id;

  useEffect(() => {
    dispatch(externalUserInfoFetch(userid, token));
  }, [showFollow]);

  const followUserHandler = () => {
    dispatch(followUser(userid, token));
    setShowFollow(false);
  };

  const unfollowUserHandler = () => {
    dispatch(unfollowUser(userid, token));
    setShowFollow(true);
  };

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      {!fetchedUser ? (
        <div>Loading..</div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
              borderBottom: "1px solid gray",
            }}
          >
            <div>
              <img
                src={fetchedUser.user.pic}
                style={{
                  width: "160px",
                  height: "140px",
                  borderRadius: "80px",
                  marginBottom: "18px",
                }}
              />
            </div>
            <div>
              <h4>{fetchedUser.user.name}</h4>
              <h4>{fetchedUser.user.email}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{fetchedUser.posts.length} posts</h6>
                <h6>{fetchedUser.user.followers.length} followers</h6>
                <h6>{fetchedUser.user.following.length} following</h6>
              </div>
              {!fetchedUser.user.followers.includes(loggedUserId) ? (
                <button
                  className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => followUserHandler()}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => unfollowUserHandler()}
                >
                  Unfollow
                </button>
              )}
            </div>
          </div>
          <div className="gallery">
            {fetchedUser.posts.map((item) => {
              return (
                <img
                  style={{
                    margin: "20px 20px 20px 0",
                    height: "250px",
                    width: "250px",
                  }}
                  key={item._id}
                  className="item"
                  src={item.photo}
                  alt={item.title}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
