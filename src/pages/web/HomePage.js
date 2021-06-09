import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Carousel } from "3d-react-carousal";

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
  // const [postArray, setPostArray] = useState([]);
  // const [slides, setSlides] = useState([]);

  // const getPostArray = (movies) => {
  //   if (movies.length !== 0) {
  //     let i = Math.floor(Math.random() * movies.length);
  //     while (i > movies.length - 4) {
  //       i = Math.floor(Math.random() * movies.length);
  //     }
  //     setPostArray([
  //       movies[i],
  //       movies[i + 1],
  //       movies[i + 2],
  //       movies[i + 3],
  //       movies[i + 4],
  //     ]);
  //   }
  // };

  // const getSlides = (postArray) => {
  //   if (postArray.length !== 0)
  //     setSlides([
  //       <Link to={`/${postArray[0].id}`}>
  //         <img src={postArray[0].poster} width="470" height="730" alt="3" />
  //       </Link>,
  //       <Link to={`/${postArray[1].id}`}>
  //         <img src={postArray[1].poster} width="470" height="730" alt="2" />
  //       </Link>,
  //       <Link to={`/${postArray[2].id}`}>
  //         <img src={postArray[2].poster} width="470" height="730" alt="3" />
  //       </Link>,
  //       <Link to={`/${postArray[3].id}`}>
  //         <img src={postArray[3].poster} width="470" height="730" alt="3" />
  //       </Link>,
  //       <Link to={`/${postArray[4].id}`}>
  //         <img src={postArray[4].poster} width="470" height="730" alt="3" />
  //       </Link>,
  //     ]);
  // };

  // useEffect(() => {
  //   getSlides(postArray);
  //   setReady(true);
  // }, [postArray]);

  // useEffect(() => {
  //   getSlides(postArray);
  // }, [ready]);

  // useEffect(() => {
  //   getPostArray(props.movies);
  // }, [props.movies]);
  let slides = [
    <Link to={`/7629fb68-0677-4bda-89ae-9a548adc3b57`}>
      <img
        src="https://www.themoviedb.org/t/p/original/5A79GeOb3uChQ0l0ZDjDyODKQp3.jpg"
        width="470"
        height="730"
        alt="3"
      />
    </Link>,
    <Link to={`/6f3616b1-01a0-43ff-9c14-4760571e9d71`}>
      <img
        src="https://images-na.ssl-images-amazon.com/images/I/91OxromzoSL._AC_SL1500_.jpg"
        width="470"
        height="730"
        alt="2"
      />
    </Link>,
    <Link to={`/13c97510-0d6d-4b85-bdb6-817fceebc1f4`}>
      <img
        src="https://www.joblo.com/assets/images/oldsite/posters/images/full/2007-hitman-3.jpg"
        width="470"
        height="730"
        alt="3"
      />
    </Link>,
    <Link to={`/94c5df25-6d63-4e08-83b6-f6af4104a051`}>
      <img
        src="https://images-na.ssl-images-amazon.com/images/I/A1KMUIdd3XL._AC_SL1500_.jpg"
        width="470"
        height="730"
        alt="4"
      />
    </Link>,
    <Link to={`/26f9398d-2d33-4863-bfbb-eec647e5312b`}>
      <img
        src="https://images-na.ssl-images-amazon.com/images/I/71sgsn-zXPL._AC_SL1394_.jpg"
        width="470"
        height="730"
        alt="5"
      />
    </Link>,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <WebPageContainer>
      <div className="album py-5 bg-gradient">
        <Carousel slides={slides} autoplay={true} interval={3000} />
        <div className="container-xl mt-5">
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
    </WebPageContainer>
  );
};

export default WebHomePage;
