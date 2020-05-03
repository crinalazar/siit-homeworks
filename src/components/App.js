import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';

import RecipeList from './recipes/RecipeList';
import Header from './shared/Header';
import Footer from './shared/Footer';
import User from './users/UserProfile';
import UserRecipes from './users/UserRecipes';
import RecipeDetails from './recipes/RecipeDetails'
import Register from './auth/Register';
import Login from './auth/Login';
import '../style/cooking-app.css';
import AuthContext from './auth/AuthContext';
import UserContext from './auth/UserContext';


function App(){

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setToken(token);
        }
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if(userId) {
            setUserId(userId);
        }
    }, []);
   

    return(
        <AuthContext.Provider value={ {token, setToken}}>
            <UserContext.Provider value={ {userId, setUserId}} >
            <BrowserRouter>
                <Header />
                <div className="container">
                    <Route exact path="/">
                        <RecipeList />
                    </Route>
                    <PrivateRoute path="/user/:id">
                        <User />
                    </PrivateRoute>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <PrivateRoute path="/recipes/:recipeId">
                        <RecipeDetails />
                    </PrivateRoute>
                </div>
                <Footer />
            </BrowserRouter>
            </UserContext.Provider>
        </AuthContext.Provider>
    )
}

export default App;