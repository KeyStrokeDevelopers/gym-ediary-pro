import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_ACCOUNT_INFO_DATA, SEARCH_ACCOUNT_INFO_DATA, EDIT_ACCOUNT_INFO_DATA, ADD_ACCOUNT_INFO_DATA, SET_ACCOUNT_INFO_DETAILS_FIELD,
  SHOW_DETAIL_ACCOUNT_INFO, HIDE_DETAIL_ACCOUNT_INFO, SUBMIT_ACCOUNT_INFO_DATA, CLOSE_ACCOUNT_INFO_FORM, LOADING_ACTION_ACCOUNT_INFO, CLOSE_ACCOUNT_INFO_NOTIF, ERROR_ACCOUNT_INFO_DATA
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
  notifType: '', // success or error
  openNoti: true,
  isActive: true,
  isLoading: false,
  isFormReset: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ACCOUNT_INFO_DATA:
      return {
        ...state,
        accountInfoList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
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
        isFormReset: false,
        formValues: action.payload,
        isLoading: false,
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_ACCOUNT_INFO_DATA:
      return {
        ...state,
        openFrm: true,
        isFormReset: false,
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
        isFormReset: true,
        accountInfoList: [...state.accountInfoList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
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

    case CLOSE_ACCOUNT_INFO_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_ACCOUNT_INFO_DATA: {
      return {
        ...state,
        notifMsg: action.payload,
        notifType: notifT.error,
        openNoti: true,
        selectedIndex: 0
      };
    }

    default:
      return state;
  }
}
