import * as constants from "../constants";

export const signIn = payload => ({
    type: constants.SIGN_IN,
    payload,
});
export const signOut = () => ({
    type: constants.SIGN_OUT,
});
export const hideError = () => ({
    type: constants.HIDE_MESSAGE,
});

export const addPoint = payload => ({
    type: constants.ADD_POINT,
    payload,
});
export const clearPoints = () => ({
    type: constants.CLEAR_POINTS
});

export const validatePoint = (payload) => ({
    type: constants.VALIDATE_POINT,
    payload
});

export const validateUser = (payload) => ({
    type: constants.VALIDATE_USER,
    payload
});

export const setInvalidField = (payload) => ({
    type: constants.SET_INVALID_FIELD,
    payload
});

export const resetInvalidField = (payload) => ({
    type: constants.RESET_INVALID_FIELD,
    payload
});

export const changeR = (payload) => ({
    type: constants.CHANGE_R,
    payload
});