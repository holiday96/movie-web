import React from "react";
import AdminHeader from "../components/admin/AdminHeader.js";
import AdminNav from "../components/admin/AdminNav.js";
import "../assets/admin/style.css"

const AdminPageLayout = (props) => {
  return (
    <div>
      <AdminHeader {...props}/>
      <div className="container-fluid admin-container">
        <div className="row">
          <AdminNav />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 admin-content">
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPageLayout;
