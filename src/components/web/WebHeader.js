import React from "react";
import { Link, NavLink } from "react-router-dom";

const WebHeader = () => {
  return (
    <header className="p-3 bg-dark text-white">
      <div className="container-xxl">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <NavLink
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width={40}
              height={32}
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="../../images/logo.png" />
            </svg>
          </NavLink>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink to="#" className="nav-link px-2 text-secondary">
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="nav-link px-2 text-white">
                Thể loại
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="nav-link px-2 text-white">
                Quốc gia
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="nav-link px-2 text-white">
                Phim lẻ
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="nav-link px-2 text-white">
                Phim bộ
              </NavLink>
            </li>
          </ul>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          <div className="text-end">
            <Link type="button" to="/login" className="btn btn-outline-light me-2">
              Login
            </Link>
            <Link type="button" to="/register" className="btn btn-outline-light me-warning">
              Sign-up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WebHeader;
