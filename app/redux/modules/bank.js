import { List, Map } from 'immutable';
import { FETCH_BANK_DATA, SEARCH_BANK_DATA, EDIT_BANK_DATA, DELETE_BANK_DATA, ADD_BANK_DATA } from '../../actions/actionConstants';


const initialState = {
    contactList: List([]),
    formValues: Map(),
    selectedIndex: 0,
    selectedId: '',
    keywordValue: '',
    avatarInit: '',
    openFrm: false,
    showMobileDetail: false,
    notifMsg: '',
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_BANK_DATA:
            return {}
        case SEARCH_BANK_DATA:
            return {}
        case EDIT_BANK_DATA:
            return {}
        case ADD_BANK_DATA:
            return {}
        case DELETE_BANK_DATA:
            return {}
        default:
            return state;
    }
}
