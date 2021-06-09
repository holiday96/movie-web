import React from "react";
import { Link, useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";

const UserAccountMenu = () => {
  const token = localStorage.getItem("token");
  const auth = jwt.decode(token);
  let history = useHistory();

  const signout = () => {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  const menuToggle = () => {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.add("active");
  };

  const menuToggleLeave = () => {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.remove("active");
  };

  return (
    <div className="action">
      <span>Hi, {auth.firstName}</span>
      <div className="profile" onMouseOver={menuToggle}>
        <img src="../avatar.jpg" alt="" />
      </div>
      <div className="menu" onMouseLeave={menuToggleLeave}>
        <h3>
          {auth.lastName + " " + auth.firstName}
          <br />
          <span>{auth.role}</span>
        </h3>
        <ul>
          <li>
            <img src="../user.png" alt="" />
            <Link to="#">My Profile</Link>
          </li>
          <li>
            <img src="../edit.png" alt="" />
            <Link to="#">Edit Profile</Link>
          </li>
          <li>
            <img src="../log-out.png" alt="" />
            <Link to="#" onClick={signout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserAccountMenu;
