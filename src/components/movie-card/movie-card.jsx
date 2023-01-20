import PropTypes, { func, string } from "prop-types";
import { Card, Col } from "react-bootstrap";

// Component to open movie card 
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100" onClick={() => onMovieClick(movie)}>
            <Card.Img variant="top" src={movie.ImagePath} className="img-fluid h-100 w-auto movie-card-img"/>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
            </Card.Body>
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
