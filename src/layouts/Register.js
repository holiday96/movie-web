import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import jwt from "jsonwebtoken";
import { axios } from "../axios";

const RegisterLayout = (props) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  let history = useHistory();

  const getUser = (data) => {
    axios
      .get(`/users?username=${data.username}&password=${data.password}`)
      .then((res) => {
        if (res.data) {
          const token = jwt.sign(res.data[0].id, "secret");
          localStorage.setItem("token", token);
          checkAuth();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    if (data !== null) {
      const newData = {
        id: uuidv4(),
        role: "User",
        ...data,
      };
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      } else {
        Swal.fire({
          title: "Welcome to WaMo!",
          text: "Register successfully!",
          icon: "success",
          timer: 5000,
          timerProgressBar: true,
          backdrop: `
          rgba(0,0,123,0.4)
          url("https://i.gifer.com/origin/fd/fdf70f5f4989f9c08f033da50c38170e.gif")
          left top
          no-repeat
        `,
        }).then(() => {
          props.onRegister(newData);
          axios.get(`/users?id=${newData.id}`).then((res) => {
            const token = jwt.sign(res.data[0].id, "secret");
            localStorage.setItem("token", token);
          });
          getUser(newData);
        });
      }
    }
  };

  const checkAuth = () => {
    props.getUser();
    if (props.user) {
      if (props.user.role === "Admin") history.push("/admin");
      else if (props.user.role === "User") history.push("/");
    }
  };

  const checkPassword = (e) => {
    let password = document.getElementById("password").value;
    if (e.target.value !== password) setError("Confirm password is not valid!");
    else setError("");
  };

  useEffect(() => {
    checkAuth();
  },[props.user])

  return (
    <div className="container-sign container-sign-up">
      <div className="hoverr"></div>
      <div className="card card-register mx-auto mt-5">
        <div className="card-header">Register an Account</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      placeholder="First name"
                      autoFocus="autofocus"
                      {...register("firstName", { required: true })}
                    />
                    <label htmlFor="firstName">First name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="lastName"
                      className="form-control"
                      placeholder="Last name"
                      {...register("lastName", { required: true })}
                    />
                    <label htmlFor="lastName">Last name</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-label-group">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-label-group">
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      placeholder="Confirm password"
                      required={true}
                      onChange={checkPassword}
                    />
                    <label htmlFor="confirmPassword">Confirm password</label>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>
          </form>
          <div className="text-center">
            <NavLink className="d-block small mt-3" to="/login">
              Login Page
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

export default RegisterLayout;
