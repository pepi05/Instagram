import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/userActions";

import { Col, Container, Input, Row } from "reactstrap";

const Signup = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  console.log("image", image);

  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  // console.log("PICCC", user.profilePicture.data.secure_url);

  const registerUser = async () => {
    let data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "devm0uxsj");
    dispatch(register(name, email, password, data));
    history.push("/signin");
  };

  return (
    <Container className="form-container">
      <Row className="justify-content-md-center card">
        <Col md="auto">
          <div className="mycard">
            <h2 style={{ margin: "15px 0 15px 0" }}>Instagram</h2>
            <Input
              className="input-field"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className="input-field"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="input-field"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="file-field input-field">
              <span className="upload-button ">Upload pic</span>
              <Input
                className="input-field"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="signin-button">
              <button
                className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() => registerUser()}
              >
                SignUp
              </button>
            </div>

            <h5>
              <Link to="/signin">Already have an account ?</Link>
            </h5>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
