import * as types from './actionConstants';
import { registerationApi, userData } from '../api/register'

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

export const registration = (data) => {
    return (dispatch) => {
        registerationApi(data).then((response) => {
            dispatch(openAction(response))
        })
            .catch((err) => {
                console.log('error-----', err);
            })
    }
}