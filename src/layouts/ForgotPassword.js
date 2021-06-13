import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axios } from "../axios";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { sendEmailReset } from "../utils/email";
import env from "react-dotenv";

const ForgotPasswordLayout = () => {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    getUser(data);
  };

  const getUser = (data) => {
    axios.get(`/users?email=${data.email}`).then((res) => {
      if (!res.data[0]) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hmmm..., something went wrong!",
          backdrop: `
          rgba(3, 86, 252,0.2)
          url("../peachcat-wait-2.gif")
          center top
          no-repeat
          `,
        });
      } else {
        const newData = {
          ...res.data[0],
          verify: uuidv4(),
        };
        sendEmailReset(
          newData.email,
          newData.firstName + " " + newData.lastName,
          `${env.LOCAL_HOST_WEB}/reset/${newData.verify}`
        );
        axios.put(`/users/${newData.id}`, newData).catch((e) => {
          console.log(e);
        });
        Swal.fire({
          title: "A verification email has been sent!",
          text: "Check the email to reset password account. Pay attention to check your spam folder if you don't see our email in the main mailbox.",
          icon: "success",
          backdrop: `
          rgba(0,0,123,0.4)
          url("../catzebra-ok.gif")
          center top
          no-repeat
        `,
        }).then(() => history.push("/"));
      }
    });
  };

  return (
    <div className="container-sign container-sign-forgot">
      <div className="hoverr"></div>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter email address"
                  autoFocus="autofocus"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <div id="errorEmail" className="form-text text-danger">
                    Chưa nhập email.
                  </div>
                )}
                <label htmlFor="email">Enter email address</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block" to="#">
              Reset Password
            </button>
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
