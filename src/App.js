/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import Routers from "./Routers";
import { useState, useEffect } from "react";
import { axios } from "./axios";
import Swal from "sweetalert2";
import jwt from "jsonwebtoken";

function App() {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [user, setUser] = useState([]);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const id = jwt.decode(token);
      await axios.get(`/users?id=${id}`).then((res) => {
        setUser(res.data[0]);
      });
    }
  };

  const getMovies = async () => {
    const response = await axios.get("/movies").catch((e) => console.log(e));
    if (response && response.data) {
      setMovies(response.data.reverse());
    }
  };
  const getUsers = async () => {
    const response = await axios.get("/users").catch((e) => console.log(e));
    if (response && response.data) setUsers(response.data);
  };
  const getGenres = (movies) => {
    movies.map((item) => setGenres((genres) => [...genres, item.genre]));
  };
  const getCountries = (movies) => {
    movies.map((item) =>
      setCountries((countries) => [...countries, item.country])
    );
  };

  useEffect(() => {
    getMovies();
    getUsers();
    getUser();
  }, []);
  useEffect(() => {
    getGenres(movies);
    getCountries(movies);
  }, [movies]);
  useEffect(() => {
    setGenres(genres.sort());
    setGenres(
      genres.filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [genres.length]);
  useEffect(() => {
    setCountries(countries.sort());
    setCountries(
      countries.filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [countries.length]);

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
    axios.post("/users", item).catch((e) => console.log(e));
  };

  const updateViewCount = async (data) => {
    const newData = {
      view: data.view++,
      ...data,
    };
    await axios
      .put(`/movies/${newData.id}`, newData)
      .catch((e) => console.log(e));
  };

  const increaseLikeCount = async (data) => {
    console.log("like before: ", data.like);
    const newData = {
      like: data.like++,
      ...data,
    };
    await axios
      .put(`/movies/${newData.id}`, newData)
      .catch((e) => console.log(e));
    console.log("like after: ", newData.like);
  };

  const decreaseLikeCount = async (data) => {
    if (data.like > 0) {
      console.log("like before: ", data.like);
      const newData = {
        like: data.like--,
        ...data,
      };
      await axios
        .put(`/movies/${newData.id}`, newData)
        .catch((e) => console.log(e));
      console.log("like after: ", newData.like);
    }
  };

  return (
    <Routers
      movies={movies}
      users={users}
      genres={genres}
      countries={countries}
      user={user}
      getMovies={getMovies}
      getUser={getUser}
      setUser={setUser}
      onAddMovie={addMovie}
      onEditMovie={editMovie}
      onRemoveMovie={removeMovie}
      onEditUser={editUser}
      onRemoveUser={removeUser}
      onRegister={register}
      updateViewCount={updateViewCount}
      increaseLikeCount={increaseLikeCount}
      decreaseLikeCount={decreaseLikeCount}
    />
  );
}

export default App;
