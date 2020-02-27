import { Map } from 'immutable';
import {
  FETCH_BRAND_UNIT_DATA, SEARCH_BRAND_UNIT_DATA, EDIT_BRAND_UNIT_DATA, ADD_BRAND_UNIT_DATA, SET_BRAND_UNIT_DETAILS_FIELD,
  SHOW_DETAIL_BRAND_UNIT, HIDE_DETAIL_BRAND_UNIT, SUBMIT_BRAND_UNIT_DATA, CLOSE_BRAND_UNIT_FORM, LOADING_ACTION_BRAND_UNIT
} from '../../actions/actionConstants';


const initialState = {
  brandUnitList: [],
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
    case FETCH_BRAND_UNIT_DATA:
      return {
        ...state,
        brandUnitList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case SEARCH_BRAND_UNIT_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_BRAND_UNIT_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_BRAND_UNIT_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_BRAND_UNIT_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        brandUnitList: [...state.brandUnitList, action.payload],
        isLoading: false
      };
    case LOADING_ACTION_BRAND_UNIT:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_BRAND_UNIT:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_BRAND_UNIT_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_BRAND_UNIT_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_BRAND_UNIT: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    default:
      return state;
  }
}
