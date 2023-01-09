import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            _id: 1,
            Title: 'Silence of the Lambs',
            Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
            Genre: {
              Name: 'Thriller',
              Description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.'
            },
            Director: {
              Name: 'Jonathan Demme',
              Bio: 'Robert Jonathan Demme was an American director, producer, and screenwriter.',
              Birth: '1944',
              Death: '2017'
            },
            ImagePath: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg',
            Featured: true
          },
          {
            _id: 2,
            Title: 'The Shawshank Redemption',
            Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            Genre: {
              Name: 'Drama',
              Description: 'Drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
            },
            Director: {
              Name: 'Frank Darabont',
              Bio: 'Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution.',
              Birth: '1959',
              Death: null
            },
            ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
            Featured: true
          },
          {
            _id: 3,
            Title: 'The Godfather',
            Description: 'Movie plot is centered around the aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
            Genre: {
              Name: 'Crime',
              Description: 'Crime film is a genre that revolves around the action of a criminal mastermind.'
            },
            Director: {
              Name: 'Francis Ford Coppola',
              Bio: "Coppola's reputation as a filmmaker was cemented with the release of The Godfather (1972), which revolutionized the gangster genre[6] of filmmaking, receiving strong commercial and critical reception.",
              Birth: '1939',
              Death: null
            },
            ImagePath: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg',
            Featured: true
          }  
    ]);

    const [ selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onReturnClick={() => setSelectedMovie(null)} />;
    }

    if (movies.length === 0) {
        return <div>The list is empty.</div>;
    } else {
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
    }

};