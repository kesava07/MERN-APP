import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    loading: false,
    userData: null,
    error: null,
    redirect: false,
    token: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_UP_START: return {
            ...state,
            loading: true,
            error: null
        };
        case actionTypes.SIGN_UP_SUCCESS: return {
            ...state,
            loading: false,
            redirect: true,
            error: null
        };
        case actionTypes.SIGN_UP_FAILURE: return {
            ...state,
            loading: false,
            redirect: false,
            error: action.payload
        };
        case actionTypes.LOGIN_START: return {
            ...state,
            loading: true,
            error: null
        };
        case actionTypes.LOGIN_SUCCESS: return {
            ...state,
            loading: false,
            redirect: true,
            error: null,
            userData: action.user,
            token: action.token
        };
        case actionTypes.CLEAR_REDIRECT: return {
            ...state,
            redirect: false
        }
        case actionTypes.LOGIN_FAILURE: return {
            ...state,
            loading: false,
            redirect: false,
            error: action.payload
        };
        case actionTypes.LOGOUT_USER: return {
            ...state,
            userData: null,
            token: null,
            redirect: false
        }
        default: return state;
    }
}

export default authReducer;