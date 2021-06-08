import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../assets/login/sb-admin.css";
import { axios } from "../axios";
import jwt from "jsonwebtoken";

const LoginLayout = (props) => {
  const { register, handleSubmit } = useForm();

  let history= useHistory();

  const getUser = (data) => {
    axios
      .get(`/users?username=${data.username}&password=${data.password}`)
      .then((res) => {
        if (res.data) {
          const token = jwt.sign(res.data[0], "secret", { expiresIn: 3600 });
          localStorage.setItem("token", token);
          checkAuth();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    getUser(data);
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const auth = jwt.decode(token);
    if (auth) {
      if (auth.role === "Admin") history.push("/admin");
      else if (auth.role === "User") history.push("/");
      console.log("user");
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="container">
      <div className="card card-login mx-auto mt-5">
        <div className="card-header">Login</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <input
                  type="text"
                  id="inputEmail"
                  className="form-control"
                  placeholder="Username"
                  autoFocus="autofocus"
                  {...register("username", { required: true })}
                />
                <label htmlFor="inputUsername">Username</label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <label htmlFor="inputPassword">Password</label>
              </div>
            </div>
            <div className="form-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" defaultValue="remember-me" /> Remember
                  Password
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <div className="text-center">
            <NavLink className="d-block small mt-3" to="/register">
              Register an Account
            </NavLink>
            <NavLink className="d-block small" to="/forgot-password">
              Forgot Password?
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
