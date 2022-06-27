import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm/RegisterForm';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();

    const handleRegisterFormSubmit = (values) => {
        const action = register(values);
        dispatch(action);

        // close Dialog
        const { closeDialog } = props;
        if (closeDialog) {
            closeDialog();
        }
        
    }

    return (
        <div>
            <RegisterForm onSubmit={handleRegisterFormSubmit}/>
        </div>
    );
}

export default Register;