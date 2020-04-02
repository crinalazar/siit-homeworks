import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

function Header(props) {
    const { token, setToken } = useContext(AuthContext);

    function handleLogout(e) {
        e.preventDefault();

        setToken(null);
        localStorage.removeItem('token');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Movie Database</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav w-100">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                            Home <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        { ( token ? 
                            <a href="/" className="nav-link" onClick={ handleLogout }>Logout</a>
                        :
                            <>
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </>
                        )}
                    </li>
                    
                </ul>
                
            </div>
        </nav>
    );
}

export default Header;