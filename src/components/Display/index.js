import React from 'react';
import './styles.css';

export default props => (
    <div className="display" title={props.value}>
        {props.value}
    </div>
);
