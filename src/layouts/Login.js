import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../assets/login/sb-admin.css";
import { axios } from "../axios";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";

const LoginLayout = (props) => {
  const { register, handleSubmit } = useForm();

  let history = useHistory();

  const getUser = (data) => {
    axios
      .get(`/users?username=${data.username}&password=${data.password}`)
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: `Hi ${res.data[0].firstName}!`,
            text: "Let's checkout some movie 😉",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            const token = jwt.sign(res.data[0], "secret");
            localStorage.setItem("token", token);
            checkAuth();
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hmmm..., something went wrong!",
        });
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
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="container-sign container-sign-in">
      <div className="hoverr"></div>
      <div className="card card-login mx-auto mt-5">
        <div className="card-header">Login</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Username"
                  autoFocus="autofocus"
                  {...register("username", { required: true })}
                />
                <label htmlFor="username">Username</label>
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
