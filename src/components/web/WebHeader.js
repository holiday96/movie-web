import React from "react";
import { Link, NavLink } from "react-router-dom";
import WebSearchBar from "./WebSearchBar";
import WebNav from "./WebNav";

const WebHeader = () => {
  return (
    <header className="p-3 bg-dark bg-gradient text-white">
      <div className="container">
        <div className="d-flex position-relative mb-3 align-items-center justify-content-end">
          <NavLink to="/" className="mr-5">
            <img
              id="imagee"
              src="../../logo.png"
              width={57}
              height={50}
              alt=""
            />
          </NavLink>
          <div className="ms-auto">
            <Link
              type="button"
              to="/login"
              className="btn btn-outline-light me-2"
            >
              Login
            </Link>
            <Link
              type="button"
              to="/register"
              className="btn btn-outline-light me-warning"
            >
              Sign-up
            </Link>
          </div>
        </div>
        <WebNav />
      </div>
      <WebSearchBar />
    </header>
  );
};

export default WebHeader;
