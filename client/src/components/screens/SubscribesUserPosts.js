import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  InputGroup,
  Row,
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowingPosts,
  likePost,
  makeComment,
  unlikePost,
} from "../../redux/actions/postActions";

const SubscribesUserPosts = () => {
  const history = useHistory();
  const [allPosts, setAllPosts] = useState();
  const [loggedUserId, setLoggedUserId] = useState();

  const token = localStorage.getItem("jwt");

  let user = useSelector((state) => state.user);
  const { loading, loggedUserInfo, error } = user;

  let newPosts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (newPosts) {
      setAllPosts(newPosts.posts);
    }
  }, [newPosts]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.loggedUserInfo) {
      setLoggedUserId(loggedUserInfo.user._id);
    }
  }, [user]);

  const functionLikeWrapper = (type, key, postId) => {
    impresionHandler(type, key, postId);
    likedPostHandler(key);
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

  useEffect(async () => {
    dispatch(fetchFollowingPosts(token));
  }, []);

  const renderItem = (item, key) => (
    <Col sm="12" md="6" lg="4">
      <Card>
        <CardBody>
          <CardTitle>
            {/* <div className="card home-card" key={item._id}> */}
            <h5 className="card-user-names">
              <Link
                to={
                  item.postedBy._id !== loggedUserId
                    ? `/profile/${item.postedBy._id}`
                    : "/profile"
                }
              >
                {item.postedBy.name}
              </Link>
            </h5>
          </CardTitle>
        </CardBody>
        <div className="image-container">
          <img src={item.photo} alt="Cart image cap" />
        </div>
        <CardBody>
          <i className="material-icons" style={{ color: "red" }}>
            {loggedUserId && item.likes.includes(loggedUserId) ? (
              <i
                className="material-icons"
                onClick={() => {
                  functionLikeWrapper("unlike", key, item._id);
                }}
              >
                thumb_down
              </i>
            ) : (
              <i
                className="material-icons"
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
                  {/* <span style={{ fontWeight: "500" }}> */}
                  {record.postedBy.name}:{/* </span> */}
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
              <Input placeholder="add a comment" />
            </InputGroup>
          </form>
        </CardBody>
      </Card>
    </Col>
  );

  return (
    <Container style={{ marginTop: "40px" }}>
      <Row>
        {/* <div className="home"> */}
        {allPosts && loggedUserId ? (
          allPosts.map((item, key) => renderItem(item, key))
        ) : (
          <div className="text-center p-5">
            <Spinner color="primary" />
          </div>
        )}
        {/* </div> */}
      </Row>
    </Container>
  );
};

export default SubscribesUserPosts;
