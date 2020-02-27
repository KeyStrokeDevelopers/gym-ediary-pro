import { Map } from 'immutable';
import {
  FETCH_ACCOUNT_INFO_DATA, SEARCH_ACCOUNT_INFO_DATA, EDIT_ACCOUNT_INFO_DATA, ADD_ACCOUNT_INFO_DATA, SET_ACCOUNT_INFO_DETAILS_FIELD,
  SHOW_DETAIL_ACCOUNT_INFO, HIDE_DETAIL_ACCOUNT_INFO, SUBMIT_ACCOUNT_INFO_DATA, CLOSE_ACCOUNT_INFO_FORM, LOADING_ACTION_ACCOUNT_INFO
} from '../../actions/actionConstants';


const initialState = {
  accountInfoList: [],
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
    case FETCH_ACCOUNT_INFO_DATA:
      return {
        ...state,
        accountInfoList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case SEARCH_ACCOUNT_INFO_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_ACCOUNT_INFO_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_ACCOUNT_INFO_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_ACCOUNT_INFO_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        accountInfoList: [...state.accountInfoList, action.payload],
        isLoading: false
      };
    case LOADING_ACTION_ACCOUNT_INFO:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_ACCOUNT_INFO:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_ACCOUNT_INFO_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_ACCOUNT_INFO_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_ACCOUNT_INFO: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    default:
      return state;
  }
}
