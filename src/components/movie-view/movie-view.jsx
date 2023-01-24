import { useParams } from "react-router";
import { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { ProfileView } from "../profile-view/profile-view"

// Component to populate movie card
export const MovieView = ({ user, setUser, movies }) => {
    const { movieId } = useParams();
    const token = localStorage.getItem("token");
    const [errors, setErrors] = useState([]);
    const movie = movies.find((m) => m.id === movieId);
    const similarMovies = movies.filter((m => m.Genre.Name === movie.Genre.Name && m.Title !== movie.Title));
    let favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));

    const handleAddFavorite = () => {
        fetch(`https://myflixdb-ecspecial-api.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => response.json())
        .then((data) => {
            if(data) {
                alert("Movie added to favorites");
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            } else {
                alert("Failed to update user");
                setErrors(err.errors);
                console.log(errors);
            }
        })
        .catch(err => {
            alert("Something went wrong");
        });
      };
    
      const handleRemoveFavorite = () => {
        fetch(`https://myflixdb-ecspecial-api.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => response.json())
        .then((data) => {
            if(data) {
                alert("Movie removed from favorites");
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            } else {
                alert("Failed to update user");
                setErrors(err.errors);
                console.log(errors);
            }
        })
        .catch(err => {
            alert("Something went wrong");
        });
      };

    return (
        <>
        <Row className="d-flex flex-row-reverse p-3">
            <Col md={5} className="text-center text-md-end">
                <Row>
                    <img 
                    src={movie.ImagePath} 
                    alt={`Poster for ${movie.Title}`} 
                    className="img-fluid h-100 w-auto movie-view-img p-3"
                    />
                </Row>
            </Col>
            <Col md={7} className="d-flex flex-column">
                <Row className="d-flex flex-row  justify-content-between">
                    <Col md={9} className="d-flex flex-column">
                        <h3 className="my-0">
                            <span>Title: </span>
                            <span>{movie.Title}</span>
                        </h3>
                        <h5 className="mt-1 text-left text-muted">
                            <span>Director: </span>
                            <span>{movie.Director.Name}</span>
                        </h5>
                    </Col>

                    <Col md={3} className="align-self-end mb-2 text-end">
                        <span>Genre: </span>
                        <span className="fw-bolder">{movie.Genre.Name}</span>
                    </Col>
                </Row>
                <div className="mt-md-5 mb-4">
                    <div className="text-decoration-underline mb-2">Description: </div>
                    <span>{movie.Description}</span>
                </div>
                <div className="d-flex justify-content-between mt-auto mb-md-4">
                    <div>
                        {favoriteMovies.length > 0 ? 
                            (user.FavoriteMovies.includes(movie.id) ? 
                                <Button variant="danger" onClick={handleRemoveFavorite}>Remove from Favorites</Button> 
                                : <Button className="button-add-favorite" onClick={handleAddFavorite}>Add to Favorites</Button>) 
                            : null}
                    </div>
                    <div className="ml-auto align-self-end">
                        <Link to={`/`}>
                            <Button className="back-button">Back</Button>
                        </Link>
                    </div>
                </div>
            </Col>
        </Row>
        
        {similarMovies.length > 0 && (
            <Row className="d-flex flex-column p-3">
                <Col className="mb-3">
                    <h3>Similar movies:</h3>
                </Col>
                <Row xs={8} sm={6} md={3}>
                    {similarMovies.map((movie) => (
                        <Col key={movie.id} xs={8} sm={6} md={3} className="mb-3">
                            <MovieCard 
                                movie={movie}
                            />
                        </Col>
                    ))}
                </Row>
            </Row>
        )}
        </>
    );
};