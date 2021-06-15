import React from "react";
import { Link, useHistory } from "react-router-dom";

const UserAccountMenu = (props) => {
  let history = useHistory();

  const signout = () => {
    localStorage.removeItem("token");
    props.setUser([]);
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
      <span>
        Hi, {props.user.lastName} {props.user.firstName}
      </span>
      <div className="profile" onMouseOver={menuToggle}>
        <img src="../avatar.jpg" alt="" />
      </div>
      <div className="menu" onMouseLeave={menuToggleLeave}>
        <h3>
          {props.user.lastName + " " + props.user.firstName}
          <br />
          <span>{props.user.role}</span>
        </h3>
        <ul>
          <li>
            <img src="../user.png" alt="" />
            <Link onClick={props.openProfile} to="#">
              My Profile
            </Link>
          </li>
          <li>
            <img src="../edit.png" alt="" />
            <Link to={"/favorites"}>My Favorites</Link>
          </li>
          <li>
            <img src="../key.png" alt="" />
            <Link onClick={props.openChangePassword} to={"#"}>Change Password</Link>
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
