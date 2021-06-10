import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useHistory } from "react-router-dom";
import { axios } from "../../axios";
import Swal from "sweetalert2";

const EditUser = ({ onEditUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { id } = useParams();
  let history = useHistory();

  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(`users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => console.log(e));
  }, [id]);

  const onSubmit = (data) => {
    const newData = {
      id: id,
      ...data,
    };
    Swal.fire("Good job!", "User was updated!", "success").then(() => {
      onEditUser(newData);
      history.push("/admin/users");
    });
  };

  return (
    <div style={{height:1300}}>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 text-primary">Edit user</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link
              to={"/admin/users"}
              type="button"
              className="btn btn-sm btn-warning px-3 py-2"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          defaultValue={{ label: user.role, value: user.role }}
          className="form-select col-2 mb-3"
        >
          <option value={"User"}>User</option>
          <option value={"Admin"}>Admin</option>
        </select>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            placeholder="Leave a role here"
            id="role"
            defaultValue={user.role}
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
            defaultValue={user.firstName}
            {...register("firstName", {required: false})}
          ></input>
          <label htmlFor="firstName">Firstname</label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="lastName"
            defaultValue={user.lastName}
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
            defaultValue={user.username}
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
            defaultValue={user.email}
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
            defaultValue={user.password}
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

export default EditUser;
