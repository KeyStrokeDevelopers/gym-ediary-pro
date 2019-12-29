import { List, Map } from 'immutable';
import { FETCH_CATEGORY_DATA, SEARCH_CATEGORY_DATA, EDIT_CATEGORY_DATA, DELETE_CATEGORY_DATA, ADD_CATEGORY_DATA } from '../../actions/actionConstants';


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
    categoryData: '',
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_CATEGORY_DATA:
            return {}
        case SEARCH_CATEGORY_DATA:
            return {}
        case EDIT_CATEGORY_DATA:
            return {}
        case ADD_CATEGORY_DATA:
            return {}
        case DELETE_CATEGORY_DATA:
            return {}
        default:
            return state;
    }
}