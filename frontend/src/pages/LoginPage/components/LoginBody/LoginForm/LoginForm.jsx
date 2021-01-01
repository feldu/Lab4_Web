import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

import * as thunks from "../../../../../redux/thunks";
import './LoginForm.css';


export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const invalidInputs = useSelector(state => state.authorization.invalidInputs);
    const dispatch = useDispatch();

    const signUp = () => {
        dispatch(thunks.addUser({username, password}, thunks.registerUser));
        setPassword("");
    };

    const signIn = e => {
        e.preventDefault();
        dispatch(thunks.addUser({username, password}, thunks.loginUser));
    };
    const errorStyle = {
        backgroundColor: '#E40045',
        borderColor: '#94002D',
        boxShadow: '0 4px 4px #94002D'
    };

    return (
        <form className="login_form" onSubmit={signIn}>
            <div className="user_block field_block">
                <label htmlFor="login_field">Имя пользователя:</label>
                <InputText
                    autoComplete="off"
                    style={invalidInputs.loginField ? errorStyle : {}}
                    type="text"
                    id="login_field"
                    placeholder="От 4 до 20 символов"
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                />
            </div>
            <div className="password_block field_block">
                <label htmlFor="password_field">Пароль:</label>
                <InputText
                    type="password"
                    style={invalidInputs.passwordField ? errorStyle : {}}
                    id="password_field"
                    placeholder="От 4 до 20 символов"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                />
            </div>
            <div className="buttons_block field_block">
                <Button
                    type="button"
                    className="send_button"
                    label="Зарегистрироваться"
                    onClick={signUp}
                />
                <Button
                    type="submit"
                    className="send_button"
                    label="Войти"
                />
            </div>
        </form>
    );
}
