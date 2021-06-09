import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { axios } from "../../axios";

const WebNav = (props) => {
  const [genres, setGenres] = useState([]);

  const getGenres = async () => {
    const response = await axios.get("/movies").catch((e) => console.log(e));
    if (response && response.data) {
      const gen = response.data;
      gen.map((item, index) => {
        if (!genres.includes(item.genre)) {
          setGenres((genres) => [...genres, item.genre]);
        }
      });
      // setGenres(
      //   genres.filter((value, index, self) => self.indexOf(value) === index)
      // );
    }
  };
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

  const click = () => {
    console.log(genres);
  };
  useEffect(() => {
    getGenres();
  }, [genres]);

  return (
    <ul className="nav justify-content-center navbar" style={{ marginTop: 75 }}>
      <li>
        <NavLink to="#" onClick={click} className="nav-link px-2 mx-3 text-white">
          Trang chủ
        </NavLink>
      </li>
      <li className="position-relative">
        <NavLink
          to="#"
          onMouseOver={menuToggleGenre}
          className="nav-link px-2 mx-3 text-white"
        >
          Thể loại
        </NavLink>
        <div className="model-menu-genre" onMouseLeave={menuToggleGenreOut}>
          <ul>
            {genres.map((item) => (
              <li>
                <Link to={`/${item}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li className="position-relative">
        <NavLink
          to="#"
          onMouseOver={menuToggleCountry}
          className="nav-link px-2 mx-3 text-white"
        >
          Quốc gia
        </NavLink>
        <div className="model-menu-country" onMouseLeave={menuToggleCountryOut}>
          <ul>
            <li>
              <Link to="#">My Profile</Link>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <NavLink to="#" className="nav-link px-2 mx-3 text-white">
          Phim lẻ
        </NavLink>
      </li>
      <li>
        <NavLink to="#" className="nav-link px-2 mx-3 text-white">
          Phim bộ
        </NavLink>
      </li>
    </ul>
  );
};

export default WebNav;
