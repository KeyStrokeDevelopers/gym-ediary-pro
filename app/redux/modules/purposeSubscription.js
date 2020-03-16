import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_PURPOSE_SUBSCRIPTION_DATA, SEARCH_PURPOSE_SUBSCRIPTION_DATA, EDIT_PURPOSE_SUBSCRIPTION_DATA, ADD_PURPOSE_SUBSCRIPTION_DATA, SET_PURPOSE_SUBSCRIPTION_DETAILS_FIELD,
  SHOW_DETAIL_PURPOSE_SUBSCRIPTION, HIDE_DETAIL_PURPOSE_SUBSCRIPTION, SUBMIT_PURPOSE_SUBSCRIPTION_DATA, CLOSE_PURPOSE_SUBSCRIPTION_FORM, LOADING_ACTION_PURPOSE_SUBSCRIPTION, CLOSE_PURPOSE_SUBSCRIPTION_NOTIF, ERROR_PURPOSE_SUBSCRIPTION_DATA
} from '../../actions/actionConstants';


const initialState = {
  purposeSubscriptionList: [],
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
    case FETCH_PURPOSE_SUBSCRIPTION_DATA:
      return {
        ...state,
        purposeSubscriptionList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case SEARCH_PURPOSE_SUBSCRIPTION_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_PURPOSE_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_PURPOSE_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_PURPOSE_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        purposeSubscriptionList: [...state.purposeSubscriptionList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_PURPOSE_SUBSCRIPTION:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_PURPOSE_SUBSCRIPTION: {
      const purposeSubscriptionData = state.isActive ? state.purposeSubscriptionList.filter(item => item.status === 1) : state.purposeSubscriptionList.filter(item => item.status === 0);
      const index = purposeSubscriptionData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }

    case CLOSE_PURPOSE_SUBSCRIPTION_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_PURPOSE_SUBSCRIPTION_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_PURPOSE_SUBSCRIPTION: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case CLOSE_PURPOSE_SUBSCRIPTION_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_PURPOSE_SUBSCRIPTION_DATA: {
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
