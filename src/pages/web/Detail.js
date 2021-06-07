import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { axios } from "../../axios";

const DetailContainer = styled.div`
  margin-top: 147px;
  padding-top: 20px;
  background-color: #111;
  color: white;
  height: 1800px;
`;

const Detail = (props) => {
  const [movie, setMovie] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
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
          <div className="d-flex left-info col s12 xl8">
            <div className="poster mr-3">
              <img src={movie.poster} alt="" />
            </div>
            <div className="info">
              <h4>{movie.title}</h4>
              <span>Content</span>
              <p>{movie.content}</p>
            </div>
          </div>
          <div className="right-info">
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
