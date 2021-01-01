import React from 'react';

import './LoginPageBody.css'
import LoginForm from "./LoginForm/LoginForm";
import {useSelector} from "react-redux";


function LoginPageBody() {
    const message = useSelector(state => state.authorization.authorizationInfo);
    return (
        <div className="login_content">
            {message.isError ? <h1 className="error">{message.message}</h1> : (
                message.message ? <h1 className="success">{message.message}</h1> :
                    <h1>Только зарегистрированные пользователи могут ломать мою лабу</h1>)}
            <div className="login_content_row">
                <div className="column">
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
}

export default LoginPageBody;
