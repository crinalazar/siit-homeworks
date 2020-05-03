import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from './AuthContext';


export default function PrivateRoute({ children, ...rest }) {
    let { token } = useContext(AuthContext);
    if (!token) {
        token = localStorage.getItem('token');
    }
    return (
        <Route
        {...rest}
        render={({ location }) =>
            token ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
}