import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

// Initialize React component
export const MainView = () => {

  // Set array for movies
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movie data from API and return movie object
  useEffect(() => {

    if (!token) {
        return;
      }

    fetch("https://myflixdb-ecspecial-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
      const booksFromApi = data.map((movie) => {
        return {
          Genre: {
            Name: movie.Genre.Name,
            Description: movie.Genre.Description
          },
          Director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birth: movie.Director.Birth,
            Death: movie.Director.Death
          },
          id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          ImagePath: movie.ImagePath,
          Featured: movie.Featured
        };
      });

      // Populate movie array with returned movies
      setMovies(booksFromApi);
    })
    .catch(error => console.log(error));
  }, [token]);

  if (!user) {
    return (
        <>
        <LoginView 
        onLoggedIN={(user, token) => {
            setUser(user);
            setToken(token);
        }} /> 
        or
        <SignupView />
        </>
    );
  }

  // If movie is clicked on, show Moviecard
  if (selectedMovie) {
      let similarMovies = movies.filter(movie => movie.Genre.Name === selectedMovie.Genre.Name && movie.Title !== selectedMovie.Title);
      
      return (
        <>
        <MovieView movie={selectedMovie} onReturnClick={() => setSelectedMovie(null)} />
        <hr />
        <h2>Similar movies</h2>
        {similarMovies.map((movie) => (
            <MovieCard 
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
            />
        ))}
        </>
      );
  }

  // Check whether movie array is populated
  if (movies.length === 0) {
    return <div>The list is empty.</div>;
  }
  // Iterate through movie array and display all movies
  return (
    <div>
        <div>
            {movies.map((movie) => (
                <MovieCard 
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
        <button onClick={() => { setUser(null); }}>Logout</button>
    </div>
  );
};
