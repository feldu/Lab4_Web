import * as constants from "../constants";

const username = localStorage.getItem("username"),
    token = localStorage.getItem("token");

const currentUser = (username && token) ? {username: username, token: token} : null;

const initialState = {
    currentUser: currentUser,
    authorizationInfo: {
        message: null,
        isError: null
    },
    invalidInputs: {
        loginField: false,
        passwordField: false,
    }
};

export const authorizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.SIGN_IN:
            return {...state, currentUser: action.payload};
        case constants.SIGN_OUT:
            return {...state, currentUser: null};
        case constants.SHOW_MESSAGE:
            return {...state, authorizationInfo: action.payload};
        case constants.HIDE_MESSAGE:
            return {...state, authorizationInfo: {message: "", isError: false}};
        case constants.VALIDATE_USER:
            return state;
        case constants.SET_INVALID_FIELD:
            return {...state, invalidInputs: {...state.invalidInputs, [action.payload]: true}};
        case constants.RESET_INVALID_FIELD:
            return {...state, invalidInputs: {...state.invalidInputs, [action.payload]: false}};
        default:
            return state;
    }
};