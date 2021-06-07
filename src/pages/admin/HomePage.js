import React from "react";
import { Link, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const AdminHomePage = (props) => {
  let history = useHistory();

  function posterFormatter(cell, row, rowIndex) {
    return <img src={cell} width="80" alt={cell}></img>;
  }

  const onDelete = (row, rowIndex) => {
    props.onRemoveMovie(rowIndex.id);
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
    { dataField: "title", text: "Title", filter: textFilter() },
    { dataField: "episodes", text: "Episodes", filter: numberFilter() },
    { dataField: "runtime", text: "Runtime", filter: numberFilter() },
    { dataField: "actor", text: "Actor", filter: textFilter() },
    { dataField: "country", text: "Country", filter: textFilter() },
    { dataField: "genre", text: "Genre", filter: textFilter() },
    { dataField: "releases", text: "Releases", filter: numberFilter() },
    { dataField: "poster", text: "Poster", formatter: posterFormatter },
    { formatter: functionDelete },
  ];

  const rowEvents = {
    onDoubleClick: (row, rowIndex, e) => {
      history.push(`/admin/movie/${rowIndex.id}`);
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
        <h1 className="h2 text-primary">List of Movies</h1>
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
        <Link to={"/admin/movie/add"} className="btn btn-primary" type="submit">
          Add
        </Link>
      </div>
      <BootstrapTable
        keyField="id"
        data={props.movies}
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

export default AdminHomePage;
