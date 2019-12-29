import { List, Map } from 'immutable';
import { FETCH_PACKAGE_DATA, SEARCH_PACKAGE_DATA, EDIT_PACKAGE_DATA, DELETE_PACKAGE_DATA, ADD_PACKAGE_DATA } from '../../actions/actionConstants';


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
    packageData: '',
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_PACKAGE_DATA:
            return {}
        case SEARCH_PACKAGE_DATA:
            return {}
        case EDIT_PACKAGE_DATA:
            return {}
        case ADD_PACKAGE_DATA:
            return {}
        case DELETE_PACKAGE_DATA:
            return {}
        default:
            return state;
    }
}