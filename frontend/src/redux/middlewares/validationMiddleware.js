import * as constants from "../constants";
import * as actions from "../actions";

export function validationMiddleware({dispatch}) {
    return function (next) {
        return function (action) {
            if (action.type === constants.VALIDATE_POINT) {
                const {X, Y, R} = {...action.payload};
                if (!['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'].includes(X)) {
                    dispatch(actions.setInvalidField("xField"));
                }
                if (Y.trim() === "" || !isFinite(+Y) || (Y <= -5 || Y >= 3)) {
                    dispatch(actions.setInvalidField("yField"));
                }
                if (!['1', '2', '3', '4'].includes(R)) {
                    dispatch(actions.setInvalidField("rField"));
                }
            }
            if (action.type === constants.VALIDATE_USER) {
                const {username, password} = {...action.payload};
                if (username.length < 4 || username.length > 20) {
                    dispatch(actions.setInvalidField("loginField"));
                }
                if (password.length < 4 || password.length > 20) {
                    dispatch(actions.setInvalidField("passwordField"));
                }
            }
            return next(action)
        }
    }
}