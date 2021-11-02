import React, { useEffect } from "react";
import "./Custom.css";
import NavBar from "./components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/SignIn";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from "./components/screens/UserProfile";
import SubscribesUserPosts from "./components/screens/SubscribesUserPosts";
import { useDispatch } from "react-redux";
import { fetchLoggedUser } from "./redux/actions/userActions";

const Routing = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const userJWT = localStorage.getItem("jwt");

    if (user) {
      dispatch(fetchLoggedUser(user.user._id, userJWT));
    } else {
      history.push("/signin");
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/create">
        <CreatePost />
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingposts">
        <SubscribesUserPosts />
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
