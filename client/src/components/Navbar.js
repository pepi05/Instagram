import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { userLogout } from "../redux/actions/userActions";

const navItems = [
  { link: "/profile", title: "Profile" },
  { link: "/create", title: "Create" },
  { link: "/myfollowingposts", title: "My Follwing Posts" },
];
const notLoggedNavItems = [
  {
    link: "signin",
    title: "Signin",
  },
  {
    link: "signup",
    title: "Signup",
  },
];

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const { loading, loggedUserInfo } = user;
  const [loggedUser, setLoggedUser] = useState();
  console.log("INFO", user);

  useEffect(() => {
    if (loggedUserInfo) {
      setLoggedUser(loggedUserInfo);
    }
  }, [loggedUserInfo]);

  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(0);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const renderNavItems = (arrayOfItems) => {
    let localNavlinkArray = [];
    arrayOfItems.map((item, key) => {
      return localNavlinkArray.push(
        <NavItem className="navitems">
          <NavLink
            to={item.link}
            onClick={() => setActiveLink(key)}
            className={`nav-link-style ${activeLink === key ? "active" : ""}`}
          >
            {item.title}
          </NavLink>
        </NavItem>
      );
    });
    return localNavlinkArray;
  };

  const renderList = () => {
    if (loggedUser) {
      return (
        <React.Fragment>
          {renderNavItems(navItems)}
          {/* <button></button> */}
        </React.Fragment>
      );
    }
    if (!loggedUser) {
      return (
        <React.Fragment>{renderNavItems(notLoggedNavItems)}</React.Fragment>
      );
    }
  };
  return (
    <div>
      <Navbar expand="sm" className="navbar-container">
        <NavbarBrand>
          <div>
            <h2
              style={{ marginLeft: "10px" }}
              onClick={() => {
                if (loggedUser) {
                  history.push("/");
                } else {
                  history.push("/signin");
                }
              }}
            >
              Instagram{" "}
            </h2>
          </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="custom-nav">
          <Nav navbar>{renderList()}</Nav>
          <div className="logout-button">
            {loggedUser ? (
              <Button
                color="secondary"
                onClick={async () => {
                  await dispatch(userLogout(localStorage));
                  await setLoggedUser(null);

                  history.push("/signin");
                }}
              >
                LOGOUT
              </Button>
            ) : (
              ""
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
