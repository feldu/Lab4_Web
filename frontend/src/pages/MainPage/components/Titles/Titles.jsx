import React from 'react';
import './Titles.css';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import * as thunks from "../../../../redux/thunks";

export default function Titles() {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(thunks.logout())
    };
    return (
        <div>
            <h2><Link to="/" onClick={logout}>Лаба сломалась...</Link></h2>
            <h1>Попадёт ли точка на плоскости в заданную область?</h1>
        </div>
    )
}
