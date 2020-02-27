import { Map } from 'immutable';
import {
  FETCH_PACKAGE_DATA, SEARCH_PACKAGE_DATA, EDIT_PACKAGE_DATA, ADD_PACKAGE_DATA, SET_PACKAGE_DETAILS_FIELD,
  SHOW_DETAIL_PACKAGE, HIDE_DETAIL_PACKAGE, SUBMIT_PACKAGE_DATA, CLOSE_PACKAGE_FORM, LOADING_ACTION_PACKAGE
} from '../../actions/actionConstants';


const initialState = {
  packageList: [],
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
    case FETCH_PACKAGE_DATA:
      return {
        ...state,
        packageList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case SEARCH_PACKAGE_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_PACKAGE_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_PACKAGE_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_PACKAGE_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        packageList: [...state.packageList, action.payload],
        isLoading: false
      };
    case LOADING_ACTION_PACKAGE:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_PACKAGE: {
      const packageData = state.isActive ? state.packageList.filter(item => item.status === 1) : state.packageList.filter(item => item.status === 0);
      const index = packageData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }

    case CLOSE_PACKAGE_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_PACKAGE_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_PACKAGE: {
      return {
        ...state,
        showMobileDetail: false
      };
    }
    default:
      return state;
  }
}
