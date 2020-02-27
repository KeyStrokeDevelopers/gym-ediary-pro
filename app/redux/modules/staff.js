import { Map } from 'immutable';
import {
  FETCH_STAFF_DATA, SEARCH_STAFF_DATA, EDIT_STAFF_DATA, ADD_STAFF_DATA, SET_STAFF_DETAILS_FIELD, FETCH_ACCESS_DATA,
  SHOW_DETAIL_STAFF, HIDE_DETAIL_STAFF, SUBMIT_STAFF_DATA, CLOSE_STAFF_FORM, LOADING_ACTION_STAFF
} from '../../actions/actionConstants';


const initialState = {
  staffList: [],
  accessList: [],
  formValues: {},
  selectedIndex: 0,
  selectedId: '',
  keywordValue: '',
  avatarInit: '',
  openFrm: false,
  showMobileDetail: false,
  notifMsg: '',
  isActive: true,
  isLoading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_STAFF_DATA:
      return {
        ...state,
        staffList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case SEARCH_STAFF_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_STAFF_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_STAFF_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_STAFF_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        staffList: action.payload,
        isLoading: false
      };
    case LOADING_ACTION_STAFF:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_STAFF: {
      const staffData = state.isActive ? state.staffList.filter(item => item.status === 1) : state.staffList.filter(item => item.status === 0);
      const index = staffData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }

    case CLOSE_STAFF_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_STAFF_DETAILS_FIELD:
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };

    case HIDE_DETAIL_STAFF:
      return {
        ...state,
        showMobileDetail: false
      };

    case FETCH_ACCESS_DATA:
      return {
        ...state,
        accessList: action.payload,
      };

    default:
      return state;
  }
}
