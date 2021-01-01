import React from 'react';
import './ErrorPage.css'

export default function ErrorPage({code}) {
    return (
        <div className="error_wrapper">
            <h1>{code}</h1>
        </div>
    );
}
