import { Map } from 'immutable';
import {
  FETCH_SUBSCRIPTION_DATA, FETCH_SUBSCRIPTION_ACTIVE_DATA, SEARCH_SUBSCRIPTION_DATA, EDIT_SUBSCRIPTION_DATA, ADD_SUBSCRIPTION_DATA, SET_SUBSCRIPTION_DETAILS_FIELD,
  SHOW_DETAIL_SUBSCRIPTION, HIDE_DETAIL_SUBSCRIPTION, SUBMIT_SUBSCRIPTION_DATA, CLOSE_SUBSCRIPTION_FORM, LOADING_ACTION_SUBSCRIPTION
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
  isActive: true,
  isLoading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_SUBSCRIPTION_DATA:
      return {
        ...state,
        masterPackageList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case FETCH_SUBSCRIPTION_ACTIVE_DATA:
      return {
        ...state,
        activePackage: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
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
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        masterPackageList: [...state.masterPackageList, action.payload],
        isLoading: false
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

    default:
      return state;
  }
}
