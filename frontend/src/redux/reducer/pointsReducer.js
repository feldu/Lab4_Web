import * as constants from "../constants";

const initialState = {
    currentR: null,
    points: [],
    invalidInputs: {
        xField: false,
        yField: false,
        rField: false,
    }
};

export const pointsReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.ADD_POINT:
            return {...state, points: state.points.concat([action.payload])};
        case constants.CLEAR_POINTS:
            return {...state, points: []};
        case constants.CHANGE_R:
            return {...state, currentR: +action.payload};
        case constants.VALIDATE_POINT:
            return state;
        case constants.SET_INVALID_FIELD:
            return {...state, invalidInputs: {...state.invalidInputs, [action.payload]: true}};
        case constants.RESET_INVALID_FIELD:
            return {...state, invalidInputs: {...state.invalidInputs, [action.payload]: false}};
        default:
            return state;
    }
};