import React from "react";
import "../assets/admin/dashboard.css";
import "../assets/admin/bootstrap.min.css";
import AdminHeader from "../components/admin/AdminHeader.js";
import AdminNav from "../components/admin/AdminNav.js";

const AdminPageLayout = ({ children }) => {
  return (
    <div>
      <AdminHeader />
      <div className="container-fluid">
        <div className="row">
          <AdminNav />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPageLayout;
