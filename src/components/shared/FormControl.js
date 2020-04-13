import React, { useState, useEffect, useCallback } from 'react';

export default function FormControl({ type, name, label, validation, shouldValidate, onStatusChange }) {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleInputChange(e) {
        setIsDirty();
        setValue(e.currentTarget.value);
    }

    const setIsDirty = useCallback(
        () => {
            onStatusChange('isDirty', true);
        },
        [],
    )

    const setIsInvalid = useCallback(
        () => {
            onStatusChange('isInvalid', true);
        },
        [],
    )

    const setIsValid = useCallback(
        () => {
            onStatusChange('isInvalid', false);
        },
        [],
    )

    useEffect(() => {
        if(shouldValidate) {
            validateValue(value, validation, setErrorMessage, setIsInvalid, setIsValid);
        }
    }, [shouldValidate, value, validation, setIsValid, setIsInvalid]);
    
    return (
        <div className="form-group">
            <label htmlFor={ name }>{ label }</label>
            <input
                onChange={ handleInputChange }
                value={ value }
                type={ type }
                className={ 'form-control' + (errorMessage ? ' is-invalid' : '') }
                id={ name }
                placeholder={ label }
            />
            <div className="invalid-feedback">
                { errorMessage }
            </div>
        </div>
    )
}

function validateValue(value, validation, setErrorMessage, setIsInvalid, setIsValid) {
    if(validation.required && !value) {
        setErrorMessage(validation.messages.required);
        setIsInvalid();
        return;
    }

    if(validation.minLength && value.length < validation.minLength) {
        setErrorMessage(validation.messages.minLength);
        setIsInvalid();
        return;
    }

    setIsValid();
}
