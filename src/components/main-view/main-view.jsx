import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Col, Container, Row, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SearchView } from "../search-view/search-view";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";
import { setFilter, setMovies } from "../../redux/actions/movieActions";

// Initialize React component
export const MainView = () => {

  // Implement local storage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");  

  // Set array for movies
  const user = useSelector(state => state.user.user);
  const movies = useSelector(state => state.movies.movies);
  const token = useSelector(state => state.user.token);
  const filter = useSelector(state => state.movies.filter);
  const dispatch = useDispatch();
  const searchFilter = useSelector(state => state.movies.filter);

  const filteredMovies = movies.filter((movie) => {
    return movie.Title.toLowerCase().includes(searchFilter.toLowerCase());
  });


  useEffect(() => {
    if (storedUser && storedToken) {
        dispatch(setUser(storedUser, storedToken));
    }
  }, []);

  // Fetch movie data from API and return movie object
  useEffect(() => {

    if (!user) {
        return;
      }

    fetch("https://myflixdb-ecspecial-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((movie) => {
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
      dispatch(setMovies(moviesFromApi));
    })
    .catch(error => console.log(error));
  }, [token]);


  return (
        <BrowserRouter>
        <NavigationBar
            //setSearchResult={setSearchResult}
            onSearch ={(filter) => {
                dispatch(setFilter(filter));
            }}
        />
        <Row className="mt-3 justify-content-md-center">
            <Routes>
                <Route
                    path="/signup"
                    element={
                        <>
                            {token ? (
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
                            {token ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <LoginView /> 
                                </Col>
                            )}
                        </>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <Col md={10 }>
                                    <ProfileView /> 
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
                                    <MovieView />
                                </Col>
                            )}
                        </>
                    }

                />
                <Route
                    path="/"
                    element={
                        <>
                            {!token ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                    <div>The list is empty!</div>
                            ) : (
                                <Row>
                                    {movies.map((movie) => (
                                        <Col key={movie.id} xs={8} sm={6} md={4} lg={3} className="mb-3">    
                                            <MovieCard 
                                                movie={movie}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </>
                    }
                />

                <Route
                
                    path="/search"
                    element={
                        <>
                        {!user ? (
                                <Navigate to="/login" replace />
                            ) : filteredMovies.length === 0 ? (
                                    <div>Nothing found!</div>
                            ) : (
                                <Row>
                                    {filteredMovies.map((movie) => (
                                        <Col key={movie.id} xs={8} sm={6} md={4} lg={3} className="mb-3">    
                                            <MovieCard 
                                                movie={movie}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            )}{ useEffect(() => {
                                dispatch(setFilter(""));
                            }, [])}
                        </>
                    }
                />
            </Routes>
        </Row>
    </BrowserRouter>
  );
};