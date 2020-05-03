import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../../style/cooking-app.css';
import AuthContext from './AuthContext';
import UserContext from './UserContext';

var jwt = require("jsonwebtoken");


    const errorMessages = {
        'email': 'You must enter an email!',
        'existing-email': "Email already existing!",
        'password': 'You must enter a password!',
        'retype-password': 'You must retype the password!',
        'different-passwords': 'You must enter the same password twice!',
        'no-numbers': 'The username cannot contain any special characters!',
    };

    function Register(){
        const [formData, setFormData] = useState({
            'email': '',
            'password': '',
            'retype-password': ''
        });

    const [formError, setFormError] = useState({
        'email': '',
        'password': '',
        'retype-password': '',
        'different-passwords': ''
    });

    function handleInputChange(e){
        setDirty(true);
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })
        const newError = { 
            ...formError, 
            [e.currentTarget.id]: '',
        };

        if(e.currentTarget.id === 'password' || e.currentTarget.id === 'retype-password') {
            newError['different-passwords'] = '';
        }

        setFormError(newError);
    }

    const [globalErrorMessage, setGlobalError] = useState('');

    const [isSuccessfull, setSuccessfull] = useState(false);

    const [isDirty, setDirty] = useState(false);

    const { setToken } = useContext(AuthContext);

    async function handleSubmit(e) { 
        e.preventDefault(); 

        setGlobalError('');

        const isInvalid = validateFormData();
        
        if(!(await isInvalid).valueOf(isInvalid)) {
                localStorage.removeItem('email');
                setDirty(false);
                try {
                    await axios.post('http://localhost:5000/Users/',formData );
                    // const token = jwt.sign({formData}, 'secretKey');
                    // localStorage.setItem('email', formData.email);
                    // setToken(token);                          
                    setSuccessfull(true);
                    
                } catch(e) {
                    setGlobalError(e.response.data.message);
                } 
    }
    }

    async function validateFormData() { 
        const email = formData.email;
        const res = await axios.get('http://localhost:5000/Users', { params: { Email: email }} );
        const inputs = ['email', 'password', 'retype-password'];
        const newError = { ...formError };
        let isInvalid = false;

        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        if(!(/^[a-z0-9\.@\_]+$/i.test(formData.email))) {
            newError.email = errorMessages['no-numbers'];
            isInvalid = true;
        }

        if(formData.password !== formData['retype-password']) {
            newError['different-passwords'] = errorMessages['different-passwords'];
            isInvalid = true;
         }

         if(res.data.length == 1){
            newError['email'] = errorMessages['existing-email'];
            isInvalid = true;
         }
 
         setFormError(newError);
         return isInvalid;
    }

    return (
        <>
            { (globalErrorMessage ?  
                    <div role="alert">
                        { globalErrorMessage }
                    </div>
                : null) }

                { (isSuccessfull ?  
                    <div role="alert">
                        Your username was created successfully!
                    </div>
                : null) }

            <form className="form" onSubmit={ handleSubmit }>
                <div className="formField">
                    <label htmlFor="email">Email: </label>
                    <input 
                            onChange={ handleInputChange }
                            value={formData.email}
                            type="text"
                            id="email"
                            placeholder="Enter email"
                    />
                    <div className="invalid-feedback">
                        { formError.email }
                    </div>
                </div>

                <div className="formField">
                    <label htmlFor="password">Password: </label>
                    <input
                        onChange={ handleInputChange }
                        value={ formData.password }
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                     <div className="invalid-feedback">
                        { formError.password }
                    </div>
                </div>

                <div className="formField">
                    <label htmlFor="retype-password">Retype Password: </label>
                    <input
                        onChange={ handleInputChange }
                        value={ formData['retype-password'] }
                        type="password"
                        id="retype-password"
                        placeholder="Retype Password" 
                    />
                     <div className="invalid-feedback">
                        { formError['retype-password'] }
                        { formError['retype-password'] ? <br /> : '' }
                        { formError['different-passwords'] }
                    </div>
                </div>
                <button type="submit" className="formButton" disabled={!isDirty}>Register</button>
            </form>
        </>
    )

}


export default Register;