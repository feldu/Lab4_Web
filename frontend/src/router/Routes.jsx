import React, {useEffect} from 'react';

import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import * as thunks from "../redux/thunks";


export function Routes() {
    const currentUser = useSelector(state => state.authorization.currentUser);
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        if (token && username) {
            dispatch(thunks.getAllPoints());
        }
    });
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/"><Redirect to='/auth'/></Route>
                <Route path='/auth'>{(currentUser && currentUser.token) ? <Redirect to='/areas'/> :
                    <LoginPage/>}</Route>
                <Route path='/areas'>{(currentUser && currentUser.token) ? <MainPage/> :
                    <ErrorPage code={"403"}/>}</Route>
                <Route path="*"> <ErrorPage code={"404"}/> </Route>
            </Switch>
        </BrowserRouter>
    )
}