import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";

const TitleHeader = styled.span`
  font-size: 35px;
  font-family: "Bungee Shade", cursive;
  color: white;
  margin-left: 20px;
`;

const AdminHeader = (props) => {
  let history = useHistory();
  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    props.setUser([]);
    history.push("/login");
  };

  const checkAuth = () => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      if (admin.role === "User") history.push("/");
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <header className="admin-header navbar navbar-dark sticky-top bg-dark bg-gradient flex-md-nowrap p-0 shadow">
      <NavLink
        className="admin-header-icon navbar-brand col-md-3 col-lg-2 me-0 px-3"
        to={"/admin"}
      >
        <img src="./../../logo.png" width={57} height={50} alt="" />
        <TitleHeader>WaMo</TitleHeader>
      </NavLink>
      <ul className="navbar-nav px-3">
        <li className="d-flex nav-item text-nowrap">
          {props.user && (
            <span className="admin-info">Hi, {props.user.firstName}</span>
          )}
          <button
            className="nav-link admin-header-btn-signout btn btn-info p-2"
            onClick={signout}
          >
            Sign out
          </button>
        </li>
      </ul>
    </header>
  );
};

export default AdminHeader;
