import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

function Input(props) {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange ? (e) => props.onChange(e) : null}
        />
    );
}

export default Input;