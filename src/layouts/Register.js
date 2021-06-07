import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const RegisterLayout = ({ onRegister }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  let history = useHistory();
  const onSubmit = (data) => {
    if (data !== null) {
      const newData = {
        id: uuidv4(),
        role: "user",
        ...data,
      };
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      } else {
        Swal.fire("Welcome to WaMo!", "Register successfully!", "success").then(
          () => {
            onRegister(newData);
            history.push("/");
          }
        );
      }
    }
  };

  const checkPassword = (e) => {
    let password = document.getElementById("password").value;
    if (e.target.value !== password) setError("Confirm password is not valid!");
    else setError("");
  };

  return (
    <div className="container">
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
                <label htmlFor="inputUsername">Username</label>
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
                <label htmlFor="inputUsername">Email</label>
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
                    <label htmlFor="inputPassword">Password</label>
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
