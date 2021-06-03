import "./App.css";
import Routers from "./Routers";
import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch("http://localhost:3001/movies");
      const data = await response.json();
      setMovies(data);
    };
    getMovies();
  }, []);

  return <Routers movies={movies} />;
}

export default App;
