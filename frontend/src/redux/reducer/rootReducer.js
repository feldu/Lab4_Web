import {combineReducers} from "redux";
import {authorizationReducer} from "./authorizationReducer";
import {pointsReducer} from "./pointsReducer";

export const rootReducer = combineReducers({
    authorization: authorizationReducer,
    points: pointsReducer
});