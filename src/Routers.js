import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPageLayout from "./layouts/Admin";
import ForgotPasswordLayout from "./layouts/ForgotPassword";
import LoginLayout from "./layouts/Login";
import RegisterLayout from "./layouts/Register";
import WebPageLayout from "./layouts/Web";
import WebHomePage from "./pages/web/HomePage";
import AdminHomePage from "./pages/admin/HomePage";
import AddMovie from "./pages/admin/AddMovie";
import EditMovie from "./pages/admin/EditMovie";
import UsersPage from "./pages/admin/UsersPage";
// import AccountContainer from "./components/login/accountBox/AccountContainer";


const Routers = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin">
          <AdminPageLayout>
            <Switch>
              <Route path="/admin/movie/add">
                <AddMovie {...props} />
              </Route>
              <Route path="/admin/movie/:id">
                <EditMovie {...props} />
              </Route>
              <Route path={["/admin/users"]}>
                <UsersPage {...props} />
              </Route>
              <Route path={["/admin", "/admin/movie"]}>
                <AdminHomePage {...props} />
              </Route>
            </Switch>
          </AdminPageLayout>
        </Route>
        <Route path="/login">
          <LoginLayout {...props} />
        </Route>
        <Route path="/register">
          <RegisterLayout {...props} />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordLayout {...props} />
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
