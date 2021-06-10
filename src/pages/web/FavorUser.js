import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { axios } from "../../axios";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

const FavorUser = () => {
  const [favors, setFavors] = useState([]);
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");
  const auth = jwt.decode(token);

  const getFavors = () => {
    axios
      .get(`/users?id=${auth.id}`)
      .then((res) => {
        setFavors(res.data[0].favor.reverse());
      })
      .catch((err) => console.log(err));
  };

  const getList = () => {
    favors.map((item) => {
      axios
        .get(`/movies?id=${item}`)
        .then((res) => {
          setList((list) => [...list, res.data[0]]);
        })
        .catch((err) => console.log(err));
    });
    console.log(list);
  };

  useEffect(() => {
    setList([]);
    getList();
  }, [favors]);

  useEffect(() => {
    getFavors();
    window.scrollTo(0, 0);
  }, []);

  return (
    <FavorContainer>
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
    </FavorContainer>
  );
};

export default FavorUser;
