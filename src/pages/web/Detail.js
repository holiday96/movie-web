import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { axios } from "../../axios";
import { ImHeart, ImHeartBroken } from "react-icons/im";
import { RiHeartAddFill } from "react-icons/ri";
import jwt from "jsonwebtoken";
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
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [auth, setAuth] = useState(jwt.decode(token));
  let history = useHistory();

  const checkFavor = () => {
    if (auth) {
      if (auth.favor !== undefined)
        if (auth.favor.includes(id)) {
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

  const resignin = () => {
    localStorage.removeItem("token");
    axios
      .get(`/users?id=${auth.id}`)
      .then((res) => {
        if (res.data) {
          const newToken = jwt.sign(res.data[0], "secret", { expiresIn: 3600 });
          setToken(localStorage.setItem("token", newToken));
          setAuth(jwt.decode(token));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addFavor = () => {
    if (!token) {
      Swal.fire({
        title: "Login to use the service!",
        showCancelButton: true,
        confirmButtonText: `Login`,
        confirmButtonColor: "#ff6500",
      }).then((result) => {
        if (result.isConfirmed) history.push("/login");
      });
    } else {
      if (auth.favor === undefined) {
        const newList = [id];
        const newData = {
          favor: newList,
          id: auth.id,
          role: auth.role,
          firstName: auth.firstName,
          lastName: auth.lastName,
          username: auth.username,
          email: auth.email,
          password: auth.password,
        };
        axios.put(`/users/${auth.id}`, newData);
      } else {
        auth.favor.push(id);
        const newData = {
          favor: auth.favor,
          id: auth.id,
          role: auth.role,
          firstName: auth.firstName,
          lastName: auth.lastName,
          username: auth.username,
          email: auth.email,
          password: auth.password,
        };
        axios.put(`/users/${auth.id}`, newData);
      }
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Added to your library successfully'
      })
      resignin();
    }
  };

  const removeFavor = () => {
      const newFavor = auth.favor.filter((value) => value !== id);
      const newData = {
        favor: newFavor,
        id: auth.id,
        role: auth.role,
        firstName: auth.firstName,
        lastName: auth.lastName,
        username: auth.username,
        email: auth.email,
        password: auth.password,
      };
      axios.put(`/users/${auth.id}`, newData);
      resignin();
      setLike(false);
  };

  useEffect(() => {
    checkFavor();
    setAuth(jwt.decode(token));
  }, [token]);

  useEffect(() => {
    axios
      .get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
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
    </DetailContainer>
  );
};

export default Detail;
