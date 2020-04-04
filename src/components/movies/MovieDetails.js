import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Rating from "./Ratings";

function MovieDetails() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    async function getMovieById(id) {
        const res = await axios('https://ancient-caverns-16784.herokuapp.com/movies/' + id);
        setMovie(res.data);
    }
    
    useEffect(() => { 
        getMovieById(movieId); 
    }, [movieId]);

    if(movie) {
        console.log(movie);
        return (
            <>
                <div className="bg-dark text-white">
                    <div className="ml-5  mr-5">
                        <div className="d-flex justify-content-between">
                            <h1 className="d-inline-block">{ movie.Title } ({movie.Year})</h1>
                            <h2 className="d-inline-block">{movie.imdbRating}<span className="h6" > /10</span></h2>
                            
                        </div>
                        <div className="d-flex justify-content-start border-right-1 border-light">
                        <p>{ movie.Runtime }</p>
                        <span className="d-inline-block mr-2 ml-2"> | </span>
                        <p>{ movie.Genre }</p>
                        <span className="d-inline-block mr-2 ml-2"> | </span>
                        <p>{ movie.Released } ({movie.Country})</p>
                        </div>
                    </div>
                </div>
                <div className="ml-5  mr-5">
                    <img className="w-25 p-3"  src={ movie.Poster } alt="Movie Poster" />
                    <p>{movie.Plot}</p>
                    <p><b>Director: </b> {movie.Director}</p>
                    <p><b>Writers: </b> {movie.Writer}</p>
                    <p><b>Stars: </b> {movie.Actors}</p>
                    <p> <Rating film={ movie } key={ movie._id } /> </p>
                </div>
            </>
        );
    } else {
        return <h1>Loading ...</h1>;
    }
}

export default MovieDetails;