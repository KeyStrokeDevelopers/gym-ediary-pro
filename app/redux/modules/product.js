import { Map } from 'immutable';
import {
  FETCH_PRODUCT_SHOPING_DATA, SEARCH_PRODUCT_SHOPING_DATA, EDIT_PRODUCT_SHOPING_DATA, ADD_PRODUCT_SHOPING_DATA, SET_PRODUCT_SHOPING_DETAILS_FIELD,
  SHOW_DETAIL_PRODUCT_SHOPING, SUBMIT_PRODUCT_SHOPING_DATA, CLOSE_PRODUCT_SHOPING_FORM, LOADING_ACTION_PRODUCT_SHOPING, HIDE_DETAIL_PRODUCT_SHOPING, FETCH_PRODUCT_QUANTITY
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
  isActive: true,
  productQuantity: 0,
  isLoading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PRODUCT_SHOPING_DATA:
      return {
        ...state,
        productList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case SEARCH_PRODUCT_SHOPING_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_PRODUCT_SHOPING_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_PRODUCT_SHOPING_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_PRODUCT_SHOPING_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        productList: [...state.productList, action.payload],
        isLoading: false
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

    default:
      return state;
  }
}
