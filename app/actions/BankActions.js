import {
    FETCH_BANK_DATA, SEARCH_BANK_DATA, EDIT_BANK_DATA, DELETE_BANK_DATA, ADD_BANK_DATA,
    ERROR_BANK_DATA, SHOW_DETAIL_BANK, HIDE_DETAIL_BANK, SUBMIT_BANK_DATA, CLOSE_BANK_FORM, TOGGLE_FAVORITE_BANK, CLOSE_NOTIF
} from '../actions/actionConstants';

import { addBankApi, getBankApi } from '../api/bank'

const fetchBankData = bankData => ({
    type: FETCH_BANK_DATA,
    payload: bankData
});

export const editBankData = bankData => ({
    type: EDIT_BANK_DATA,
    payload: bankData
});

export const searchBankData = bankData => ({
    type: SEARCH_BANK_DATA,
    payload: bankData
});

export const deleteBankData = bankData => ({
    type: DELETE_BANK_DATA,
    payload: bankData
});



export const addBankData = bankData => ({
    type: ADD_BANK_DATA
});

export const closeAction = () => ({
    type: CLOSE_BANK_FORM
})

export const errorBankData = error => ({
    type: ERROR_BANK_DATA,
    payload: error
})

export const submitAction = bankData => ({
    type: SUBMIT_BANK_DATA,
    payload: bankData,
    // newData,
    // avatar
});

export const submitBankData = (data) => {
    console.log('data in add bank action -----', data);
    return (dispatch) => {
        addBankApi(data).then((response) => {
            console.log('response data --------', response.data);
            dispatch(submitAction(response.data))
        })
            .catch((err) => {
                console.log('error-----', err);
                dispatch(errorBankData(err));
            })
    }
}

export const getBankData = (data) => {
    console.log('data access from db ------')
    return (dispatch) => {
        getBankApi().then((response) => {
            console.log('response from db in get bank data', response.data)
            dispatch(fetchBankData(response.data))
        }).catch((err) => {
            console.log('err----', err);
            dispatch(errorBankData(err))
        })
    }
}




// export const fetchAction = items => ({
//     type: types.FETCH_CONTACT_DATA,
//     items,
// });

// export const showDetailAction = item => ({
//     type: types.SHOW_DETAIL_CONTACT,
//     item,
// });

// export const hideDetailAction = {
//     type: types.HIDE_DETAIL,
// };

// export const submitAction = (newData, avatar) => ({
//     type: types.SUBMIT_CONTACT,
//     newData,
//     avatar
// });

// export const addAction = {
//     type: types.ADD_CONTACT,
// };

// export const editAction = item => ({
//     type: types.EDIT_CONTACT,
//     item,
// });

// export const searchAction = keyword => ({
//     type: types.SEARCH_CONTACT,
//     keyword,
// });

// export const removeAction = item => ({
//     type: types.DELETE_CONTACT,
//     item,
// });

// export const closeAction = {
//     type: types.CLOSE_CONTACT_FORM,
// };

// export const addToFavoriteAction = item => ({
//     type: types.TOGGLE_FAVORITE,
//     item,
// });

// export const closeNotifAction = {
//     type: types.CLOSE_NOTIF
// };

