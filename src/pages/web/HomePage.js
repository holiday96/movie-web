import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Carousel } from "3d-react-carousal";
import { BsEyeFill } from "react-icons/bs";
import { RiHeartsFill } from "react-icons/ri";
import { ImStarFull, ImStarHalf, ImStarEmpty } from "react-icons/im";

const WebPageContainer = styled(motion.div)`
  background-color: #111;
  margin-top: 147px;
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

const WebHomePage = (props) => {
  const [postArray, setPostArray] = useState([]);
  const [slides, setSlides] = useState([]);

  const getPostArray = (movies) => {
    if (movies.length !== 0) {
      let i = Math.floor(Math.random() * movies.length);
      while (i > movies.length - 5) {
        i = Math.floor(Math.random() * movies.length);
      }
      setPostArray([
        movies[i],
        movies[i + 1],
        movies[i + 2],
        movies[i + 3],
        movies[i + 4],
      ]);
    }
  };

  const getSlides = (postArray) => {
    if (postArray.length !== 0)
      setSlides([
        <Link to={`/${postArray[0].id}`}>
          <img src={postArray[0].poster} width="470" height="730" alt="3" />
        </Link>,
        <Link to={`/${postArray[1].id}`}>
          <img src={postArray[1].poster} width="470" height="730" alt="2" />
        </Link>,
        <Link to={`/${postArray[2].id}`}>
          <img src={postArray[2].poster} width="470" height="730" alt="3" />
        </Link>,
        <Link to={`/${postArray[3].id}`}>
          <img src={postArray[3].poster} width="470" height="730" alt="3" />
        </Link>,
        <Link to={`/${postArray[4].id}`}>
          <img src={postArray[4].poster} width="470" height="730" alt="3" />
        </Link>,
      ]);
  };

  useEffect(() => {
    getSlides(postArray);
    window.scrollTo(0, 0);
  }, [postArray]);

  useEffect(() => {
    getPostArray(props.movies);
  }, [props.movies]);

  useEffect(() => {
    props.getMovies();
    window.scrollTo(0, 0);
  }, []);

  return (
    <WebPageContainer>
      <div className="album py-5 bg-gradient">
        <Carousel slides={slides} autoplay={true} interval={3000} />
        <div className="container mt-5">
          <motion.ul
            variants={container}
            initial="hidden"
            animate="visible"
            className="d-flex flex-wrap justify-content-center"
          >
            {props.movies.map((movie, index) => (
              <motion.li
                variants={item}
                key={index}
                className="film-item item mx-3 mt-4"
                style={{ width: 180 }}
              >
                <Link
                  to={`/${movie.id}`}
                  onClick={() => props.updateViewCount(movie)}
                  className="rounded"
                >
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
                  onClick={() => props.updateViewCount(movie)}
                  className="d-flex text-warning justify-content-center pb-2 fs-5"
                >
                  <h3 className="movie-title">{movie.title}</h3>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </WebPageContainer>
  );
};

export default WebHomePage;
