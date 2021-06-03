import React from "react";
import { Link } from "react-router-dom";

const AdminHomePage = (props) => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2 text-primary">List of Movies</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-sm">
          <thead className="table-dark">
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
              <tr key={index} className="table-light">
                <th>{index + 1}</th>
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>{movie.content}</td>
                <td>{movie.episodes}</td>
                <td>{movie.runtime} phút</td>
                <td>{movie.actor}</td>
                <td>{movie.country}</td>
                <td>{movie.genre}</td>
                <td>{movie.releases}</td>
                <td>
                  <img src={movie.poster} width="80" alt={movie.poster} />
                </td>
                <td>
                  <Link to={"#"} className="flex btn btn-sm btn-primary">Edit</Link>
                  <Link to={"#"} className="flex btn btn-sm btn-danger">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminHomePage;
