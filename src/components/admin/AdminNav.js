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
            <NavLink className="nav-link text-secondary active" aria-current="page" to="#">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-secondary" to="#">
              Orders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-secondary" to="#">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-secondary" to="#">
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-secondary" to="#">
              Reports
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-secondary" to="#">
              Integrations
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNav;
