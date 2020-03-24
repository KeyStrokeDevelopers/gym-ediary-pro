import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_PURPOSE_DATA, SEARCH_PURPOSE_DATA, EDIT_PURPOSE_DATA, ADD_PURPOSE_DATA, SET_PURPOSE_DETAILS_FIELD, FETCH_ACCESS_DATA,
  SHOW_DETAIL_PURPOSE, HIDE_DETAIL_PURPOSE, SUBMIT_PURPOSE_DATA, CLOSE_PURPOSE_FORM, LOADING_ACTION_PURPOSE, CLOSE_PURPOSE_NOTIF, ERROR_PURPOSE_DATA, ACTIVE_PURPOSE_DATA, DELETE_PURPOSE_DATA, UPDATE_PURPOSE_DATA
} from '../../actions/actionConstants';


const initialState = {
  purposeList: [],
  accessList: [],
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
  isLoading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PURPOSE_DATA:
      return {
        ...state,
        purposeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };

    case UPDATE_PURPOSE_DATA:
      return {
        ...state,
        purposeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Purpose data updated',
        notifType: notifT.success,
        openNoti: true,
      };

    case DELETE_PURPOSE_DATA:
      return {
        ...state,
        purposeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Purpose data deleted',
        notifType: notifT.success,
        openNoti: true,
      };
    case ACTIVE_PURPOSE_DATA:
      return {
        ...state,
        purposeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Purpose data activated',
        notifType: notifT.success,
        openNoti: true,
      };
    case SEARCH_PURPOSE_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_PURPOSE_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: action.payload,
        isLoading: false
      };
    case ADD_PURPOSE_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_PURPOSE_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        purposeList: [...state.purposeList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_PURPOSE:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_PURPOSE: {
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };
    }

    case CLOSE_PURPOSE_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_PURPOSE_DETAILS_FIELD:
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };

    case HIDE_DETAIL_PURPOSE:
      return {
        ...state,
        showMobileDetail: false
      };

    case FETCH_ACCESS_DATA:
      return {
        ...state,
        accessList: action.payload,
      };

    case CLOSE_PURPOSE_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_PURPOSE_DATA: {
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
