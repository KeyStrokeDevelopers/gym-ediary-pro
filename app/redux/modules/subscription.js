import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_SUBSCRIPTION_DATA, FETCH_SUBSCRIPTION_ACTIVE_DATA, SEARCH_SUBSCRIPTION_DATA, EDIT_SUBSCRIPTION_DATA, ADD_SUBSCRIPTION_DATA, SET_SUBSCRIPTION_DETAILS_FIELD,
  SHOW_DETAIL_SUBSCRIPTION, HIDE_DETAIL_SUBSCRIPTION, SUBMIT_SUBSCRIPTION_DATA, CLOSE_SUBSCRIPTION_FORM, LOADING_ACTION_SUBSCRIPTION, CLOSE_SUBSCRIPTION_NOTIF, ERROR_SUBSCRIPTION_DATA
} from '../../actions/actionConstants';


const initialState = {
  masterPackageList: {},
  activePackage: {},
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
    case FETCH_SUBSCRIPTION_DATA:
      return {
        ...state,
        masterPackageList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case FETCH_SUBSCRIPTION_ACTIVE_DATA:
      return {
        ...state,
        activePackage: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case SEARCH_SUBSCRIPTION_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: action.payload,
        isLoading: false,
        isFormReset: false
      };
    case ADD_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isFormReset: false,
        isLoading: false
      };

    case SUBMIT_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        masterPackageList: [...state.masterPackageList, action.payload],
        isLoading: false,
        isFormReset: true,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_SUBSCRIPTION:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_SUBSCRIPTION: {
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };
    }

    case CLOSE_SUBSCRIPTION_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_SUBSCRIPTION_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_SUBSCRIPTION: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case CLOSE_SUBSCRIPTION_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_SUBSCRIPTION_DATA: {
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
