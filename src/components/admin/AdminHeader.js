import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import jwt from "jsonwebtoken";

const TitleHeader = styled.span`
  font-size: 35px;
  font-family: "Bungee Shade", cursive;
  color: white;
  margin-left: 20px;
`;

const AdminHeader = () => {
  let history = useHistory();
  const signout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const token = localStorage.getItem("token");
  const auth = jwt.decode(token);
  const checkAuth = () => {
    if (!auth) {
      history.push("/login");
    } else if (auth.role !== "Admin") {
      history.push("/");
    }
  };

  useEffect(() => {
    checkAuth();
  });

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
          {auth && <span className="admin-info">Hi, {auth.firstName}</span>}
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
