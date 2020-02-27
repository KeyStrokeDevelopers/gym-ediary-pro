import { Map } from 'immutable';
import {
  FETCH_CATEGORY_DATA, SEARCH_CATEGORY_DATA, EDIT_CATEGORY_DATA, ADD_CATEGORY_DATA, SET_CATEGORY_DETAILS_FIELD,
  SHOW_DETAIL_CATEGORY, HIDE_DETAIL_CATEGORY, SUBMIT_CATEGORY_DATA, CLOSE_CATEGORY_FORM, LOADING_ACTION_CATEGORY
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
  isActive: true,
  isLoading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CATEGORY_DATA:
      return {
        ...state,
        categoryList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
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
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_CATEGORY_DATA:
      return {
        ...state,
        openFrm: true,
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
        isLoading: false
      };
    case LOADING_ACTION_CATEGORY:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_CATEGORY: {
      const categoryData = state.isActive ? state.categoryList.filter(item => item.status === 1) : state.categoryList.filter(item => item.status === 0);
      const index = categoryData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
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
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_CATEGORY: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    default:
      return state;
  }
}
