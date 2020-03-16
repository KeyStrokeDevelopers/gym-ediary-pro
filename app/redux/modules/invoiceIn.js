import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_INVOICE_IN_DATA, SEARCH_INVOICE_IN_DATA, EDIT_INVOICE_IN_DATA, ADD_INVOICE_IN_DATA, SET_INVOICE_IN_DETAILS_FIELD,
  SHOW_DETAIL_INVOICE_IN, HIDE_DETAIL_INVOICE_IN, SUBMIT_INVOICE_IN_DATA, CLOSE_INVOICE_IN_FORM, LOADING_ACTION_INVOICE_IN, CLOSE_INVOICE_IN_NOTIF, ERROR_INVOICE_IN_DATA
} from '../../actions/actionConstants';


const initialState = {
  invoiceInList: [],
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
    case FETCH_INVOICE_IN_DATA:
      return {
        ...state,
        invoiceInList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case SEARCH_INVOICE_IN_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_INVOICE_IN_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_INVOICE_IN_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_INVOICE_IN_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        invoiceInList: [...state.invoiceInList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_INVOICE_IN:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_INVOICE_IN:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_INVOICE_IN_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_INVOICE_IN_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_INVOICE_IN: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case CLOSE_INVOICE_IN_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_INVOICE_IN_DATA: {
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
