import * as constants from "../constants";
import * as actions from "../actions";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:31510";

export function showMessage(payload) {
    return function (dispatch) {
        dispatch({type: constants.SHOW_MESSAGE, payload});
        setTimeout(() => dispatch(actions.hideError()), 3000)
    };
}

export function registerUser(user) {
    return function (dispatch, getState) {
        try {
            axios
                .post('/auth/register', user,
                    setHeaders(getState().authorization.currentUser))
                .then(response => {
                    dispatch(showMessage({message: response.data, isError: false}))
                })
                .catch(e => {
                    if (e.response.status === 400)
                        dispatch(showMessage({message: e.response.data, isError: true}));
                });
        } catch (e) {
            console.log("SingUp error", e);
        }
    }
}

export function loginUser(user) {
    return function (dispatch, getState) {
        try {
            axios
                .post('/auth/login', user,
                    setHeaders(getState().authorization.currentUser))
                .then(response => {
                    user = {username: user.username, token: response.data};
                    localStorage.setItem("token", response.data);
                    localStorage.setItem("username", user.username);
                    dispatch(actions.signIn(user));
                })
                .catch(e => {
                    if (e.response.status === 400)
                        dispatch(showMessage({message: e.response.data, isError: true}))
                })
        } catch (e) {
            console.log("SignIn error", e);
        }

    }
}

export function addUser(user, thunk) {
    return function (dispatch, getState) {
        Object.keys(getState().authorization.invalidInputs).forEach(field => getState().authorization.invalidInputs[field] && dispatch(actions.resetInvalidField(field)));
        dispatch(actions.validateUser(user));
        if (!Object.values(getState().authorization.invalidInputs).includes(true)) {
            dispatch(thunk(user));
        } else {
            setTimeout(() => {
                Object.keys(getState().authorization.invalidInputs).forEach(field => getState().authorization.invalidInputs[field] && dispatch(actions.resetInvalidField(field)));
            }, 3000);
        }
    }
}

export function logout() {
    return function (dispatch) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        dispatch(actions.signOut());
    }
}

export function addPoint(point) {
    return function (dispatch, getState) {
        Object.keys(getState().points.invalidInputs).forEach(field => getState().points.invalidInputs[field] && dispatch(actions.resetInvalidField(field)));
        dispatch(actions.validatePoint(point));
        if (!Object.values(getState().points.invalidInputs).includes(true)) {
            dispatch(sendPoint({...point, R: point.R.toString()}))
        } else {
            setTimeout(() => {
                Object.keys(getState().points.invalidInputs).forEach(field => getState().points.invalidInputs[field] && dispatch(actions.resetInvalidField(field)));
            }, 3000);
        }
    }
}

export function sendPoint(point) {
    return function (dispatch, getState) {
        try {
            axios
                .post('/areas/points', {x: point.X, y: point.Y, r: point.R},
                    setHeaders(getState().authorization.currentUser))
                .then(() => {
                    dispatch(getAllPoints());
                })
                .catch(e => {
                    console.log(e)
                });
        } catch (e) {
            console.log("Send point error", e);
        }

    }
}

export function getAllPoints() {
    return function (dispatch, getState) {
        try {
            axios
                .get('/areas/points',
                    setHeaders(getState().authorization.currentUser))
                .then(response => {
                    dispatch(actions.clearPoints());
                    response.data.forEach(point => dispatch(actions.addPoint(point)));
                })
                .catch(e => {
                    console.log(e);
                });
        } catch (e) {
            console.log("Get all points error", e);
        }

    }
}

function setHeaders(currentUser) {
    if (currentUser) {
        return {
            headers: {
                'Authorization': "Bearer " + currentUser.token,
            }
        }
    }
    return {headers: {}}

}
