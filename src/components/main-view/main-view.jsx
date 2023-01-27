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

// Initialize React component
export const MainView = () => {

  // Implement local storage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");  

  // Set array for movies
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  const filteredMovies = movies.filter((movie) => {
    return movie.Title.toLowerCase().includes(searchResult.toLowerCase());
  });

  useEffect(() => {
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

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
      setMovies(moviesFromApi);
    })
    .catch(error => console.log(error));
  }, [token]);


  return (
        <BrowserRouter>
        <NavigationBar
            user={user}
            movies={movies}
            setSearchResult={setSearchResult}
            onLoggedOut={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }}
            onSearch ={(foundMovie) => {
                setSearchResult(foundMovie);
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
                    path="/profile"
                    element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <Col md={10 }>
                                    <ProfileView 
                                        user={user}
                                        movies={movies}
                                        setUser={setUser}
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
                                    <MovieView 
                                    user={user}
                                    movies={movies}
                                    setUser={setUser}
                                    />
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
                                setSearchResult("");
                            }, [])}
                        </>
                    }
                />
            </Routes>
        </Row>
    </BrowserRouter>
  );
};