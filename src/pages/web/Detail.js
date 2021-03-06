import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { axios } from "../../axios";
import { ImHeart, ImHeartBroken } from "react-icons/im";
import { RiHeartAddFill } from "react-icons/ri";
import Swal from "sweetalert2";

const DetailContainer = styled.div`
  margin-top: 147px;
  padding-top: 40px;
  background-color: #111;
  color: white;
  padding-bottom: 50px;
`;

const Detail = (props) => {
  const [movie, setMovie] = useState([]);
  const [like, setLike] = useState(false);
  let { id } = useParams();
  let history = useHistory();

  const checkFavor = () => {
    if (props.user) {
      if (props.user.favor !== undefined)
        if (props.user.favor.includes(id)) {
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

  const addFavor = async () => {
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
        const newList = [id];
        const newData = {
          favor: newList,
          ...props.user
        };
        await axios.put(`/users/${props.user.id}`, newData);
      } else {
        props.user.favor.push(id);
        const newData = {
          favor: props.user.favor,
          ...props.user
        };
        await axios.put(`/users/${props.user.id}`, newData);
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
      props.increaseLikeCount(movie);
      props.getUser();
    }
  };

  const removeFavor = async () => {
    const newFavor = props.user.favor.filter((value) => value !== id);
    const newData = {
      favor: newFavor,
      id: props.user.id,
      role: props.user.role,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      username: props.user.username,
      email: props.user.email,
      password: props.user.password,
      active: props.user.active,
      verify: props.user.verify
    };
    await axios.put(`/users/${props.user.id}`, newData);
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
    props.decreaseLikeCount(movie);
  };

  useEffect(() => {
    props.getUser();
  }, []);

  useEffect(() => {
    checkFavor();
  }, [props.user]);

  useEffect(() => {
    const getMovie = async () =>
      await axios
        .get(`/movies/${id}`)
        .then((res) => {
          setMovie(res.data);
        })
        .catch((err) => console.log(err));
    getMovie();
    window.scrollTo(0, 0);
  }, []);

  return (
    <DetailContainer>
      <div className="container">
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
            <div className="poster mr-3 position-relative">
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
                    <ImHeart style={{ color: "red", fontSize: "20px" }} /> In
                    Favorites
                  </div>
                  <div
                    onMouseOut={dislikeActionOut}
                    onClick={removeFavor}
                    className="movie-liked dislike"
                  >
                    <ImHeartBroken style={{ color: "red", fontSize: "20px" }} />{" "}
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
                    <td className="table-value">{movie.episodes + " eps"}</td>
                  </tr>
                )}
                <tr>
                  <td className="table-head">Runtime</td>
                  <td className="table-value">
                    {movie.runtime > 0 ? movie.runtime + " min" : "Updating"}
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
                <tr>
                  <td className="table-head">View</td>
                  <td className="table-value">{movie.view}</td>
                </tr>
                <tr>
                  <td className="table-head">Like</td>
                  <td className="table-value">{movie.like}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DetailContainer>
  );
};

export default Detail;
