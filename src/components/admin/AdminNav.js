import React from "react";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link text-secondary" to={'/admin/movie'}>
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-secondary" to={'/admin/users'}>
              Users
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNav;
