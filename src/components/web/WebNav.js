import React from "react";
import { Link, NavLink } from "react-router-dom";

const WebNav = (props) => {
  const menuToggleGenre = () => {
    const toggleMenu = document.querySelector(".model-menu-genre");
    toggleMenu.classList.toggle("active");
  };
  const menuToggleGenreOut = () => {
    const toggleMenu = document.querySelector(".model-menu-genre");
    toggleMenu.classList.toggle("active");
  };
  const menuToggleCountry = () => {
    const toggleMenu = document.querySelector(".model-menu-country");
    toggleMenu.classList.toggle("active");
  };
  const menuToggleCountryOut = () => {
    const toggleMenu = document.querySelector(".model-menu-country");
    toggleMenu.classList.toggle("active");
  };

  const click = () => {
    console.log(props.genre);
  }

  return (
    <ul className="nav justify-content-center navbar" style={{ marginTop: 75 }}>
      <li>
        <NavLink to="#" onClick={click} className="nav-link px-2 text-white">
          Trang chủ
        </NavLink>
      </li>
      <li className="position-relative">
        <NavLink
          to="#"
          onMouseOver={menuToggleGenre}
          onMouseOut={menuToggleGenreOut}
          className="nav-link px-2 text-white"
        >
          Thể loại
        </NavLink>
        <div className="model-menu-genre">
          <ul>
            <li>
              <Link to="#">My Profile</Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="position-relative">
        <NavLink
          to="#"
          onMouseOver={menuToggleCountry}
          onMouseOut={menuToggleCountryOut}
          className="nav-link px-2 text-white"
        >
          Quốc gia
        </NavLink>
        <div className="model-menu-country">
          <ul>
            <li>
              <Link to="#">My Profile</Link>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <NavLink to="#" className="nav-link px-2 text-white">
          Phim lẻ
        </NavLink>
      </li>
      <li>
        <NavLink to="#" className="nav-link px-2 text-white">
          Phim bộ
        </NavLink>
      </li>
    </ul>
  );
};

export default WebNav;
