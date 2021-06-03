import React from "react";
import { NavLink } from "react-router-dom";

const WebFooter = () => {
  return (
    <footer className="container-xl">
      <p className="float-end">
        <NavLink to="#">Back to top</NavLink>
      </p>
      <p>
        © 2021 Company, Inc. · <NavLink to="#">Privacy</NavLink> ·{" "}
        <NavLink to="#">Terms</NavLink>
      </p>
    </footer>
  );
};

export default WebFooter;
