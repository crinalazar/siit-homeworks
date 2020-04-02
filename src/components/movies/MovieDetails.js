import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetails() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    async function getMovieById(id) {
        const res = await axios('https://ancient-caverns-16784.herokuapp.com/movies/' + id);
        setMovie(res.data);

        console.log(movie);
    }
    
    useEffect(() => { 
        getMovieById(movieId); 
    }, [movieId]);

    if(movie) {
        console.log(movie);
        return (
            <>
                <h1>{ movie.Title }</h1>
                <h5>Year: { movie.Year }</h5>
            </>
        );
    } else {
        return <h1>Loading ...</h1>;
    }
}

export default MovieDetails;