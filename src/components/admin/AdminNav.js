import React from "react";
import { NavLink } from "react-router-dom";
import { BiMovie } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const AdminNav = () => {
  return (
    <nav
      id="sidebarMenu"
      className="admin-nav col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="admin-nav-inner pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link text-secondary" to={"/admin/movie"}>
              <BiMovie /> Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-secondary" to={"/admin/users"}>
              <FaUsers /> Users
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNav;
