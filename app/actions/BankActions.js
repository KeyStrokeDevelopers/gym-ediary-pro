import { FETCH_BANK_DATA, SEARCH_BANK_DATA, EDIT_BANK_DATA, DELETE_BANK_DATA, ADD_BANK_DATA } from '../../actions/actionConstants';


export const fetchBankData = bankData => ({
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
    type: ADD_BANK_DATA,
    payload: bankData
});



