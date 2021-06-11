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
import Detail from "./pages/web/Detail";
import EditUser from "./pages/admin/EditUser";
import AddUser from "./pages/admin/AddUser";
import FilterGenre from "./pages/web/FilterGenre";
import FilterCountry from "./pages/web/FilterCountry";
import FavorUser from "./pages/web/FavorUser";

const Routers = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin">
          <AdminPageLayout {...props}>
            <Switch>
              {/* movies */}
              <Route path="/admin/movie/add">
                <AddMovie {...props} />
              </Route>
              <Route path="/admin/movie/:id">
                <EditMovie {...props} />
              </Route>
              {/* users */}
              <Route path="/admin/users/add">
                <AddUser {...props} />
              </Route>
              <Route path={["/admin/users/:id"]}>
                <EditUser {...props} />
              </Route>
              <Route path={["/admin/users"]}>
                <UsersPage {...props} />
              </Route>
              {/* admin home */}
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
          <WebPageLayout {...props}>
            <Switch>
              <Route path="/genre/:key">
                <FilterGenre {...props} />
              </Route>
              <Route path="/country/:key">
                <FilterCountry {...props} />
              </Route>
              <Route path="/favorites">
                <FavorUser {...props} />
              </Route>
              <Route path="/:id">
                <Detail {...props} />
              </Route>
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
