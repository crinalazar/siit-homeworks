import React, { useState, useEffect, useContext } from 'react';
import { useParams } from  'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import AuthContext from '../auth/AuthContext';

export default function EditMovie() {
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

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios('https://ancient-caverns-16784.herokuapp.com/movies/' + movieId, {
                method: 'PUT',
                headers: {
                    'x-auth-token': token
                },
                data: qs.stringify({ 'Year': movie.Year }),
            });
            console.log(res);
        } catch(e) {
            console.warn(e);
        }
 
    }

    function handleInputChange(e) {
        setMovie( { ...movie, Year: e.currentTarget.value });
    }
    
    useEffect(() => { 
        getMovieById(movieId); 
    }, [movieId]);

    if(!movie) {
        return <h1>Loading ...</h1>;
    }

    return (
        <>
            <h1>Edit Movie { movie.Title }</h1>

            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input 
                        onChange={ handleInputChange }
                        value={ movie.Year }
                        type="text"
                        className={ 'form-control' }
                        id="year"
                        placeholder="Enter year"
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </>
    )
}
