import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPageLayout from "./layouts/Admin";
import ForgotPasswordLayout from "./layouts/ForgotPassword";
import LoginLayout from "./layouts/Login";
import RegisterLayout from "./layouts/Register";
import WebPageLayout from "./layouts/Web";
import WebHomePage from "./pages/web/HomePage";
import AdminHomePage from "./pages/admin/HomePage";

const Routers = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin">
          <AdminPageLayout>
            <Switch>
              <Route path="/admin">
                <AdminHomePage {...props}/>
              </Route>
            </Switch>
          </AdminPageLayout>
        </Route>
        <Route path="/login">
          <LoginLayout />
        </Route>
        <Route path="/register">
          <RegisterLayout />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordLayout />
        </Route>

        <Route path="/">
          <WebPageLayout>
            <Switch>
              <Route path="/">
                <WebHomePage {...props} />
              </Route>
            </Switch>
          </WebPageLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routers;
