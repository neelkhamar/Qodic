import { SET_CURRENT_USER, SET_USER_LOGOUT } from "../Types";

const INIT_STATE = {
    token: null,
    username: "",
    fullname: ""
};

const defaultState = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                token: action.payload.token,
                username: action.payload.username,
                fullname: action.payload.fullname
            };

        case SET_USER_LOGOUT:
            return {
                ...state,
                token: null,
                username: "",
                fullname: ""
            };

        default:
            return state;
    }
};

export default defaultState;