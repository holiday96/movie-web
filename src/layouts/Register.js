import React from "react";
import { NavLink } from "react-router-dom";

const RegisterLayout = () => {
  return (
    <div className="container">
      <div className="card card-register mx-auto mt-5">
        <div className="card-header">Register an Account</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      placeholder="First name"
                      required="required"
                      autofocus="autofocus"
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
                      required="required"
                    />
                    <label htmlFor="lastName">Last name</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <input
                  type="email"
                  id="username"
                  className="form-control"
                  placeholder="Username"
                  required="required"
                />
                <label htmlFor="inputUsername">Email address</label>
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
                      required="required"
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
                      required="required"
                    />
                    <label htmlFor="confirmPassword">Confirm password</label>
                  </div>
                </div>
              </div>
            </div>
            <NavLink className="btn btn-primary btn-block" to="/login">
              Register
            </NavLink>
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
