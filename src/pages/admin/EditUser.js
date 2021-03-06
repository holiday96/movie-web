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
          <label htmlFor="role">Role</label>
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
              Ch??a nh???p vai tr??.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="firstName">Firstname</label>
          <input
            type="text"
            className="form-control"
            placeholder="Leave a firstName here"
            id="firstName"
            defaultValue={user.firstName}
            {...register("firstName", {required: false})}
          ></input>
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="lastName" className="form-label">
            Lastname
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="lastName"
            defaultValue={user.lastName}
            {...register("lastName")}
          />
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="username" className="form-label">
            Username
          </label>
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
              Ch??a nh???p t??n ????ng nh???p.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="email" className="form-label">
            Email
          </label>
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
              Ch??a nh???p Email.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="password" className="form-label">
            Password
          </label>
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
              Ch??a nh???p m???t kh???u.
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default EditUser;
