import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../auth/AuthContext';

function MovieDetails() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    const { token } = useContext(AuthContext);

    async function getMovieById(id) {
        try {
            const res = await axios('https://ancient-caverns-16784.herokuapp.com/movies/' + id);
            setMovie(res.data);
        } catch(e) {
            console.warn(e);
        }
 
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
                {
                    token ? 
                        <Link className="btn btn-primary" to={ "/movies/edit/" + movie._id }>Edit This Movie</Link>
                    :
                        null
                }
                
            </>
        );
    } else {
        return <h1>Loading ...</h1>;
    }
}

export default MovieDetails;