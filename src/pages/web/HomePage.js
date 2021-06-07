import React from "react";
import { NavLink } from "react-router-dom";

const WebHomePage = (props) => {

  return (
    <div className="album py-5 bg-secondary bg-gradient">
      <div className="container-xl">
        <div className="d-flex flex-row">
          {props.movies.map((movie, index) => (
            <div key={index} className="item mx-3" style={{ width: 180 }}>
              <NavLink to={"#"} className="rounded">
                <img
                  src={movie.poster}
                  className="rounded"
                  width="180"
                  height="276"
                  alt=""
                />
              </NavLink>
              <NavLink
                key={index}
                to={"#"}
                className="d-flex text-warning justify-content-center p-2 fs-5"
              >
                {movie.title}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebHomePage;
