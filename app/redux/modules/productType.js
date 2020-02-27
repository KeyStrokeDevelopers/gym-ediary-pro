import { Map } from 'immutable';
import {
  FETCH_PRODUCT_TYPE_DATA, SEARCH_PRODUCT_TYPE_DATA, EDIT_PRODUCT_TYPE_DATA, ADD_PRODUCT_TYPE_DATA, SET_PRODUCT_TYPE_DETAILS_FIELD,
  SHOW_DETAIL_PRODUCT_TYPE, HIDE_DETAIL_PRODUCT_TYPE, SUBMIT_PRODUCT_TYPE_DATA, CLOSE_PRODUCT_TYPE_FORM, LOADING_ACTION_PRODUCT_TYPE
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
        isLoading: false
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
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
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
        isLoading: false
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

    default:
      return state;
  }
}
