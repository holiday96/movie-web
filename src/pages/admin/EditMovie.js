import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const EditMovie = ({ onEditMovie }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { id } = useParams();
  let history = useHistory();

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3001/movies/${id}`);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  const onSubmit = (data) => {
    const newData = {
      id: id,
      ...data,
    };
    Swal.fire("Good job!", "Movie was updated!", "success").then(() => {
      onEditMovie(newData);
      history.push("/admin/movie");
    });
  };

  return (
    <div style={{ height: 1300 }}>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2 text-primary">Edit movie</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <Link
              to={"/admin/movie"}
              type="button"
              class="btn btn-sm btn-warning px-3 py-2"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            placeholder="Leave a title here"
            id="title"
            defaultValue={movies.title}
            {...register("title", { required: true })}
          />
          {errors.title && (
            <div id="errorTitle" className="form-text text-danger">
              Chưa nhập tiêu đề phim.
            </div>
          )}
          <label htmlFor="title">Title</label>
        </div>
        <div className="form-floating input-movie">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="content"
            style={{ height: 150 }}
            defaultValue={movies.content}
            {...register("content", { required: true })}
          ></textarea>
          {errors.content && (
            <div id="errorContent" className="form-text text-danger">
              Chưa nhập nội dung phim.
            </div>
          )}
          <label htmlFor="content">Content</label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="number"
            className="form-control"
            id="episodes"
            placeholder="Episodes"
            defaultValue={movies.episodes}
            {...register("episodes", { required: true })}
          />
          {errors.episodes && (
            <div id="errorEpisodes" className="form-text text-danger">
              Chưa nhập số tập phim.
            </div>
          )}
          <label htmlFor="episodes" className="form-label">
            Episodes
          </label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="number"
            className="form-control"
            id="runtime"
            placeholder="Runtime"
            defaultValue={movies.runtime}
            {...register("runtime", { required: true })}
          />
          {errors.runtime && (
            <div id="errorRuntime" className="form-text text-danger">
              Chưa nhập thời lượng phim.
            </div>
          )}
          <label htmlFor="runtime" className="form-label">
            Runtime (.min)
          </label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            id="actor"
            placeholder="Actors"
            defaultValue={movies.actor}
            {...register("actor", { required: true })}
          />
          {errors.actor && (
            <div id="errorActor" className="form-text text-danger">
              Chưa nhập tên diễn viên trong phim.
            </div>
          )}
          <label htmlFor="actor" className="form-label">
            Actors
          </label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            id="country"
            placeholder="Country"
            defaultValue={movies.country}
            {...register("country", { required: true })}
          />
          {errors.country && (
            <div id="errorCountry" className="form-text text-danger">
              Chưa nhập quốc gia phim.
            </div>
          )}
          <label htmlFor="country" className="form-label">
            Country
          </label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            id="genre"
            placeholder="Genre"
            defaultValue={movies.genre}
            {...register("genre", { required: true })}
          />
          {errors.genre && (
            <div id="errorGenre" className="form-text text-danger">
              Chưa nhập thể loại phim.
            </div>
          )}
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            id="release"
            placeholder="Releases"
            defaultValue={movies.releases}
            {...register("releases", { required: true })}
          />
          {errors.releases && (
            <div id="errorRelease" className="form-text text-danger">
              Chưa nhập năm phát hành phim.
            </div>
          )}
          <label htmlFor="release" className="form-label">
            Releases
          </label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            id="poster"
            placeholder="Poster"
            defaultValue={movies.poster}
            {...register("poster", { required: true })}
          />
          {errors.poster && (
            <div id="errorPoster" className="form-text text-danger">
              Chưa nhập ảnh bìa phim.
            </div>
          )}
          <label htmlFor="poster" className="form-label">
            Poster (URL)
          </label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            id="trailer"
            placeholder="Trailer"
            defaultValue={movies.trailer}
            {...register("trailer", { required: true })}
          />
          {errors.trailer && (
            <div id="errorTrailer" className="form-text text-danger">
              Chưa nhập trailer phim.
            </div>
          )}
          <label htmlFor="trailer" className="form-label">
            Trailer (URL)
          </label>
        </div>
        <div className="form-floating input-movie">
          <input
            type="text"
            className="form-control"
            id="movie"
            placeholder="Link of Movie"
            defaultValue={movies.movie}
            {...register("movie")}
          />
          <label htmlFor="movie" className="form-label">
            Link of Movie (URL)
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
