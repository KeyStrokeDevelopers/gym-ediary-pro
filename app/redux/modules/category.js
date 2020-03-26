import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_CATEGORY_DATA, SEARCH_CATEGORY_DATA, EDIT_CATEGORY_DATA, ADD_CATEGORY_DATA, SET_CATEGORY_DETAILS_FIELD,
  SHOW_DETAIL_CATEGORY, HIDE_DETAIL_CATEGORY, SUBMIT_CATEGORY_DATA, CLOSE_CATEGORY_FORM, LOADING_ACTION_CATEGORY, CLOSE_CATEGORY_NOTIF, ERROR_CATEGORY_DATA, DELETE_CATEGORY_DATA, ACTIVE_CATEGORY_DATA, UPDATED_CATEGORY_DATA
} from '../../actions/actionConstants';


const initialState = {
  categoryList: {},
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
  isLoading: false,
  categoryType: 'Expenditure',
  isFormReset: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CATEGORY_DATA:
      return {
        ...state,
        categoryList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        isFormReset: true,
        selectedIndex: 0
      };
    case UPDATED_CATEGORY_DATA:
      return {
        ...state,
        categoryList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        isFormReset: true,
        notifMsg: 'Category data updated',
        notifType: notifT.success,
        selectedIndex: 0,
        openNoti: true,
      };
    case DELETE_CATEGORY_DATA:
      return {
        ...state,
        categoryList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        notifMsg: 'Category data deleted',
        notifType: notifT.success,
        selectedIndex: 0,
        openNoti: true,
      };
    case ACTIVE_CATEGORY_DATA:
      return {
        ...state,
        categoryList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        notifMsg: 'Category data activated',
        notifType: notifT.success,
        openNoti: true,
      };
    case SEARCH_CATEGORY_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_CATEGORY_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        isFormReset: false,
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_CATEGORY_DATA:
      return {
        ...state,
        openFrm: true,
        isFormReset: false,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_CATEGORY_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        categoryList: [...state.categoryList, action.payload],
        isLoading: false,
        isFormReset: true,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_CATEGORY:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_CATEGORY: {
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };
    }

    case CLOSE_CATEGORY_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_CATEGORY_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload.is_active,
        categoryType: action.payload.categoryType,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_CATEGORY: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case CLOSE_CATEGORY_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_CATEGORY_DATA: {
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
