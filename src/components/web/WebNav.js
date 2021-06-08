import React from "react";
import { NavLink } from "react-router-dom";

const WebNav = () => {
  return (
    <ul className="nav justify-content-center navbar" style={{marginTop: 75}} >
      <li>
        <NavLink to="#" className="nav-link px-2 text-white">
          Trang chủ
        </NavLink>
      </li>
      <li>
        <NavLink to="#" className="nav-link px-2 text-white">
          Thể loại
        </NavLink>
      </li>
      <li>
        <NavLink to="#" className="nav-link px-2 text-white">
          Quốc gia
        </NavLink>
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
