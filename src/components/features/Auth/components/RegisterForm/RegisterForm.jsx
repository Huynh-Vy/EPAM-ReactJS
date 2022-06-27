import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, Typography } from '@mui/material';
import InputField from 'components/forms-control/InputField/InputField';
import PasswordField from 'components/forms-control/PasswordField/Password';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

import './RegisterForm.scss';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const { onSubmit } = props;

    const schema = yup.object().shape({
        fullName: yup
            .string()
            .required('Please enter your full name')
            .test('Should have at least two words', 'Please enter at least two words', (value) => {
                return value.split(' ').length >= 2;
            }),
        email: yup
            .string()
            .required('Please enter your email')
            .email('Please enter valid email address'),
        password: yup
            .string()
            .required('Please enter your password')
            .min(6, 'Please enter at least 6 characters'),
        retypePassword: yup
            .string()
            .required('Please retype your password')
            .oneOf([yup.ref('password')],'Password does not match'), 
    });

    const form  = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = (values) => {
        if (onSubmit) {
            onSubmit(values);
        }
    }

    return (
        <div className="register-form">
            <Avatar className="lock-avatar">
                <LockOutlined />
            </Avatar>

            <Typography className="title" component="h1" variant="h5">
                Create An Account
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField form={form} name="fullName" label="Full Name"/>
                <InputField form={form} name="email" label="Email"/>
                <PasswordField form={form} name="password" label="Password"/>
                <PasswordField form={form} name="retypePassword" label="Retype Password"/>

                <Button type="submit" className="button" variant="contained" color="primary" fullWidth>
                    Create an account
                </Button>
            </form>
        </div>
        
    );
}

export default RegisterForm;