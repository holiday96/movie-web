import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const WebPageContainer = styled(motion.div)`
  background-color: #111;
  margin-top: 147px;
  height: 1800px;
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
  return (
    <WebPageContainer>
      <div className="album py-5 bg-gradient">
        <div className="container-xl">
          <motion.ul
            variants={container}
            initial="hidden"
            animate="visible"
            className="d-flex flex-row"
          >
            {props.movies.map((movie, index) => (
              <motion.li
                variants={item}
                key={index}
                className="item mx-3"
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
