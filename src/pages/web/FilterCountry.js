import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { axios } from "../../axios";
import { motion } from "framer-motion";

const FilterContainer = styled.div`
  margin-top: 147px;
  padding-top: 40px;
  background-color: #111;
  color: white;
  padding-bottom: 50px;
`;

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const FilterCountry = () => {
  const [filter, setFilter] = useState([]);
  const [movie, setMovie] = useState([]);
  let { key } = useParams();

  useEffect(() => {
    axios
      .get(`/movies?country=${key}`)
      .then((res) => {
        setFilter(res.data);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getRandom = Math.floor(Math.random() * filter.length);
    setMovie(filter[getRandom]);
  }, [filter]);

  return (
    <FilterContainer>
      <div className="container">
        {movie && (
          <div className="container-suggest">
            <p className="recommend-text">Recommend Film</p>
            <div className="top-content iframe-container">
              <iframe
                width="100%"
                height="100%"
                src={movie.trailer}
                title="YouTube video player"
                frameborder="0"
                allow="fullscreen;"
              ></iframe>
            </div>
            <div className="d-flex bottom-content mt-5">
              <div className="d-flex left-info col">
                <div className="poster mr-3">
                  <img src={movie.poster} alt="" />
                </div>
                <div className="info">
                  <h4>{movie.title}</h4>
                  <span>Content</span>
                  <p>{movie.content}</p>
                </div>
              </div>
              <div className="right-info col-3">
                <table>
                  <tbody>
                    <tr>
                      <td className="table-head">Episodes</td>
                      <td className="table-value">{movie.episodes} ep</td>
                    </tr>
                    <tr>
                      <td className="table-head">Runtime</td>
                      <td className="table-value">{movie.runtime} min</td>
                    </tr>
                    <tr>
                      <td className="table-head">Actors</td>
                      <td className="table-value">{movie.actor}</td>
                    </tr>
                    <tr>
                      <td className="table-head">Country</td>
                      <td className="table-value">{movie.country}</td>
                    </tr>
                    <tr>
                      <td className="table-head">Genre</td>
                      <td className="table-value">{movie.genre}</td>
                    </tr>
                    <tr>
                      <td className="table-head">Releases</td>
                      <td className="table-value">{movie.releases}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        <div className="container-filter mt-5">
          <p className="suggest-text">Danh sách phim {movie.country}</p>
          <motion.ul
            variants={container}
            initial="hidden"
            animate="visible"
            className="d-flex flex-wrap justify-content-center"
          >
            {filter.map((movie, index) => (
              <motion.li
                variants={item}
                key={index}
                className="film-item item mx-3"
                style={{ width: 180 }}
              >
                <Link to={`/${movie.id}`} className="rounded">
                  <img
                    src={movie.poster}
                    className="rounded"
                    width="180"
                    height="276"
                    alt=""
                  />
                </Link>
                <Link
                  key={index}
                  to={`/${movie.id}`}
                  className="d-flex text-warning justify-content-center p-2 fs-5"
                >
                  {movie.title}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </FilterContainer>
  );
};

export default FilterCountry;
