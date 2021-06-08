import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import WebSearchBar from "./WebSearchBar";
import WebNav from "./WebNav";
import styled from "styled-components";
import jwt from "jsonwebtoken";
import UserAccountMenu from "../UserAccountMenu";

const WebHeaderContainer = styled.div`
  background-color: black;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const TitleHeader = styled.span`
  font-size: 35px;
  font-family: "Bungee Shade", cursive;
  color: white;
  margin-left: 20px;
`;

const WebHeader = () => {
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const auth = jwt.decode(token);
    if (auth) {
      console.log(true);
      return true;
    }
    return false;
  };

  return (
    <WebHeaderContainer>
      <header className="d-relative p-3 bg-gradient text-white">
        <div className="">
          <div className="d-flex position-relative mb-3 align-items-center justify-content-end">
            <NavLink to="/" className="mr-5">
              <img
                id="imagee"
                src="../../logo.png"
                width={57}
                height={50}
                alt=""
              />
              <TitleHeader>WaMo</TitleHeader>
            </NavLink>
            {!checkAuth() && (
              <div className="ms-auto">
                <Link
                  type="button"
                  to="/login"
                  className="btn btn-outline-light mr-2"
                >
                  Login
                </Link>
                <Link
                  type="button"
                  to="/register"
                  className="btn btn-outline-light"
                >
                  Sign-up
                </Link>
              </div>
            )}
            {checkAuth() && <UserAccountMenu />}
          </div>
          <WebNav />
        </div>
        <WebSearchBar />
      </header>
    </WebHeaderContainer>
  );
};

export default WebHeader;