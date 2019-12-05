import * as actionTypes from '../ActionTypes';
import Axios from 'axios';

// signup
export const signupStart = () => ({
    type: actionTypes.SIGN_UP_START
});

export const signupSuccess = (user) => ({
    type: actionTypes.SIGN_UP_SUCCESS,
    payload: user
});

export const signupFailure = (error) => ({
    type: actionTypes.SIGN_UP_FAILURE,
    payload: error
});

export const handleSignup = (name, email, password) => {
    return (dispatch) => {
        dispatch(signupStart());
        const user = {
            userName: name,
            email: email,
            password: password
        }
        Axios.post('v1/auth/signup', user)
            .then(res => {
                dispatch(signupSuccess(res.data));
            })
            .catch(error => {
                dispatch(signupFailure(error));
            })
    }
}

// login
export const loginStart = () => ({
    type: actionTypes.LOGIN_START
});

export const loginSuccess = (token, user) => ({
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    user: user
});

export const loginFailure = (error) => ({
    type: actionTypes.LOGIN_FAILURE,
    payload: error
});

export const handleLogin = (email, password) => {
    return (dispatch) => {
        dispatch(loginStart());
        const user = {
            email: email,
            password: password
        }
        Axios.post('v1/auth/login', user)
            .then(res => {
                const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userData', JSON.stringify(res.data.user));
                localStorage.setItem('expirationTime', expirationTime);
                dispatch(loginSuccess(res.data.token, res.data.user));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(error => {
                dispatch(loginFailure(error));
            })
    }
}

export const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.LOGOUT_USER
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(handleLogout());
        }, expirationTime * 1000)
    }
}

export const authStateCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(handleLogout());
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime < new Date()) {
                dispatch(handleLogout());
            } else {
                const userData = JSON.parse(localStorage.getItem('userData'));
                dispatch(loginSuccess(token, userData));
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

export const clearRedirect=()=>({
    type: actionTypes.CLEAR_REDIRECT
})