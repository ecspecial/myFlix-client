import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// Initialize React component
export const MainView = () => {

  // Set array for movies
  const [movies, setMovies] = useState([]);

  // Fetch movie data from API and return movie object
  useEffect(() => {
    fetch("https://myflixdb-ecspecial-api.herokuapp.com/movies").
    then((response) => response.json())
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
  }, []);

  // Set variable for selectead movie state
  const [ selectedMovie, setSelectedMovie] = useState(null);

  // If movie is clicked on, show Moviecard
  if (selectedMovie) {
      return <MovieView movie={selectedMovie} onReturnClick={() => setSelectedMovie(null)} />;
  }

  // Check whether movie array is populated
  if (movies.length === 0) {
    return <div>The list is empty.</div>;
  }
  // Iterate through movie array and display all movies
  return (
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
  );
};
