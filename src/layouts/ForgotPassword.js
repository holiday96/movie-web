import React from "react";
import { NavLink } from "react-router-dom";

const ForgotPasswordLayout = () => {
  return (
    <div className="container">
      <div className="card card-login mx-auto mt-5">
        <div className="card-header">Reset Password</div>
        <div className="card-body">
          <div className="text-center mb-4">
            <h4>Forgot your password?</h4>
            <p>
              Enter your email address and we will send you instructions on how
              to reset your password.
            </p>
          </div>
          <form>
            <div className="form-group">
              <div className="form-label-group">
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  placeholder="Enter email address"
                  required="required"
                  autoFocus="autofocus"
                />
                <label htmlFor="inputEmail">Enter email address</label>
              </div>
            </div>
            <NavLink className="btn btn-primary btn-block" to="/login">
              Reset Password
            </NavLink>
          </form>
          <div className="text-center">
            <NavLink className="d-block small mt-3" to="/register">
              Register an Account
            </NavLink>
            <NavLink className="d-block small" to="/login">
              Login Page
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordLayout;
