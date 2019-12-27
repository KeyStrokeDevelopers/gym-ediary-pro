import * as types from './actionConstants';
import { signInApi } from '../api/signIn'
import history from '../utils/history'

export const toggleAction = { type: types.TOGGLE_SIDEBAR };
export const openMenuAction = { type: types.OPEN_MENU };

const setStaffInfo = staffData => {
    if (staffData.token) {
        window.localStorage.setItem('token', staffData.token)
        history.push('/app/dashboard');
    }
    return {
        type: types.LOGIN_STAFF,
        payload: staffData
    }
}

const loginError = err => {
    console.log('erro in login ', err);
    return {
        type: types.LOGIN_ERROR,
        payload: err
    }
}

export const signIn = (data) => {
    return (dispatch) => {
        signInApi(data).then((response) => {
            console.log('response data --------', response.data);
            dispatch(setStaffInfo(response.data))
        })
            .catch((err) => {
                console.log('error-----', err);
                dispatch(loginError(err));
            })
    }
}