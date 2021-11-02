import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/actions/userActions";
import { Container, Row, Col, Input } from "reactstrap";

const Signin = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);
  console.log("logged user", user);
  const postData = async () => {
    await dispatch(signin(email, password));
    history.push("/");
  };

  return (
    <Container className="form-container">
      <Row className="justify-content-md-center card">
        <Col md="auto">
          <div className="mycard">
            {/* <div className="input-field"> */}
            <h2 style={{ margin: "15px 0 15px 0" }}>Instagram</h2>
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="signin-button">
              <button
                className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() => postData()}
              >
                Login
              </button>
            </div>
            <h5>
              <Link to="/signup">Don't have an account ?</Link>
            </h5>
          </div>
          {/* </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
