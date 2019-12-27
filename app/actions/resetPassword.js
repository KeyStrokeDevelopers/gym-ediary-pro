import * as types from './actionConstants';
import { resetPasswordApi, userData } from '../api/resetPassword'

export const toggleAction = { type: types.TOGGLE_SIDEBAR };
export const openMenuAction = { type: types.OPEN_MENU };

const openAction = initialLocation => {
    console.log('response in opein action ', initialLocation);
}

// ({
//     type: types.OPEN_SUBMENU,
//     initialLocation
// });

const changeThemeAction = theme => ({
    type: types.CHANGE_THEME,
    theme
});

export const resetPassword = (data) => {
    console.log('sign in data in action -----', data);
    return (dispatch) => {
        resetPasswordApi(data).then((response) => {
            console.log('response ----', response);
            // dispatch(openAction(response))
        })
            .catch((err) => {
                console.log('error-----', error);
            })
    }
}