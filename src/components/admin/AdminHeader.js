import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

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
    <header className="admin-header d-flex justify-content-end navbar navbar-dark sticky-top bg-dark bg-gradient flex-md-nowrap p-0 shadow">
      <ul className="navbar-nav px-3 my-2 nav-avatar">
        <li className="d-flex nav-item text-nowrap">
          {props.user && (
            <span className="admin-info">Hi, {props.user.firstName}</span>
          )}
          <button
            className="nav-link admin-header-btn-signout p-2"
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
