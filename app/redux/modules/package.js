import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_PACKAGE_DATA, SEARCH_PACKAGE_DATA, EDIT_PACKAGE_DATA, ADD_PACKAGE_DATA, SET_PACKAGE_DETAILS_FIELD,
  SHOW_DETAIL_PACKAGE, HIDE_DETAIL_PACKAGE, SUBMIT_PACKAGE_DATA, CLOSE_PACKAGE_FORM, LOADING_ACTION_PACKAGE, CLOSE_PACKAGE_NOTIF, ERROR_PACKAGE_DATA, DELETE_PACKAGE_DATA, ACTIVE_PACKAGE_DATA, UPDATED_PACKAGE_DATA
} from '../../actions/actionConstants';


const initialState = {
  packageList: [],
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
    case FETCH_PACKAGE_DATA:
      return {
        ...state,
        packageList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case UPDATED_PACKAGE_DATA:
      return {
        ...state,
        packageList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Package data updated',
        notifType: notifT.success,
        openNoti: true,
      };
    case DELETE_PACKAGE_DATA:
      return {
        ...state,
        packageList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Package data deleted',
        notifType: notifT.success,
        openNoti: true,
      };
    case ACTIVE_PACKAGE_DATA:
      return {
        ...state,
        packageList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Package data activated',
        notifType: notifT.success,
        openNoti: true,
      };
    case SEARCH_PACKAGE_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_PACKAGE_DATA:
      return {
        ...state,
        openFrm: true,
        isFormReset: false,
        formValues: action.payload,
        isLoading: false
      };
    case ADD_PACKAGE_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        isFormReset: false,
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_PACKAGE_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        isFormReset: true,
        packageList: [...state.packageList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_PACKAGE:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_PACKAGE: {
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };
    }

    case CLOSE_PACKAGE_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_PACKAGE_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_PACKAGE: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case CLOSE_PACKAGE_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_PACKAGE_DATA: {
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
