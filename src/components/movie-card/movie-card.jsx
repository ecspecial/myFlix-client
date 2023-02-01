import React from "react";
import PropTypes, { func, string } from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";
import { Card, Col, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Component to open movie card 
export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Row>
                <Card.Img variant="top" src={movie.ImagePath} className="img-fluid h-100 w-auto movie-card-img"/>
            </Row>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
            </Card.Body>
            <Card.Footer>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button>Open</Button>
                </Link>
            </Card.Footer>
        </Card>
    );
};

// Define props constraints for MovieCard
MovieCard.PropTypes = {
    movie: PropTypes.exact({
        Genre: PropTypes.exact({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
        Director: PropTypes.exact({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        }).isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.string
}).isRequired,
onMovieClick: PropTypes.func.isRequired       
};
