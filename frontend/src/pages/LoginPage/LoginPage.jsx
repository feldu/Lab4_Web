import React from 'react';
import Header from "./components/Header/Header";
import './LoginPage.css'
import LoginPageBody from "./components/LoginBody/LoginPageBody";


export default function LoginPage() {
    return (
        <div className="login_wrapper">
            <Header/>
            <LoginPageBody/>
        </div>
    );
}
