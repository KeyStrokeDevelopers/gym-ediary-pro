import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_PAYMENT_METHOD_DATA, SEARCH_PAYMENT_METHOD_DATA, EDIT_PAYMENT_METHOD_DATA, ADD_PAYMENT_METHOD_DATA, SET_PAYMENT_METHOD_DETAILS_FIELD,
  SHOW_DETAIL_PAYMENT_METHOD, HIDE_DETAIL_PAYMENT_METHOD, SUBMIT_PAYMENT_METHOD_DATA, CLOSE_PAYMENT_METHOD_FORM, LOADING_ACTION_PAYMENT_METHOD, CLOSE_PAYMENT_METHOD_NOTIF, ERROR_PAYMENT_METHOD_DATA, DELETE_PAYMENT_METHOD_DATA, ACTIVE_PAYMENT_METHOD_DATA
} from '../../actions/actionConstants';


const initialState = {
  paymentMethodList: [{}],
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
    case FETCH_PAYMENT_METHOD_DATA:
      return {
        ...state,
        paymentMethodList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case DELETE_PAYMENT_METHOD_DATA:
      return {
        ...state,
        paymentMethodList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        notifMsg: 'Payment method data deleted',
        notifType: notifT.success,
        openNoti: true,
      };
    case ACTIVE_PAYMENT_METHOD_DATA:
      return {
        ...state,
        paymentMethodList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        notifMsg: 'Payment method data activated',
        notifType: notifT.success,
        openNoti: true,
      };
    case SEARCH_PAYMENT_METHOD_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_PAYMENT_METHOD_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_PAYMENT_METHOD_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_PAYMENT_METHOD_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        paymentMethodList: [...state.paymentMethodList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_PAYMENT_METHOD:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_PAYMENT_METHOD: {
      const paymentMethodData = state.isActive ? state.paymentMethodList.filter(item => item.status === 1) : state.paymentMethodList.filter(item => item.status === 0);
      const index = paymentMethodData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }

    case CLOSE_PAYMENT_METHOD_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_PAYMENT_METHOD_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_PAYMENT_METHOD: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case CLOSE_PAYMENT_METHOD_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_PAYMENT_METHOD_DATA: {
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
