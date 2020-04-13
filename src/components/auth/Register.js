import React, { useState, useContext } from 'react';
import axios from 'axios';
import qs from 'qs';

import AuthContext from './AuthContext';

const errorMessages = {
    'username': 'You must enter a username!',
    'password': 'You must enter a password!',
    'retype-password': 'You must retype the password!',
    'different-passwords': 'You must enter the same password twice!',
    'no-numbers': 'Your username cannot contain any special characters or numbers!',
};

function Register() {
    // Vom stoca aici toate value-urile input-urilor din formular
    const [formData, setFormData] = useState({
        'username': '',
        'password': '',
        'retype-password': ''
    });

    // Vom seta cate un mesaj de eroare pentru fiecare form field in parte in cazul in care e eronat campul
    const [formError, setFormError] = useState({
        'username': '',
        'password': '',
        'retype-password': '',
        'different-passwords': ''
    });

    // O vom folosi pentru cand vine raspuns cu eroare de la server
    const [globalErrorMessage, setGlobalError] = useState('');
    // O vom folosi doar pentru mesajul de succes
    const [isSuccessfull, setSuccessfull] = useState(false);
    /*
        Vom folosi aceasta variabila de stare ca sa determinam daca formularul s-a modificat si vom face butonul
        disabled daca nu s-a modificat.       

        Prin urmare vom seta isDirty true atunci cand se declanseaza Change la orice input.

        De asemenea vom face isDirty false de fiecare data cand se da Submit.
    */
    const [isDirty, setDirty] = useState(false);

    const { setToken } = useContext(AuthContext);

    async function handleSubmit(e) { 
        e.preventDefault(); 

        setGlobalError('');

        const isInvalid = validateFormData();

        if(!isInvalid) {
            setDirty(false);
            try {
                const res = await axios('https://ancient-caverns-16784.herokuapp.com/auth/register',{
                    method: 'POST',
                    data: qs.stringify(formData),
                });

                setToken(res.data.accessToken);
                localStorage.setItem('token', res.data.accessToken);

                setSuccessfull(true);
            } catch(e) {
                setGlobalError(e.response.data.message);
            }
        }
    }

    function validateFormData() {
        const inputs = ['username', 'password', 'retype-password'];
        const newError = { ...formError };
        let isInvalid = false;
        
        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        if(!(/^[a-z0-9]+$/i.test(formData.username))) {
            newError.username = errorMessages['no-numbers'];
            isInvalid = true;
        }
        
        if(formData.password !== formData['retype-password']) {
           newError['different-passwords'] = errorMessages['different-passwords'];
           isInvalid = true;
        }

        setFormError(newError);
        return isInvalid;
    }

    function handleInputChange(e) {
        // const prop = e.currentTarget.id;
        // const newObj = { ...formData };
        // newObj[prop] = e.currentTarget.value;

        // setFormData(newObj);
        setDirty(true);

        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });

        // Aici resetam erorile in cazul in care se scrie din nou in inputuri
        const newError = { 
            ...formError, 
            [e.currentTarget.id]: '',
        };

        if(e.currentTarget.id === 'password' || e.currentTarget.id === 'retype-password') {
            newError['different-passwords'] = '';
        }

        setFormError(newError);
    }


    return (
        <>
            <h1>Register</h1>

            { (globalErrorMessage ?  
                <div className="alert alert-danger" role="alert">
                    { globalErrorMessage }
                </div>
            : null) }

            { (isSuccessfull ?  
                <div className="alert alert-success" role="alert">
                    Your username was created successfully!
                </div>
            : null) }

            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        onChange={ handleInputChange }
                        value={ formData.username }
                        type="text"
                        className={ 'form-control' + (formError.username ? ' is-invalid' : '') }
                        id="username"
                        placeholder="Enter username"
                    />
    
                    <div className="invalid-feedback">
                        { formError.username }
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={ handleInputChange }
                        value={ formData.password }
                        type="password"
                        className={ 'form-control' + (formError.password ? ' is-invalid' : '') }
                        id="password"
                        placeholder="Password"
                    />
                    <div className="invalid-feedback">
                        { formError.password }
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="retype-password">Retype Password</label>
                    <input
                        onChange={ handleInputChange }
                        value={ formData['retype-password'] }
                        type="password"
                        className={ 'form-control' + (formError['retype-password'] || formError['different-passwords']  ? ' is-invalid' : '') }
                        id="retype-password"
                        placeholder="Retype Password" 
                    />
                    <div className="invalid-feedback">
                        { formError['retype-password'] }
                        { formError['retype-password'] ? <br /> : '' }
                        { formError['different-passwords'] }
                    </div>
                    
                </div>
                <button type="submit" className="btn btn-primary" disabled={ !isDirty }>Register</button>
            </form>
        </>
    );
}

export default Register;