import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import {rootReducer} from './redux/reducer/rootReducer';
import {validationMiddleware} from "./redux/middlewares/validationMiddleware";
import App from './App';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, validationMiddleware)));


const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));