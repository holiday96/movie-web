import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

const UsersPage = (props) => {
  let history = useHistory();

  const onDelete = (row, rowIndex) => {
    props.onRemoveUser(rowIndex.id);
  };

  function functionDelete(row, rowIndex) {
    return (
      <button
        onClick={() => onDelete(row, rowIndex)}
        className="btn btn-danger"
      >
        Delete
      </button>
    );
  }

  const columns = [
    { dataField: "id", text: "ID" },
    { dataField: "role", text: "Role", filter: textFilter() },
    { dataField: "username", text: "Username", filter: textFilter() },
    { dataField: "email", text: "Email", filter: textFilter() },
    { dataField: "password", text: "Password" },
    { dataField: "firstName", text: "Firstname", filter: textFilter() },
    { dataField: "lastName", text: "Lastname", filter: textFilter() },
    { formatter: functionDelete },
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

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2 text-primary">List of Users</h1>
      </div>
      <div className="function d-flex mb-4">
        <select className="form-select col-2 me-auto">
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
        <Link to={"/admin/users/add"} className="btn btn-primary" type="submit">
          Add
        </Link>
      </div>
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
        noDataIndication="Empty Users"
        selectRow={selectRow}
        expandRow={expandRow}
        rowEvents={rowEvents}
      />
    </div>
  );
};

export default UsersPage;
