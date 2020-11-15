import React from 'react';
import './styles.css';

export default props => {
    let className = 'button ';
    if (props.operation) className += 'operation ';
    className += props.type;

    return (
        <button
            className={className}
            onClick={e => props.click && props.click(props.label)}
        >
            {props.label}
        </button>
    );
};
