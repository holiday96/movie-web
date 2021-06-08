import "./App.css";
import Routers from "./Routers";
import { useState, useEffect } from "react";
import { axios } from "./axios";
import Swal from "sweetalert2";
import "./assets/admin/style.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [genres, setGenres] = useState([]);

  const getMovies = async () => {
    const response = await axios.get("/movies").catch((e) => console.log(e));
    if (response && response.data) {
      setMovies(response.data);
    }
  };
  const getUsers = async () => {
    const response = await axios.get("/users").catch((e) => console.log(e));
    if (response && response.data) setUsers(response.data);
  };

  const getGenres = async () => {
    const response = await axios.get("/movies").catch((e) => console.log(e));
    if (response && response.data) {
      movies.map((item) => {
        if (!genres.includes(item.genre))
          setGenres((genres) => [...genres, item.genre]);
        // setGenre(
        //   genres.filter(
        //     (value, index, newGenres) => newGenres.indexOf(value) === index
        //   )
        // );
      });
    }
  };

  useEffect(() => {
    getMovies();
    getUsers();
    getGenres();
    console.log(genres);
  }, []);

  const addMovie = async (item) => {
    const response = await axios
      .post("/movies", item)
      .catch((e) => console.log(e));
    if (response) getMovies();
  };

  const editMovie = async (item) => {
    const response = await axios
      .put(`/movies/${item.id}`, item)
      .catch((e) => console.log(e));
    if (response) getMovies();
  };

  const editUser = async (item) => {
    const response = await axios
      .put(`/users/${item.id}`, item)
      .catch((e) => console.log(e));
    if (response) getUsers();
  };

  const removeMovie = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          removeMovieItem(id);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  const removeMovieItem = async (id) => {
    const response = await axios
      .delete(`/movies/${id}`)
      .catch((e) => console.log(e));
    if (response) getMovies();
  };

  const removeUser = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          removeUserItem(id);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your data has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  const removeUserItem = async (id) => {
    const response = await axios
      .delete(`/users/${id}`)
      .catch((e) => console.log(e));
    if (response) getUsers();
  };

  const register = async (item) => {
    const response = await axios
      .post("/users", item)
      .catch((e) => console.log(e));
    if (response) getMovies();
  };

  const checkAuth = () => {};

  return (
    <Routers
      movies={movies}
      users={users}
      onAddMovie={addMovie}
      onEditMovie={editMovie}
      onRemoveMovie={removeMovie}
      onEditUser={editUser}
      onRemoveUser={removeUser}
      onRegister={register}
      checkAuth={checkAuth}
    />
  );
}

export default App;
