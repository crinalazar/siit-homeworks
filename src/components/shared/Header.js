import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import UserContext from '../auth/UserContext';

import '../../style/cooking-app.css';

function Header(){

    const email = localStorage.getItem('email');
    const { token, setToken} = useContext(AuthContext);
    const { userId } = useContext(UserContext);


    function handleLogout(e) {
        e.preventDefault();

        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('user');
    }
   
    return (
        <>
        <p className= "stickyName">Crina <span>L</span>azar</p>
        <div className="first-section">
            <header>
                <p> Your own recipe book</p>
            </header>
            
            <nav>
                <ul>
                    <li><Link to="/">
                            Home
                        </Link></li> 
                        { ( token ?
                    <li><Link to={"/user/" + userId}>
                            Profile
                        </Link></li> 
                        :
                        <li><Link  className="inactive" to="/user">
                            Profile
                        </Link></li> 
                        )}

                    <li>
                        { ( token ? 
                            <a href="/" onClick={ handleLogout }>Logout</a>
                        :
                            <>
                               <Link to="/login">
                                    Login
                                </Link> 
                                <Link className="register" to="/register">
                                    Register
                                </Link> 
                            </>
                        )}
                    </li>
                </ul>
            </nav>
            { ( token, email ? <p className = "userLogged">Logged in as {email} </p> : <p> </p>)}
        </div>
        </>

    )

    }

export default Header;