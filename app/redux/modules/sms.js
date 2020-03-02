import { Map } from 'immutable';
import {
  FETCH_SMS_DATA, SEARCH_SMS_DATA, EDIT_SMS_DATA, ADD_SMS_DATA, SET_SMS_DETAILS_FIELD, FETCH_SMS_ACTIVE_DATA,
  SHOW_DETAIL_SMS, HIDE_DETAIL_SMS, SUBMIT_SMS_DATA, CLOSE_SMS_FORM, LOADING_ACTION_SMS
} from '../../actions/actionConstants';


const initialState = {
  smsList: {},
  smsActiveList: {},
  formValues: {},
  selectedIndex: 0,
  selectedId: '',
  keywordValue: '',
  avatarInit: '',
  openFrm: false,
  showMobileDetail: false,
  notifMsg: '',
  isActive: true,
  isLoading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_SMS_DATA:
      return {
        ...state,
        smsList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case FETCH_SMS_ACTIVE_DATA:
      return {
        ...state,
        smsActiveList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case SEARCH_SMS_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_SMS_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_SMS_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_SMS_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        smsList: [...state.smsList, action.payload],
        isLoading: false
      };
    case LOADING_ACTION_SMS:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_SMS: {
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };
    }

    case CLOSE_SMS_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_SMS_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_SMS: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    default:
      return state;
  }
}
