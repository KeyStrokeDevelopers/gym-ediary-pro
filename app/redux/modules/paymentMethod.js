import { List, Map } from 'immutable';
import { FETCH_PAYMENT_METHOD_DATA, SEARCH_PAYMENT_METHOD_DATA, EDIT_PAYMENT_METHOD_DATA, DELETE_PAYMENT_METHOD_DATA, ADD_PAYMENT_METHOD_DATA } from '../../actions/actionConstants';


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

    //created
    paymentMethodData: '',
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_PAYMENT_METHOD_DATA:
            return {}
        case SEARCH_PAYMENT_METHOD_DATA:
            return {}
        case EDIT_PAYMENT_METHOD_DATA:
            return {}
        case ADD_PAYMENT_METHOD_DATA:
            return {}
        case DELETE_PAYMENT_METHOD_DATA:
            return {}
        default:
            return state;
    }
}