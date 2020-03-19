import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_BRAND_UNIT_DATA, SEARCH_BRAND_UNIT_DATA, EDIT_BRAND_UNIT_DATA, ADD_BRAND_UNIT_DATA, SET_BRAND_UNIT_DETAILS_FIELD,
  SHOW_DETAIL_BRAND_UNIT, HIDE_DETAIL_BRAND_UNIT, SUBMIT_BRAND_UNIT_DATA, CLOSE_BRAND_UNIT_FORM, LOADING_ACTION_BRAND_UNIT, CLOSE_BRAND_UNIT_NOTIF, ERROR_BRAND_UNIT_DATA, UPDATED_BRAND_UNIT_DATA, DELETE_BRAND_UNIT_DATA, ACTIVE_BRAND_UNIT_DATA
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
  notifType: '', // success or error
  openNoti: true,
  isActive: 1,
  entryType: 'Brand',
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
        isLoading: false,
        selectedIndex: 0
      };
    case UPDATED_BRAND_UNIT_DATA:
      return {
        ...state,
        brandUnitList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: notifM.updated,
        notifType: notifT.success,
        openNoti: true
      };
    case DELETE_BRAND_UNIT_DATA:
      return {
        ...state,
        brandUnitList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Brand Unit data deleted',
        notifType: notifT.success,
        openNoti: true
      };
    case ACTIVE_BRAND_UNIT_DATA:
      return {
        ...state,
        brandUnitList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Brand Unit data activated',
        notifType: notifT.success,
        openNoti: true
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
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
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
        isActive: action.payload.is_active,
        entryType: action.payload.entryType,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_BRAND_UNIT: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case CLOSE_BRAND_UNIT_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_BRAND_UNIT_DATA: {
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
