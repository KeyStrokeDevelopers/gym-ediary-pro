import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_PRODUCT_TYPE_DATA, SEARCH_PRODUCT_TYPE_DATA, EDIT_PRODUCT_TYPE_DATA, ADD_PRODUCT_TYPE_DATA, SET_PRODUCT_TYPE_DETAILS_FIELD,
  SHOW_DETAIL_PRODUCT_TYPE, HIDE_DETAIL_PRODUCT_TYPE, SUBMIT_PRODUCT_TYPE_DATA, CLOSE_PRODUCT_TYPE_FORM, LOADING_ACTION_PRODUCT_TYPE, CLOSE_PRODUCT_TYPE_NOTIF, ERROR_PRODUCT_TYPE_DATA, UPDATED_PRODUCT_TYPE_DATA, DELETE_PRODUCT_TYPE_DATA, ACTIVE_PRODUCT_TYPE_DATA
} from '../../actions/actionConstants';


const initialState = {
  productTypeList: [],
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
    case FETCH_PRODUCT_TYPE_DATA:
      return {
        ...state,
        productTypeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case UPDATED_PRODUCT_TYPE_DATA:
      return {
        ...state,
        productTypeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: notifM.updated,
        notifType: notifT.success,
        openNoti: true
      };
    case DELETE_PRODUCT_TYPE_DATA:
      return {
        ...state,
        productTypeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Product Type data deleted',
        notifType: notifT.success,
        openNoti: true
      };
    case ACTIVE_PRODUCT_TYPE_DATA:
      return {
        ...state,
        productTypeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Product Type data activated',
        notifType: notifT.success,
        openNoti: true
      };
    case SEARCH_PRODUCT_TYPE_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_PRODUCT_TYPE_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: action.payload,
        isLoading: false
      };
    case ADD_PRODUCT_TYPE_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_PRODUCT_TYPE_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        productTypeList: [...state.productTypeList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_PRODUCT_TYPE:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_PRODUCT_TYPE:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_PRODUCT_TYPE_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_PRODUCT_TYPE_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_PRODUCT_TYPE: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case CLOSE_PRODUCT_TYPE_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_PRODUCT_TYPE_DATA: {
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
