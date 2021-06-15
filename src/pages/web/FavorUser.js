import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { axios } from "../../axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsEyeFill } from "react-icons/bs";
import { RiHeartsFill } from "react-icons/ri";
import { ImStarFull, ImStarHalf, ImStarEmpty } from "react-icons/im";

const FavorContainer = styled.div`
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

const FavorUser = (props) => {
  const [favors, setFavors] = useState([]);
  const [list, setList] = useState([]);

  const getFavors = async () => {
    await axios
      .get(`/users?id=${props.user.id}`)
      .then((res) => {
        setFavors(res.data[0].favor.reverse());
      })
      .catch((err) => console.log(err));
  };

  const getList = async () => {
    await favors.map((item) => {
      axios
        .get(`/movies?id=${item}`)
        .then((res) => {
          setList((list) => [...list, res.data[0]]);
        })
        .catch((err) => console.log(err));
    });
  };

  useEffect(() => {
    setList([]);
    getList();
  }, [favors]);

  useEffect(() => {
    getFavors();
    console.log(favors.length?true:false);
    window.scrollTo(0, 0);
  }, [props.user]);

  return (
    <FavorContainer>
      {!favors.length && (
        <div className="container text-center">
          <h1 className="mb-5" style={{color: '#ff6500'}}>List Empty!!</h1>
          <h3 style={{color: '#ffa500e3' }}>Let's go back to the homepage<br />And find something interesting.</h3>
          <img src="../peachcat-go.gif" alt="" />
        </div>
      )}
      {favors.length && (
        <motion.ul
          variants={container}
          initial="hidden"
          animate="visible"
          className="d-flex flex-wrap justify-content-center"
        >
          {list.map((movie, index) => (
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
              <div
                key={index}
                to={`/${movie.id}`}
                className="d-flex text-warning movie-more-info"
              >
                <div className="movie-view">
                  <BsEyeFill className="movie-view-icon" />
                  <span className="movie-view-text">
                    {movie.view >= 1000
                      ? (movie.view - (movie.view % 1000)) / 1000 +
                        "." +
                        ((movie.view % 1000) - (movie.view % 100)) / 100 +
                        "K"
                      : movie.view}
                  </span>
                </div>
                <div className="movie-like">
                  <RiHeartsFill className="movie-like-icon" />
                  <span className="movie-like-text">
                    {movie.like >= 1000
                      ? (movie.like - (movie.like % 1000)) / 1000 +
                        "." +
                        ((movie.like % 1000) - (movie.like % 100)) / 100 +
                        "K"
                      : movie.like}
                  </span>
                </div>
                <div className="movie-star">
                  <ImStarFull className="movie-star-icon" />
                  <ImStarFull className="movie-star-icon" />
                  <ImStarFull className="movie-star-icon" />
                  <ImStarHalf className="movie-star-icon" />
                  <ImStarEmpty className="movie-star-icon" />
                </div>
              </div>
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
      )}
    </FavorContainer>
  );
};

export default FavorUser;
