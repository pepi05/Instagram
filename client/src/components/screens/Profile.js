import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPosts } from "../../redux/actions/postActions";
import { updateProfilePicture } from "../../redux/actions/userActions";

const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    dispatch(fetchMyPosts(token));
  }, []);

  const [myItems, setMyItems] = useState([]);

  const posts = useSelector((state) => state.posts.myPosts);
  const user = useSelector((state) => state.user.loggedUserInfo);

  useEffect(async () => {
    if (posts) {
      await setMyItems(posts.mypost);
    }
  }, [posts]);

  const updatePhotoHandler = (image) => {
    const token = localStorage.getItem("jwt");
    let data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "devm0uxsj");
    dispatch(updateProfilePicture(data, token));
  };

  return (
    <div>
      {myItems.length < 1 ? (
        <div>
          {" "}
          <Container>
            <Row>
              <Col sm="3" className="d-flex flex-column ">
                <img
                  src={user ? user.user.pic : "Loading..."}
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                    padding: "20px",
                    margin: " 0 auto",
                  }}
                />

                <label className="custom-file-upload">
                  Upload
                  <input
                    type="file"
                    // style={{ marginTop: "20px", marginBottom: "20px" }}
                    onChange={(e) => {
                      updatePhotoHandler(e.target.files[0]);
                    }}
                  />
                </label>
              </Col>
              <Col sm="10" md="6">
                <div>
                  <h4>{user ? user.user.name : "loading"}</h4>
                  <h4>{user ? user.user.email : "loading"}</h4>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <h6>{myItems.length} posts</h6>
                    <h6>{user && user.user.followers.length} followers</h6>
                    <h6>{user && user.user.following.length} following</h6>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <Container>
          <Container>
            <Row>
              <Col sm="3" className="d-flex flex-column ">
                <img
                  src={user ? user.user.pic : "Loading..."}
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                    padding: "20px",
                    margin: " 0 auto",
                  }}
                />

                <label className="custom-file-upload">
                  Upload
                  <input
                    type="file"
                    // style={{ marginTop: "20px", marginBottom: "20px" }}
                    onChange={(e) => {
                      updatePhotoHandler(e.target.files[0]);
                    }}
                  />
                </label>
              </Col>
              <Col sm="10" md="6">
                <div>
                  <h4>{user ? user.user.name : "loading"}</h4>
                  <h4>{user ? user.user.email : "loading"}</h4>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <h6>{myItems.length} posts</h6>
                    <h6>{user && user.user.followers.length} followers</h6>
                    <h6>{user && user.user.following.length} following</h6>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>

          <Container style={{ marginTop: "90px" }}>
            <Row xs="12" sm="2" md="4">
              {posts &&
                myItems.map((item) => {
                  return (
                    <img
                      style={{
                        marginBottom: "20px",
                      }}
                      key={item._id}
                      className="item"
                      src={item.photo}
                      alt={item.title}
                    />
                  );
                })}
            </Row>
          </Container>
        </Container>
      )}
    </div>
  );
};

export default Profile;
