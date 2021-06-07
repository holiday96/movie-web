import React from "react";
import { Link, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
} from "react-bootstrap-table2-filter";

const UsersPage = (props) => {
  let history = useHistory();

  const columns = [
    { dataField: "id", text: "ID" },
    { dataField: "role", text: "Role", filter: textFilter() },
    { dataField: "username", text: "Username", filter: textFilter() },
    { dataField: "email", text: "Email", filter: textFilter() },
    { dataField: "password", text: "Password" },
    { dataField: "firstName", text: "Firstname", filter: textFilter() },
    { dataField: "lastName", text: "Lastname", filter: textFilter() },
    {},
  ];

  const rowEvents = {
    onDoubleClick: (row, rowIndex, e) => {
      history.push(`/admin/users/${rowIndex.id}`);
    },
  };

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    bgColor: "#c8e6c9",
    headerColumnStyle: (status) => {
      if (status === "checked") {
        return {
          backgroundColor: "red",
        };
      } else if (status === "indeterminate") {
        return {
          backgroundColor: "yellow",
        };
      } else if (status === "unchecked") {
        return {
          backgroundColor: "white",
        };
      }
    },
  };

  const expandRow = {
    showExpandColumn: true,
    renderer: (row) => (
      <div>
        <p>
          <b>Content: </b>
          {row.content}
        </p>
      </div>
    ),
  };

  const onSubmit = (data) => {};

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2 text-primary">List of Users</h1>
      </div>
      <div className="function d-flex">
        <select className="form-select">
          <option defaultValue>-- Hành động --</option>
          <option value={1}>Xoá</option>
        </select>

        <button
          id="btnDeleteAll"
          onClick={onSubmit}
          className="btn btn-danger"
          type="submit"
          disabled
        >
          Delete
        </button>
        <Link to={"/admin/movie/add"} className="btn btn-primary" type="submit">
          Add
        </Link>
      </div>
      {/* <div className="table-responsive">
          <table className="table table-striped table-hover table-sm">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Episodes</th>
                <th>Runtime</th>
                <th>Actors</th>
                <th>Country</th>
                <th>Genre</th>
                <th>Release</th>
                <th>Poster</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {props.movies.map((movie, index) => (
                <tr key={index} className="table-light text-center">
                  <td>
                    <input
                      className=""
                      name="movieIds[]"
                      type="checkbox"
                      defaultValue
                      id={movie.id}
                    />
                  </td>
                  <td>{movie.id}</td>
                  <td>{movie.title}</td>
                  <td className="text-start">{movie.content}</td>
                  <td>{movie.episodes}</td>
                  <td>{movie.runtime} min</td>
                  <td>{movie.actor}</td>
                  <td>{movie.country}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.releases}</td>
                  <td>
                    <img src={movie.poster} width="80" alt={movie.poster} />
                  </td>
                  <td className="d-flex">
                    <Link to={`/admin/movie/${movie.id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>
                    <button onClick={() => props.onRemoveMovie(movie.id)}className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      <BootstrapTable
        keyField="id"
        data={props.users}
        columns={columns}
        headerWrapperClasses="foo"
        pagination={paginationFactory()}
        filter={filterFactory()}
        filterPosition="top"
        striped
        hover
        condensed
        noDataIndication="Empty Movies"
        selectRow={selectRow}
        expandRow={expandRow}
        rowEvents={rowEvents}
      />
    </div>
  );
};

export default UsersPage;
