import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import { SERVER_URL } from '../../components/Common/constant';
import {
  FETCH_ADD_MEMBER_DATA, SEARCH_ADD_MEMBER_DATA, EDIT_ADD_MEMBER_DATA, ADD_ADD_MEMBER_DATA, SET_ADD_MEMBER_DETAILS_FIELD, SHOW_DETAIL_ADD_MEMBER,
  HIDE_DETAIL_ADD_MEMBER, SUBMIT_ADD_MEMBER_DATA, CLOSE_ADD_MEMBER_FORM, LOADING_ACTION_ADD_MEMBER, VIEW_PROFILE, SET_FILTER_VALUE, FETCH_GYM_INFO, CLOSE_ADD_MEMBER_NOTIF, ERROR_ADD_MEMBER_DATA, UPDATE_GYM_INFO, UPDATED_ADD_MEMBER_DATA
} from '../../actions/actionConstants';


const initialState = {
  addMemberList: {},
  occupation: {},
  formValues: {},
  gymInfo: {},
  selectedIndex: 0,
  selectedId: '',
  keywordValue: '',
  avatarInit: '',
  viewProfileData: {},
  openFrm: true,
  showMobileDetail: false,
  notifMsg: '',
  notifType: '', // success or error
  openNoti: true,
  isActive: true,
  isLoading: false,
  filterValue: 'All',
  showDetails: {},
  gymBranchLogo: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ADD_MEMBER_DATA:
      return {
        ...state,
        addMemberList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case UPDATED_ADD_MEMBER_DATA:
      return {
        ...state,
        addMemberList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: notifM.updated,
        notifType: notifT.success,
        openNoti: true
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
        isLoading: false,
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
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
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
        formValues: {},
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
        gymInfo: action.payload,
        gymBranchLogo: `${SERVER_URL}${action.payload.branchLogo}`
      };
    }

    case UPDATE_GYM_INFO: {
      return {
        ...state,
        gymInfo: action.payload,
        gymBranchLogo: `${SERVER_URL}${action.payload.branchLogo}`,
        notifMsg: notifM.updated,
        notifType: notifT.success,
        openNoti: true
      };
    }

    case CLOSE_ADD_MEMBER_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_ADD_MEMBER_DATA: {
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
