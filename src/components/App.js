import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './shared/Header';
import MovieList from './movies/MovieList';
import MovieDetails from './movies/MovieDetails';
import EditMovie from './movies/EditMovie';
import Register from './auth/Register';
import Login from './auth/Login';
import AuthContext from './auth/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        //verificam daca in local storage avem token, daca avem facem un setToken(<ce vine din localStorage>)
        const token = localStorage.getItem('token');
        if(token) {
            setToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={ {token, setToken} }>
            <BrowserRouter>
                <Header user="Alexandru" />
                <div className="container">
                    <Route exact path="/">
                        <MovieList />
                    </Route>
                    <Route exact path="/movies/:movieId">
                        <MovieDetails />
                    </Route>
                    <Route path="/movies/edit/:movieId">
                        <EditMovie />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

//default export
export default App;

// const settings = 'my settings';

// //named export
// export { 
//     App,
//     settings
// }
