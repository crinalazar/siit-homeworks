import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MovieCard from "./MovieCard";

function MovieList() {
    // the variable declaration is made using an array destructuring assignment
    // useState sets up a state variable and a setter function for that state variable
    // when the state variable changes the component gets updated
    let [movies, setMovies] = useState([]);

    // useEffect runs side effects for our component
    // side effects are any actions that are either influenced from outside the component or are influencing other things outside our component
    // useEffect has a function as the first param and an array of state variables or props which it depends on as the second variable
    // if the array of dependencies is empty the effect runs only on the first load of the component
    useEffect(() => {
       getMovies();
    }, []);

    async function getMovies() {
        const res = await axios('https://ancient-caverns-16784.herokuapp.com/movies');
        setMovies(res.data.results);
    }

    return (
        <div className="row">
            { movies.map(movie => <MovieCard film={ movie } key={ movie._id } />) }

            {/* { movies.length ? movies.map(movie => <MovieCard film={ movie } />) : 'Loading ...'} */}             
        </div>
    );
}

export default MovieList;