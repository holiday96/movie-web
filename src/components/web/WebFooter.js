import React from "react";
import { NavLink } from "react-router-dom";

const WebFooter = () => {
  return (
    <footer className="footer-48201">
      <div className="container">
        <div className="row">
          <div className="col-md-4 pr-md-5">
            <NavLink to={"#"} className="footer-site-logo d-block mb-4">
              WaMo
            </NavLink>
            <p>
              Feel free to watch TOP movies!!
            </p>
          </div>
          <div className="col-md">
            <ul className="list-unstyled nav-links">
              <li>
                <NavLink to={"#"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"#"}>About Us</NavLink>
              </li>
              <li>
                <NavLink to={"#"}>Portfolio</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md">
            <ul className="list-unstyled nav-links">
              <li>
                <NavLink to={"#"}>Clients</NavLink>
              </li>
              <li>
                <NavLink to={"#"}>Services</NavLink>
              </li>
              <li>
                <NavLink to={"#"}>Contact</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md">
            <ul className="list-unstyled nav-links">
              <li>
                <NavLink to={"#"}>Privacy Policy</NavLink>
              </li>
              <li>
                <NavLink to={"#"}>Terms &amp; Conditions</NavLink>
              </li>
              <li>
                <NavLink to={"#"}>Partners</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md text-md-center">
            <ul className="social list-unstyled">
              <li>
                <NavLink to={"#"}>
                  <span className="icon-instagram" />
                </NavLink>
              </li>
              <li>
                <NavLink to={"#"}>
                  <span className="icon-twitter" />
                </NavLink>
              </li>
              <li>
                <NavLink to={"#"}>
                  <span className="icon-facebook" />
                </NavLink>
              </li>
              <li>
                <NavLink to={"#"}>
                  <span className="icon-pinterest" />
                </NavLink>
              </li>
              <li>
                <NavLink to={"#"}>
                  <span className="icon-dribbble" />
                </NavLink>
              </li>
            </ul>
            <p className>
              <NavLink to={"#"} className="btn btn-tertiary">
                Contact Us
              </NavLink>
            </p>
          </div>
        </div>
        <div className="row ">
          <div className="col-12 text-center">
            <div className="copyright mt-5 pt-5">
              <p>
                <small>© 2021 All Rights Reserved.</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WebFooter;
