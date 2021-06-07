import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const TitleHeader = styled.span`
  font-size: 35px;
  font-family: "Bungee Shade", cursive;
  color: white;
  margin-left: 20px;
`;

const AdminHeader = () => {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <NavLink
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
        to={"/admin"}
      >
        <img src="./../../logo.png" width={57} height={50} alt="" />
        <TitleHeader>WaMo</TitleHeader>
      </NavLink>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <NavLink className="nav-link" to="#">
            Sign out
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default AdminHeader;
