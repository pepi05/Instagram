import React, { useState, useEffect } from "react";
import { Spinner, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Card, CardBody, CardTitle, InputGroup, Input } from "reactstrap";
import {
  deletePost,
  fetchAllPosts,
  fetchFollowingPosts,
  likePost,
  makeComment,
  unlikePost,
} from "../../redux/actions/postActions";

const Home = (props) => {
  const history = useHistory();
  const [loggedUser, setLoggedUser] = useState();

  const [allPosts, setAllPosts] = useState();

  const token = localStorage.getItem("jwt");
  const logged = localStorage.getItem("userInfo");

  let user = useSelector((state) => state.user);
  const { loading, loggedUserInfo, error } = user;

  let newPosts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (newPosts) {
      setAllPosts(newPosts.posts);
    }
  }, [newPosts]);

  const dispatch = useDispatch();

  const functionLikeWrapper = (type, key, postId) => {
    impresionHandler(type, key, postId);
    likedPostHandler(key);
  };

  const likedPostHandler = (key) => {
    const data = [...allPosts];
    const userId = loggedUserInfo.user._id;

    if (data[key].likes.includes(userId)) {
      data[key].likes.pop(userId);
    } else {
      data[key].likes.push(userId);
    }

    setAllPosts(data);
  };

  const commentPostHandler = (postId, text, key) => {
    dispatch(makeComment(postId, text, token));

    const data = [...allPosts];
    const userId = loggedUserInfo.user._id;
    data[key].comments.push({
      text: text,
      postedBy: {
        name: loggedUserInfo.user.name,
        id: userId,
      },
      _id: `${Math.random(0, 200000000)}`,
    });

    setAllPosts(data);
  };

  const deletePostHandler = async (postId, key) => {
    await dispatch(deletePost(postId, token));
    const data = [...allPosts];
    data.splice(key, 1);
    console.log("DELETED DATA", data);
    setAllPosts(data);
  };

  const impresionHandler = (type, key, postId) => {
    if (type === "like") {
      likeThePost(postId);
    }
    if (type === "unlike") {
      unlikeThePost(postId);
    }
  };

  const likeThePost = (postId) => dispatch(likePost(postId, token));
  const unlikeThePost = (postId) => dispatch(unlikePost(postId, token));

  useEffect(async () => {
    if (!logged && !loggedUser) {
      history.push("/signin");
    }
    if (logged && !loading) {
      setLoggedUser(JSON.parse(logged).user._id);
    }
    if (window.location.pathname === "/") {
      await dispatch(fetchAllPosts(token));
    }
    if (window.location.pathname === "/myfollowingposts") {
      await dispatch(fetchFollowingPosts(token));
    }
  }, [logged, window.location.pathname]);

  const renderItem = (item, key) => (
    <Col sm="12" md="6" lg="4">
      <Card>
        <CardBody>
          <CardTitle>
            <h4 className="card-user-names">
              <Link
                to={
                  item.postedBy._id !== loggedUser
                    ? `/profile/${item.postedBy._id}`
                    : "/profile"
                }
              >
                {item.postedBy.name}
              </Link>
              {item.postedBy._id == loggedUser && (
                <i
                  className="material-icons"
                  style={{
                    cursor: "pointer",
                    float: "right",
                  }}
                  onClick={() => deletePostHandler(item._id, key)}
                >
                  delete
                </i>
              )}
            </h4>
          </CardTitle>
        </CardBody>
        <div className="image-container">
          <img src={item.photo} alt="Card image cap" />
        </div>
        <CardBody>
          <i className="material-icons" style={{ color: "red" }}>
            {item.likes.includes(loggedUser) ? (
              <i
                className="material-icons like-button"
                onClick={() => {
                  functionLikeWrapper("unlike", key, item._id);
                }}
              >
                thumb_down
              </i>
            ) : (
              <i
                className="material-icons like-button"
                onClick={() => {
                  functionLikeWrapper("like", key, item._id);
                }}
              >
                thumb_up
              </i>
            )}
            favorite
          </i>

          <h6>{item.likes.length} likes </h6>
          <h6>{item.title}</h6>
          <p>{item.body}</p>
          <div className="comments-container">
            {item.comments.map((record) => {
              return (
                <h6 key={record._id}>
                  <span style={{ fontWeight: "500" }}>
                    {record.postedBy.name}:
                  </span>
                  <span style={{ fontWeight: "350" }}> {record.text}</span>
                </h6>
              );
            })}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              commentPostHandler(item._id, e.target[0].value, key);
              e.target[0].value = "";
            }}
          >
            <InputGroup>
              <Input placeholder="Add comment" />
            </InputGroup>
          </form>
        </CardBody>
      </Card>
    </Col>
  );

  return (
    <Container style={{ marginTop: "40px" }}>
      <Row>
        {allPosts && window.location.pathname === "/" ? (
          allPosts.map((item, key) => renderItem(item, key))
        ) : (
          <div className="text-center p-5">
            <Spinner color="primary" />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Home;
