import React from 'react';
import img from '../error.png';

const ErrorMessage = () =>{
    return(
        <div>
            <img src={img} alt="error"></img>
        </div>
    )
}

export default ErrorMessage;