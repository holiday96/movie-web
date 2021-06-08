import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const AddUser = ({ onAddUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let history = useHistory();
  const onSubmit = (data) => {
    if (data !== null) {
      const newData = {
        id: uuidv4(),
        ...data,
      };
      Swal.fire("Good job!", "Welcome new member!", "success").then(() => {
        onAddUser(newData);
        history.push("/admin/user");
      });
    }
  };

  return (
    <div>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2 text-primary">Add new user</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <Link
              to={"/admin/users"}
              type="button"
              class="btn btn-sm btn-warning"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            placeholder="Leave a role here"
            id="role"
            {...register("role", { required: true })}
          />
          {errors.role && (
            <div id="errorRole" className="form-text text-danger">
              Chưa nhập vai trò.
            </div>
          )}
          <label htmlFor="role">Role</label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            placeholder="Leave a firstName here"
            id="firstName"
            {...register("firstName")}
          ></input>
          <label htmlFor="firstName">Firstname</label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="lastName"
            {...register("lastName")}
          />
          <label htmlFor="lastName" className="form-label">
            Lastname
          </label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="username"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <div id="errorUsername" className="form-text text-danger">
              Chưa nhập tên đăng nhập.
            </div>
          )}
          <label htmlFor="username" className="form-label">
            Username
          </label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <div id="errorEmail" className="form-text text-danger">
              Chưa nhập Email.
            </div>
          )}
          <label htmlFor="email" className="form-label">
            Email
          </label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div id="errorPassword" className="form-text text-danger">
              Chưa nhập mật khẩu.
            </div>
          )}
          <label htmlFor="password" className="form-label">
            Password
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default AddUser;
