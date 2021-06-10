import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";

const WebNav = (props) => {
  let history = useHistory();

  const menuToggleGenre = () => {
    const toggleMenu = document.querySelector(".model-menu-genre");
    toggleMenu.classList.add("active");
  };
  const menuToggleGenreOut = () => {
    const toggleMenu = document.querySelector(".model-menu-genre");
    toggleMenu.classList.remove("active");
  };
  const menuToggleCountry = () => {
    const toggleMenu = document.querySelector(".model-menu-country");
    toggleMenu.classList.add("active");
  };
  const menuToggleCountryOut = () => {
    const toggleMenu = document.querySelector(".model-menu-country");
    toggleMenu.classList.remove("active");
  };

  const onMoveGenre = (item) => {
    history.push(`/genre/${item}`);
    window.location.reload();
  };
  const onMoveCountry = (item) => {
    history.push(`/country/${item}`);
    window.location.reload();
  };

  return (
    <ul className="nav justify-content-center" style={{ marginTop: 75 }}>
      <li>
        <NavLink
          to={`/`}
          className="nav-link nav-web px-2 mx-3 text-white"
        >
          Trang chủ
        </NavLink>
      </li>
      <li className="position-relative">
        <NavLink
          to="#"
          onMouseOver={menuToggleGenre}
          className="nav-link nav-web px-2 mx-3 text-white"
        >
          Thể loại
        </NavLink>
        <div className="model-menu-genre" onMouseLeave={menuToggleGenreOut}>
          <ul>
            {props.genres.map((item, index) => (
              <li key={index}>
                <Link to={`/genre/${item}`} onClick={() => onMoveGenre(item)}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li className="position-relative">
        <NavLink
          to="#"
          onMouseOver={menuToggleCountry}
          className="nav-link nav-web px-2 mx-3 text-white"
        >
          Quốc gia
        </NavLink>
        <div className="model-menu-country" onMouseLeave={menuToggleCountryOut}>
          <ul>
            {props.countries.map((item, index) => (
              <li key={index}>
                <Link
                  to={`/country/${item}`}
                  onClick={() => onMoveCountry(item)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li>
        <NavLink to="#" className="nav-link nav-web px-2 mx-3 text-white">
          Phim lẻ
        </NavLink>
      </li>
      <li>
        <NavLink to="#" className="nav-link nav-web px-2 mx-3 text-white">
          Phim bộ
        </NavLink>
      </li>
    </ul>
  );
};

export default WebNav;
