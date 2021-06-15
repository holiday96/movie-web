import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { axios } from "../axios";
import { sendEmailActive } from "../utils/email";
import env from "react-dotenv";

const RegisterLayout = (props) => {
  const { register, handleSubmit } = useForm();
  let history = useHistory();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Confirm password is not valid!",
      });
    } else {
        const newData = {
          id: uuidv4(),
          role: "User",
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          password: data.password,
          active: false,
          verify: uuidv4(),
        };
        props.onRegister(newData);
          sendEmailActive(
            newData.email,
            newData.firstName + " " + newData.lastName,
            `${env.LOCAL_HOST_WEB}/verify/${newData.verify}`
          );
        Swal.fire({
          title: "Welcome to WaMo!",
          text: "A verification email has been sent. Please verify your email to complete the registration process. Pay attention to check your spam folder if you don't see our email in the main mailbox.",
          icon: "success",
          backdrop: `
          rgba(0,0,123,0.4)
          url("https://i.gifer.com/origin/fd/fdf70f5f4989f9c08f033da50c38170e.gif")
          left top
          no-repeat
        `,
        }).then(() => history.push("/login"));
      }
  };

  const checkAuth = () => {
    props.getUser();
    if (props.user) {
      if (props.user.role === "Admin") history.push("/admin");
      else if (props.user.role === "User") history.push("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [props.user]);

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
                      {...register("confirmPassword")}
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
