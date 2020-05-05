import React, { useState} from 'react';
import axios from 'axios';
import '../../style/cooking-app.css';


    const errorMessages = {
        'Email': 'You must enter an email!',
        'existing-email': "Email already existing!",
        'Password': 'You must enter a password!',
        'Retype-password': 'Please retype the password!',
        'different-passwords': 'Same password twice!',
        'no-numbers': 'Please enter a valid email address!',
        'Age': 'You must enter your age!',
        'numbers-only': 'Only numbers allowed!',
        'FirstName': 'You must enter your first name!',
        'LastName': 'You must enter your last name!'
    };

    function Register(){
        const [formData, setFormData] = useState({
            'FirstName': '',
            'LastName': '',
            'Age': '',
            'Email': '',
            'Password': '',
            'Retype-password': ''
        });

    const [formError, setFormError] = useState({
        'FirstName': '',
        'LastName': '',
        'Age': '',
        'Email': '',
        'Password': '',
        'Retype-password': '',
        'Different-passwords': ''
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

        if(e.currentTarget.id === 'Password' || e.currentTarget.id === 'Retype-password') {
            newError['different-passwords'] = '';
        }

        setFormError(newError);
    }

    const [globalErrorMessage, setGlobalError] = useState('');

    const [isSuccessfull, setSuccessfull] = useState(false);

    const [isDirty, setDirty] = useState(false);

    async function handleSubmit(e) { 
        e.preventDefault(); 

        setGlobalError('');

        const isInvalid = validateFormData();
        
        if(!(await isInvalid).valueOf(isInvalid)) {
                localStorage.removeItem('email');
                setDirty(false);
                try {
                    await axios.post('http://localhost:5000/Users/',formData );                         
                    setSuccessfull(true);
                    
                } catch(e) {
                    setGlobalError(e.response.data.message);
                } 
    }
    }

    async function validateFormData() { 
        const email = formData.Email;
        const res = await axios.get('http://localhost:5000/Users', { params: { Email: email }} );
        const inputs = ['Email', 'Password', 'Retype-password', 'Age', 'FirstName', 'LastName'];
        const newError = { ...formError };
        let isInvalid = false;

        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        if(!(/^[a-z0-9\.@\_]+$/i.test(formData.Email)) && (formData.Email !== "")) {
            newError.Email = errorMessages['no-numbers'];
            isInvalid = true;
        }

        if(!(/^[0-9]+$/i.test(formData.Age)) && (formData.Age !== "")) {
            newError.Age = errorMessages['numbers-only'];
            isInvalid = true;
        }

        if(formData.Password !== formData['Retype-password']) {
            newError['different-passwords'] = errorMessages['different-passwords'];
            isInvalid = true;
         }

         if((res.data.length == 1) && (formData.Email !== "")){
            newError['Email'] = errorMessages['existing-email'];
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
                    <label htmlFor="fname">First name: </label>
                    <input 
                            onChange={ handleInputChange }
                            value={formData.FirstName}
                            type="text"
                            id="FirstName"
                            placeholder="Enter first name"
                    />
                    <div className="invalid-feedback">
                        { formError.FirstName }
                    </div>
                </div>

                <div className="formField">
                    <label htmlFor="lname">Last name: </label>
                    <input 
                            onChange={ handleInputChange }
                            value={formData.LastName}
                            type="text"
                            id="LastName"
                            placeholder="Enter last name"
                    />
                    <div className="invalid-feedback">
                        { formError.LastName }
                    </div>
                </div>

                <div className="formField">
                    <label htmlFor="age">Age: </label>
                    <input 
                            onChange={ handleInputChange }
                            value={formData.Age}
                            type="text"
                            id="Age"
                            placeholder="Enter age"
                    />
                    <div className="invalid-feedback">
                        { formError.Age }
                    </div>
                </div>

                <div className="formField">
                    <label htmlFor="email">Email: </label>
                    <input 
                            onChange={ handleInputChange }
                            value={formData.Email}
                            type="text"
                            id="Email"
                            placeholder="Enter email"
                    />
                    <div className="invalid-feedback">
                        { formError.Email }
                    </div>
                </div>

                <div className="formField">
                    <label htmlFor="password">Password: </label>
                    <input
                        onChange={ handleInputChange }
                        value={ formData.Password }
                        type="password"
                        id="Password"
                        placeholder="Password"
                    />
                     <div className="invalid-feedback">
                        { formError.Password }
                    </div>
                </div>

                <div className="formField">
                    <label htmlFor="retype-password">Retype Password: </label>
                    <input
                        onChange={ handleInputChange }
                        value={ formData['retype-password'] }
                        type="password"
                        id="Retype-password"
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