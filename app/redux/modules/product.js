import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_PRODUCT_SHOPING_DATA, SEARCH_PRODUCT_SHOPING_DATA, EDIT_PRODUCT_SHOPING_DATA, ADD_PRODUCT_SHOPING_DATA, SET_PRODUCT_SHOPING_DETAILS_FIELD,
  SHOW_DETAIL_PRODUCT_SHOPING, SUBMIT_PRODUCT_SHOPING_DATA, CLOSE_PRODUCT_SHOPING_FORM, LOADING_ACTION_PRODUCT_SHOPING, HIDE_DETAIL_PRODUCT_SHOPING, FETCH_PRODUCT_QUANTITY, CLOSE_PRODUCT_SHOPING_NOTIF, ERROR_PRODUCT_SHOPING_DATA, UPDATE_PRODUCT_SHOPING_DATA, DELETE_PRODUCT_SHOPING_DATA, ACTIVE_PRODUCT_SHOPING_DATA
} from '../../actions/actionConstants';


const initialState = {
  productList: [],
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
  productQuantity: 0,
  isLoading: false,
  isFormReset: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PRODUCT_SHOPING_DATA:
      return {
        ...state,
        productList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case UPDATE_PRODUCT_SHOPING_DATA:
      return {
        ...state,
        productList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: notifM.updated,
        notifType: notifT.success,
        openNoti: true
      };
    case DELETE_PRODUCT_SHOPING_DATA:
      return {
        ...state,
        productList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Product data deleted',
        notifType: notifT.success,
        openNoti: true
      };
    case ACTIVE_PRODUCT_SHOPING_DATA:
      return {
        ...state,
        productList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Product data activated',
        notifType: notifT.success,
        openNoti: true
      };
    case SEARCH_PRODUCT_SHOPING_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_PRODUCT_SHOPING_DATA: {
      const formValue = Object.assign({}, action.payload, { brand: action.payload.brand._id }, { product: action.payload.product._id }, { measuringUnit: action.payload.measuringUnit._id });
      return {
        ...state,
        openFrm: true,
        formValues: formValue,
        isFormReset: false,
        isLoading: false
      };
    }
    case ADD_PRODUCT_SHOPING_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        isFormReset: false,
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_PRODUCT_SHOPING_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        isFormReset: true,
        productList: action.payload,
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_PRODUCT_SHOPING:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_PRODUCT_SHOPING:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_PRODUCT_SHOPING_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_PRODUCT_SHOPING_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_PRODUCT_SHOPING: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case FETCH_PRODUCT_QUANTITY: {
      return {
        ...state,
        productQuantity: action.payload.quantity
      };
    }

    case CLOSE_PRODUCT_SHOPING_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_PRODUCT_SHOPING_DATA: {
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
