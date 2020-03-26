import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_ORDER_SUMMARY_DATA, SEARCH_ORDER_SUMMARY_DATA, EDIT_ORDER_SUMMARY_DATA, ADD_ORDER_SUMMARY_DATA, SET_ORDER_SUMMARY_DETAILS_FIELD,
  SHOW_DETAIL_ORDER_SUMMARY, HIDE_DETAIL_ORDER_SUMMARY, SUBMIT_ORDER_SUMMARY_DATA, CLOSE_ORDER_SUMMARY_FORM, LOADING_ACTION_ORDER_SUMMARY, CLOSE_ORDER_SUMMARY_NOTIF, ERROR_ORDER_SUMMARY_DATA
} from '../../actions/actionConstants';


const initialState = {
  orderSummaryList: [],
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
    case FETCH_ORDER_SUMMARY_DATA:
      return {
        ...state,
        orderSummaryList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        isFormReset: true,
        selectedIndex: 0
      };
    case SEARCH_ORDER_SUMMARY_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_ORDER_SUMMARY_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: action.payload,
        isLoading: false,
        isFormReset: false,
        notifMsg: notifM.updated,
        notifType: notifT.success,
        openNoti: true,
      };
    case ADD_ORDER_SUMMARY_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        isFormReset: false,
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_ORDER_SUMMARY_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        orderSummaryList: [...state.orderSummaryList, action.payload],
        isLoading: false,
        isFormReset: true,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_ORDER_SUMMARY:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_ORDER_SUMMARY:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_ORDER_SUMMARY_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_ORDER_SUMMARY_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_ORDER_SUMMARY: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case CLOSE_ORDER_SUMMARY_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_ORDER_SUMMARY_DATA: {
      return {
        ...state,
        notifMsg: action.payload,
        notifType: notifT.error,
        selectedIndex: 0,
        openNoti: true
      };
    }

    default:
      return state;
  }
}
