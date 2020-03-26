import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_ENQUIRY_DATA, SEARCH_ENQUIRY_DATA, EDIT_ENQUIRY_DATA, ADD_ENQUIRY_DATA, SET_ENQUIRY_DETAILS_FIELD,
  SHOW_DETAIL_ENQUIRY, HIDE_DETAIL_ENQUIRY, SUBMIT_ENQUIRY_DATA, CLOSE_ENQUIRY_FORM, LOADING_ACTION_ENQUIRY, CLOSE_ENQUIRY_NOTIF, ERROR_ENQUIRY_DATA, UPDATE_ENQUIRY_DATA
} from '../../actions/actionConstants';


const initialState = {
  enquiryList: [{}],
  formValues: {},
  selectedIndex: 0,
  selectedId: '',
  keywordValue: '',
  avatarInit: '',
  openFrm: true,
  showMobileDetail: false,
  notifMsg: '',
  notifType: '', // success or error
  openNoti: true,
  isActive: true,
  isLoading: false,
  dateFrom: '',
  dateTo: '',
  isFormReset: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ENQUIRY_DATA:
      return {
        ...state,
        enquiryList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case UPDATE_ENQUIRY_DATA:
      return {
        ...state,
        enquiryList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: notifM.updated,
        notifType: notifT.success,
        openNoti: true
      };
    case SEARCH_ENQUIRY_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_ENQUIRY_DATA: {
      const formValue = Object.assign({}, action.payload, { purpose: action.payload.purpose._id }, { packageInfo: action.payload.packageInfo._id }, { classInfo: action.payload.classInfo._id });
      return {
        ...state,
        openFrm: true,
        isFormReset: false,
        formValues: formValue,
        isLoading: false
      };
    }
    case ADD_ENQUIRY_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isFormReset: false,
        isLoading: false
      };

    case SUBMIT_ENQUIRY_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        isFormReset: true,
        enquiryList: [...state.enquiryList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_ENQUIRY:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_ENQUIRY:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_ENQUIRY_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_ENQUIRY_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload.is_active,
        dateFrom: action.payload.dateFrom,
        dateTo: action.payload.dateTo,
        selectedIndex: 0
      };
    }

    case HIDE_DETAIL_ENQUIRY: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case CLOSE_ENQUIRY_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_ENQUIRY_DATA: {
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
