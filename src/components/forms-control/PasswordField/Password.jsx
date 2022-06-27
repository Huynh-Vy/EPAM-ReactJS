import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    diabled: PropTypes.bool,
};


function PasswordField(props) {
    const { form, name, label, disabled } = props;
    const { formState } = form;
    const hasError = formState.errors[name];
    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword((x) => !x);
    };

    return (
        <FormControl fullWidth margin="normal" variant="outlined" error={!!hasError}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Controller
            name={name}
            control={form.control}
            render={({ field }) => {
                return (
                    <OutlinedInput 
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    label={label}
                    fullWidth 
                    autoFocus 
                    disabled={disabled}
                    variant="outlined"
                    margin="normal"
                    {...field} 
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            className="show-password-icon"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />)
            }}
        />
            <FormHelperText error={!!hasError}>
                {formState.errors[name]?.message}
            </FormHelperText>
        </FormControl>
    );
}

export default PasswordField;