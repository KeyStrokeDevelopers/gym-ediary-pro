import { Map } from 'immutable';
import {
  FETCH_VENDOR_PACKAGE_SUBSCRIPTION_DATA, SEARCH_VENDOR_PACKAGE_SUBSCRIPTION_DATA, EDIT_VENDOR_PACKAGE_SUBSCRIPTION_DATA, ADD_VENDOR_PACKAGE_SUBSCRIPTION_DATA, SET_VENDOR_PACKAGE_SUBSCRIPTION_DETAILS_FIELD,
  SHOW_DETAIL_VENDOR_PACKAGE_SUBSCRIPTION, HIDE_DETAIL_VENDOR_PACKAGE_SUBSCRIPTION, SUBMIT_VENDOR_PACKAGE_SUBSCRIPTION_DATA, CLOSE_VENDOR_PACKAGE_SUBSCRIPTION_FORM,
  LOADING_ACTION_VENDOR_PACKAGE_SUBSCRIPTION
} from '../../actions/actionConstants';


const initialState = {
  vendorPackageSubscriptionList: {},
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
    case FETCH_VENDOR_PACKAGE_SUBSCRIPTION_DATA:
      return {
        ...state,
        vendorPackageSubscriptionList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case SEARCH_VENDOR_PACKAGE_SUBSCRIPTION_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_VENDOR_PACKAGE_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_VENDOR_PACKAGE_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_VENDOR_PACKAGE_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        vendorPackageSubscriptionList: [...state.vendorPackageSubscriptionList, action.payload],
        isLoading: false
      };
    case LOADING_ACTION_VENDOR_PACKAGE_SUBSCRIPTION:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_VENDOR_PACKAGE_SUBSCRIPTION: {
      const vendorPackageSubscriptionData = state.isActive ? state.vendorPackageSubscriptionList.filter(item => item.status === 1) : state.vendorPackageSubscriptionList.filter(item => item.status === 0);
      const index = vendorPackageSubscriptionData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }
    case CLOSE_VENDOR_PACKAGE_SUBSCRIPTION_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_VENDOR_PACKAGE_SUBSCRIPTION_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_VENDOR_PACKAGE_SUBSCRIPTION: {
      return {
        ...state,
        showMobileDetail: false
      };
    }
    default:
      return state;
  }
}
