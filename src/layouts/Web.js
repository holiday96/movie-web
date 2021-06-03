import React from "react";
import "../assets/web/style.css";
import WebFooter from "../components/web/WebFooter";
import WebHeader from "../components/web/WebHeader";

const WebPageLayout = ({ children }) => {
  return (
    <div>
      <WebHeader />
      {children}
      <WebFooter />
    </div>
  );
};

export default WebPageLayout;
