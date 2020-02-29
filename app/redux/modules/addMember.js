import { Map } from 'immutable';
import {
  FETCH_ADD_MEMBER_DATA, SEARCH_ADD_MEMBER_DATA, EDIT_ADD_MEMBER_DATA, ADD_ADD_MEMBER_DATA, SET_ADD_MEMBER_DETAILS_FIELD, SHOW_DETAIL_ADD_MEMBER,
  HIDE_DETAIL_ADD_MEMBER, SUBMIT_ADD_MEMBER_DATA, CLOSE_ADD_MEMBER_FORM, LOADING_ACTION_ADD_MEMBER, VIEW_PROFILE, SET_FILTER_VALUE, FETCH_GYM_INFO
} from '../../actions/actionConstants';


const initialState = {
  addMemberList: {},
  occupation: {},
  formValues: {},
  gymInfo: [],
  selectedIndex: 0,
  selectedId: '',
  keywordValue: '',
  avatarInit: '',
  viewProfileData: {},
  openFrm: true,
  showMobileDetail: false,
  notifMsg: '',
  isActive: true,
  isLoading: false,
  filterValue: 'All',
  showDetails: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ADD_MEMBER_DATA:
      return {
        ...state,
        addMemberList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case SEARCH_ADD_MEMBER_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_ADD_MEMBER_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_ADD_MEMBER_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        occupation: action.payload,
        isLoading: false
      };

    case SUBMIT_ADD_MEMBER_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        addMemberList: [...state.addMemberList, action.payload],
        isLoading: false
      };
    case LOADING_ACTION_ADD_MEMBER:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_ADD_MEMBER:
      // const addMemberData = state.isActive ? state.addMemberList : state.addMemberList.filter(item => new Date(item.registertionDate).toLocaleDateString() === new Date().toLocaleDateString());
      // const index = addMemberData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true
      };

    case CLOSE_ADD_MEMBER_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_ADD_MEMBER_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0,
        showDetails: {}

      };
    }

    case HIDE_DETAIL_ADD_MEMBER: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case VIEW_PROFILE: {
      return {
        ...state,
        viewProfileData: action.payload
      };
    }

    case SET_FILTER_VALUE: {
      return {
        ...state,
        filterValue: action.payload,
        selectedIndex: 0
      };
    }

    case FETCH_GYM_INFO: {
      return {
        ...state,
        gymInfo: action.payload
      };
    }

    default:
      return state;
  }
}