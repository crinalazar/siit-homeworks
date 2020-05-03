import React, { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import UserContext from './UserContext';
var jwt = require("jsonwebtoken");

const errorMessages = {
    'email': 'You must enter an email!',
    'password': 'You must enter a password!',
    'account': 'Incorrect password or email!'
};

export default function Login() {
    const [formData, setFormData] = useState({
        'email': '',
        'password': '',
    });

    const [formError, setFormError] = useState({
        'email': '',
        'password': '',
    });

   
    const [globalErrorMessage, setGlobalError] = useState('');
    const [isSuccessfull, setSuccessfull] = useState(false);
    const [isDirty, setDirty] = useState(false);
    const { setToken} = useContext(AuthContext);
    const { setUserId } = useContext(UserContext);
    
    // let [user, setUser] = useState([]);

    // useEffect(() => {
    //     checkUsers();
    //  }, []);
    
    //  async function checkUsers(){
    //     const res = await axios.get('http://localhost:5000/Users', 
    //     { params: { Email: formData.email, Password: formData.password }});
    //     setUser(res.data.length);
    //     console.log(res.data.length);
    // };
    
    async function handleSubmit(e) { 
        e.preventDefault(); 

        setGlobalError('');
        setSuccessfull(false);

        const isInvalid = validateFormData();
       
        if(!(await isInvalid).valueOf(isInvalid)) {
            
            setDirty(false);
                const res = await  axios.get('http://localhost:5000/Users', 
                { params: { Email: formData.email, Password: formData.password }});

                if (res.data.length == 1){
                    const email = formData.email;
                    localStorage.setItem('email', email);
                    const token = jwt.sign({formData}, 'secretKey');
                    let userId = res.data[0].id;
                    setUserId(userId);
                    setToken(token);
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('name', res.data[0].FirstName);
                    localStorage.setItem('surname', res.data[0].LastName);
                    setSuccessfull(true);
                 } else {
                   setGlobalError(errorMessages["account"]);
                 }
        }
    }

    function validateFormData() {
        const inputs = ['email', 'password'];
        const newError = { ...formError };
        let isInvalid = false;
        
        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        setFormError(newError);
        return isInvalid;
    }

    function handleInputChange(e) {
        setDirty(true);

        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });

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
            { (globalErrorMessage ?  
                <div role="alert">
                    { globalErrorMessage }
                </div>
            : null) }

            { (isSuccessfull ?  
                <div className="success" role="alert">
                    You have been successfully logged in!
                </div>
            : null) }
            <form className="form" onSubmit={ handleSubmit }>
                <div className="formField">
                    <label htmlFor="email">Email: </label>
                    <input 
                        onChange= { handleInputChange }
                        value= { formData.email }
                        type="text"
                        className={ 'form-control' + (formError.email ? ' is-invalid' : '') }
                        id="email"
                        placeholder="Enter email"
                    />
                    <div>
                        { formError.email }
                    </div>
                </div>
                <div className="formField">
                    <label htmlFor="password">Password: </label>
                    <input
                        onChange={ handleInputChange }
                        value={ formData.password }
                        type="password"
                        className={ 'form-control' + (formError.password ? ' is-invalid' : '') }
                        id="password"
                        placeholder="Password"
                    />
                    <div>
                        { formError.password }
                    </div>
                </div>
                <button type="submit" className="formButton" disabled={ !isDirty }>Login</button>
            </form>
        </>
    )
}

