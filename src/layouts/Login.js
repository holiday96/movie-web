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
          if (res.data[0].active) {
            Swal.fire({
              title: `Hi ${res.data[0].firstName}!`,
              text: "Let's checkout some movie 😉",
              icon: "success",
              timer: 3000,
              timerProgressBar: true,
              backdrop: `
              rgba(3, 86, 252,0.2)
              url("../peachcat-go.gif")
              center top
              no-repeat
              `,
            }).then(() => {
              const token = jwt.sign(res.data[0].id, "secret");
              localStorage.setItem("token", token);
              checkAuth();
            });
          } else {
            Swal.fire({
              title: `Hi ${res.data[0].firstName}!`,
              text: "Please verify your email to activate this account!",
              icon: "warning",
              backdrop: `
              rgba(3, 86, 252,0.2)
              url("../peachcat-wait.gif")
              center top
              no-repeat
              `,
            });
          }
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
    props.getUser();
    if (props.user) {
      if (props.user.role === "Admin") {
        history.push("/admin");
        localStorage.setItem("admin", props.user);
      } else if (props.user.role === "User") history.push("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [props.user]);

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
