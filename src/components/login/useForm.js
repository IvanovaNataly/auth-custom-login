import { useState } from 'react';
import { loginFields } from './LoginForm.jsx';

const useForm = ({ initState, callback, validator }) => {
    const [state, setState] = useState(initState);
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setState(() => ({
            ...state,
            [name]: value
        }));
    };

    const handleBlur = e => {
        const { name: fieldName } = e.target;
        const failedFields = validator(state, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(failedFields)[0]
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const { name: fieldName } = e.target;
        const failedFields = validator(state, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(failedFields)[0]
        }));
        if (!failedFields.length) callback();
    };

    const handleError = (err) => {
        console.log(err);
        setErrors(() => ({
            ...errors,
            [loginFields.EMAIL]: '',
            [loginFields.PASSWORD]: err.policy || err.description
        }));
        console.log(errors);
    }

    return {
        handleChange,
        handleSubmit,
        handleBlur,
        handleError,
        state,
        errors
    };
};

export default useForm;
