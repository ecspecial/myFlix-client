import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Col, Container, Row, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Initialize React component
export const MainView = () => {

  // Set array for movies
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);

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


  return (
        <BrowserRouter>
        <NavigationBar
            user={user}
            onLoggedOut={() => {
            setUser(null);
            }}
        />
        <Row className="mt-3 justify-content-md-center">
            <Routes>
                <Route
                    path="/signup"
                    element={
                        <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <SignupView />
                                </Col>
                            )}
                        </>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <LoginView 
                                        onLoggedIN={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                        }} 
                                    /> 
                                </Col>
                            )}
                        </>
                    }
                />
                <Route
                    path="/movies/:movieId"
                    element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <div>The list is empty!</div>
                            ) : (
                                <Col md={8}>
                                    <MovieView movies={movies} />
                                </Col>
                            )}
                        </>
                    }

                />
                <Route
                    path="/"
                    element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                    <div>The list is empty!</div>
                            ) : (
                                <Row>
                                    {movies.map((movie) => (
                                        <Col key={movie.id} xs={8} sm={6} md={4} lg={3} className="mb-3">    
                                            <MovieCard 
                                                movie={movie}
                                                onMovieClick={(newSelectedMovie) => {
                                                }}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </>
                    }
                />
            </Routes>
        </Row>
    </BrowserRouter>
  );
};

                // {!user ? (
                //     <Col md={4}>
                //         <LoginView 
                //         onLoggedIN={(user, token) => {
                //             setUser(user);
                //             setToken(token);
                //         }} /> 
                //         or
                //         <SignupView />
                //     </Col>
                // ) : selectedMovie? (
                //     <Row>
                //             <MovieView movie={selectedMovie} onReturnClick={() => setSelectedMovie(null)} />
                //             <hr />
                //             <h2>Similar movies</h2>
                //                 {movies.filter((movie => movie.Genre.Name === selectedMovie.Genre.Name && movie.Title !== selectedMovie.Title)).map((movie) => (
                //                     <Col key={movie.id} xs={8} sm={6} md={3}>
                //                         <MovieCard 
                //                             movie={movie}
                //                             onMovieClick={(newSelectedMovie) => {
                //                                 setSelectedMovie(newSelectedMovie);
                //                             }}
                //                         />
                //                     </Col>
                //                 ))}
                //     </Row>
                // ) : movies.length === 0 ? (
                //     <div>The list is empty!</div>
                // ) : (
                //     <>
                //         <Row>
                //             <Col className='text-end mt-5'>
                //                 <Button
                //                     onClick={() => {
                //                     setUser(null);
                //                     setToken(null);
                //                     localStorage.clear();
                //                     }}
                //                     variant='primary'
                //                     size='lg'
                //                     className='mb-5'
                //                 >
                //                     Sign out
                //                 </Button>
                //             </Col>
                //         </Row>

                //         <Row>
                //             {movies.map((movie) => (
                //                 <Col key={movie.id} xs={8} sm={6} md={3}>    
                //                     <MovieCard 
                //                         movie={movie}
                //                         onMovieClick={(newSelectedMovie) => {
                //                             setSelectedMovie(newSelectedMovie);
                //                         }}
                //                     />
                //                 </Col>
                //             ))}
                //         </Row>
                //     </>
                // )}
