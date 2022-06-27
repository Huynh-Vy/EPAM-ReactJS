import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    diabled: PropTypes.bool,
};

function InputField(props) {
    const { form, name, label, disabled } = props;
    const { formState } = form;
    const hasError = formState.errors[name];

    return (
        <Controller
            name={name}
            control={form.control}

            label={label}
            disabled={disabled}
            render={({ field }) => {
                return (
                    <TextField 
                        label={label}
                        fullWidth 
                        autoFocus 
                        margin="normal" 
                        variant="outlined"
                        error={!!hasError}
                        helperText={formState.errors[name]?.message}
                        {...field} 
                    />)
            }}
        />
    );
}

export default InputField;