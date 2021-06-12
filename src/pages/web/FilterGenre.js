import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory, useParams } from "react-router-dom";
import { axios } from "../../axios";
import { motion } from "framer-motion";
import { ImHeart, ImHeartBroken } from "react-icons/im";
import { RiHeartAddFill } from "react-icons/ri";
import Swal from "sweetalert2";

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

const FilterGenre = (props) => {
  const [filter, setFilter] = useState([]);
  const [movie, setMovie] = useState([]);
  const [like, setLike] = useState(false);
  let { key } = useParams();
  let history = useHistory();

  const checkFavor = () => {
    if (props.user) {
      if (props.user.favor !== undefined)
        if (props.user.favor.includes(movie.id)) {
          return setLike(true);
        }
    }
    return setLike(false);
  };

  const dislikeAction = () => {
    const tagLike = document.querySelector(".movie-liked");
    tagLike.style.visibility = "hidden";
    const tagDislike = document.querySelector(".movie-liked.dislike");
    tagDislike.style.visibility = "visible";
  };

  const dislikeActionOut = () => {
    const tagLike = document.querySelector(".movie-liked");
    tagLike.style.visibility = "visible";
    const tagDislike = document.querySelector(".movie-liked.dislike");
    tagDislike.style.visibility = "hidden";
  };

  const addFavor = () => {
    if (props.user.length === 0) {
      Swal.fire({
        title: "Login to use the service!",
        showCancelButton: true,
        confirmButtonText: `Login`,
        confirmButtonColor: "#ff6500",
      }).then((result) => {
        if (result.isConfirmed) history.push("/login");
      });
    } else {
      if (props.user.favor === undefined) {
        const newList = [movie.id];
        const newData = {
          favor: newList,
          id: props.user.id,
          role: props.user.role,
          firstName: props.user.firstName,
          lastName: props.user.lastName,
          username: props.user.username,
          email: props.user.email,
          password: props.user.password,
        };
        axios.put(`/users/${props.user.id}`, newData);
      } else {
        props.user.favor.push(movie.id);
        const newData = {
          favor: props.user.favor,
          id: props.user.id,
          role: props.user.role,
          firstName: props.user.firstName,
          lastName: props.user.lastName,
          username: props.user.username,
          email: props.user.email,
          password: props.user.password,
        };
        axios.put(`/users/${props.user.id}`, newData);
      }
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        backdrop: `
        url("../../peachcat-love.gif")
        right center
        no-repeat
      `,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Added to your library successfully",
      });
      props.getUser();
    }
  };

  const removeFavor = () => {
    const newFavor = props.user.favor.filter((value) => value !== movie.id);
    const newData = {
      favor: newFavor,
      id: props.user.id,
      role: props.user.role,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      username: props.user.username,
      email: props.user.email,
      password: props.user.password,
    };
    axios.put(`/users/${props.user.id}`, newData);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      backdrop: `
      url("../../peachcat-cry.gif")
      right center
      no-repeat
    `,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "info",
      title: "Removed from library successfully",
    });
    props.getUser();
  };

  useEffect(() => {
    checkFavor();
  }, [props.user]);

  useEffect(() => {
    axios
      .get(`/movies?genre=${key}`)
      .then((res) => {
        setFilter(res.data.reverse());
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
                <div className="poster position-relative mr-3">
                  <img src={movie.poster} alt="" />
                  {!like && (
                    <>
                      <div onClick={addFavor} className="movie-liked">
                        <RiHeartAddFill
                          style={{ color: "red", fontSize: "25px" }}
                        />{" "}
                        Add Favorite
                      </div>
                    </>
                  )}
                  {like && (
                    <>
                      <div onMouseOver={dislikeAction} className="movie-liked">
                        <ImHeart style={{ color: "red", fontSize: "20px" }} />{" "}
                        In Favorites
                      </div>
                      <div
                        onMouseOut={dislikeActionOut}
                        onClick={removeFavor}
                        className="movie-liked dislike"
                      >
                        <ImHeartBroken
                          style={{ color: "red", fontSize: "20px" }}
                        />{" "}
                        Remove Movie
                      </div>
                    </>
                  )}
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
                    {movie.episodes > 1 && (
                      <tr>
                        <td className="table-head">Episodes</td>
                        <td className="table-value">
                          {movie.episodes + " eps"}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className="table-head">Runtime</td>
                      <td className="table-value">
                        {movie.runtime > 0
                          ? movie.runtime + " min"
                          : "Updating"}
                      </td>
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
          {filter[0] && (
            <p className="suggest-text">Danh sách phim {filter[0].genre}</p>
          )}
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
                  <h3 className="movie-title">{movie.title}</h3>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </FilterContainer>
  );
};

export default FilterGenre;
