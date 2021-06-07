import React from "react";
import { NavLink } from "react-router-dom";
import WebSearchBar from "../web/WebSearchBar";

const AdminHeader = () => {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <NavLink
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
        to={"/admin"}
      >
        <img src="./../../logo.png" width={57} height={50} alt="" />
        <span className="mx-3">WaMo</span>
      </NavLink>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
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
