import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const AddMovie = ({ onAddMovie }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let history = useHistory();
  const onSubmit = (data) => {
    if (data !== null) {
      const newData = {
        id: uuidv4(),
        ...data,
      };
      Swal.fire(
        "Good job!",
        "New Movie was added successfully!",
        "success"
      ).then(() => {
        onAddMovie(newData);
        history.push("/admin/movie");
      });
    }
  };

  return (
    <div style={{ height: 1300 }}>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2 text-primary">Add new movie</h1>
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
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Leave a title here"
            id="title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <div id="errorTitle" className="form-text text-danger">
              Chưa nhập tiêu đề phim.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="content">Content</label>
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="content"
            style={{ height: 150 }}
            {...register("content", { required: true })}
          ></textarea>
          {errors.content && (
            <div id="errorContent" className="form-text text-danger">
              Chưa nhập nội dung phim.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="episodes" className="form-label">
            Episodes
          </label>
          <input
            type="number"
            className="form-control"
            id="episodes"
            placeholder="Episodes"
            {...register("episodes", { required: true })}
          />
          {errors.episodes && (
            <div id="errorEpisodes" className="form-text text-danger">
              Chưa nhập số tập phim.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="runtime" className="form-label">
            Runtime (.min)
          </label>
          <input
            type="number"
            className="form-control"
            id="runtime"
            placeholder="Runtime"
            {...register("runtime", { required: true })}
          />
          {errors.runtime && (
            <div id="errorRuntime" className="form-text text-danger">
              Chưa nhập thời lượng phim.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="actor" className="form-label">
            Actors
          </label>
          <input
            type="text"
            className="form-control"
            id="actor"
            placeholder="Actors"
            {...register("actor", { required: true })}
          />
          {errors.actor && (
            <div id="errorActor" className="form-text text-danger">
              Chưa nhập tên diễn viên trong phim.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            placeholder="Country"
            {...register("country", { required: true })}
          />
          {errors.country && (
            <div id="errorCountry" className="form-text text-danger">
              Chưa nhập quốc gia phim.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <input
            type="text"
            className="form-control"
            id="genre"
            placeholder="Genre"
            {...register("genre", { required: true })}
          />
          {errors.genre && (
            <div id="errorGenre" className="form-text text-danger">
              Chưa nhập thể loại phim.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="release" className="form-label">
            Releases
          </label>
          <input
            type="text"
            className="form-control"
            id="release"
            placeholder="Releases"
            {...register("releases", { required: true })}
          />
          {errors.releases && (
            <div id="errorRelease" className="form-text text-danger">
              Chưa nhập năm phát hành phim.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="poster" className="form-label">
            Poster (URL)
          </label>
          <input
            type="text"
            className="form-control"
            id="poster"
            placeholder="Poster"
            {...register("poster", { required: true })}
          />
          {errors.poster && (
            <div id="errorPoster" className="form-text text-danger">
              Chưa nhập ảnh bìa phim.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="trailer" className="form-label">
            Trailer (URL)
          </label>
          <input
            type="text"
            className="form-control"
            id="trailer"
            placeholder="Trailer"
            {...register("trailer", { required: true })}
          />
          {errors.trailer && (
            <div id="errorTrailer" className="form-text text-danger">
              Chưa nhập trailer phim.
            </div>
          )}
        </div>
        <div className="form-floating input-movie">
          <label htmlFor="movie" className="form-label">
            Link of Movie (URL)
          </label>
          <input
            type="text"
            className="form-control"
            id="movie"
            placeholder="Link of Movie"
            {...register("movie")}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
