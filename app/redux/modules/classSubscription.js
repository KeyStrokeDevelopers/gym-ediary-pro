import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_CLASS_SUBSCRIPTION_DATA, SEARCH_CLASS_SUBSCRIPTION_DATA, EDIT_CLASS_SUBSCRIPTION_DATA, ADD_CLASS_SUBSCRIPTION_DATA, SET_CLASS_SUBSCRIPTION_DETAILS_FIELD,
  SHOW_DETAIL_CLASS_SUBSCRIPTION, HIDE_DETAIL_CLASS_SUBSCRIPTION, SUBMIT_CLASS_SUBSCRIPTION_DATA, CLOSE_CLASS_SUBSCRIPTION_FORM, LOADING_ACTION_CLASS_SUBSCRIPTION, CLOSE_CLASS_SUBSCRIPTION_NOTIF,
  ERROR_CLASS_SUBSCRIPTION_DATA
} from '../../actions/actionConstants';

const initialState = {
  classSubscriptionList: [],
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
    case FETCH_CLASS_SUBSCRIPTION_DATA:
      return {
        ...state,
        classSubscriptionList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        isFormReset: true,
        selectedIndex: 0
      };
    case SEARCH_CLASS_SUBSCRIPTION_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_CLASS_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: true,
        isFormReset: false,
        formValues: action.payload,
        isLoading: false
      };
    case ADD_CLASS_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: true,
        isFormReset: false,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_CLASS_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        isFormReset: true,
        classSubscriptionList: [...state.classSubscriptionList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true,
      };
    case LOADING_ACTION_CLASS_SUBSCRIPTION:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_CLASS_SUBSCRIPTION: {
      const classSubscriptionData = state.isActive ? state.classSubscriptionList.filter(item => item.status === 1) : state.classSubscriptionList.filter(item => item.status === 0);
      const index = classSubscriptionData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }

    case CLOSE_CLASS_SUBSCRIPTION_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case CLOSE_CLASS_SUBSCRIPTION_NOTIF: {
      return {
        ...state,
        openNoti: false
      };
    }

    case SET_CLASS_SUBSCRIPTION_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_CLASS_SUBSCRIPTION: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case ERROR_CLASS_SUBSCRIPTION_DATA: {
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
