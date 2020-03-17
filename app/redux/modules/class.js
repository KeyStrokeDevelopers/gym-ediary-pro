import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_CLASS_DATA, SEARCH_CLASS_DATA, EDIT_CLASS_DATA, ADD_CLASS_DATA, SET_CLASS_DETAILS_FIELD, SHOW_DETAIL_CLASS, HIDE_DETAIL_CLASS, SUBMIT_CLASS_DATA, CLOSE_CLASS_FORM, LOADING_ACTION_CLASS, CLOSE_CLASS_NOTIF, ERROR_CLASS_DATA, ACTIVE_CLASS_DATA, DELETE_CLASS_DATA, UPDATE_CLASS_DATA
} from '../../actions/actionConstants';


const initialState = {
  classList: [],
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
  isLoading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CLASS_DATA:
      return {
        ...state,
        classList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case UPDATE_CLASS_DATA:
      return {
        ...state,
        classList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Class data updated',
        notifType: notifT.success,
        openNoti: true,
      };
    case DELETE_CLASS_DATA:
      return {
        ...state,
        classList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Class data deleted',
        notifType: notifT.success,
        openNoti: true,
      };
    case ACTIVE_CLASS_DATA:
      return {
        ...state,
        classList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Class data activated',
        notifType: notifT.success,
        openNoti: true,
      };
    case SEARCH_CLASS_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_CLASS_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_CLASS_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_CLASS_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        classList: [...state.classList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_CLASS:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_CLASS: {
      const classData = state.isActive ? state.classList.filter(item => item.status === 1) : state.classList.filter(item => item.status === 0);
      const index = classData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }

    case CLOSE_CLASS_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_CLASS_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_CLASS: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case CLOSE_CLASS_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_CLASS_DATA: {
      return {
        ...state,
        notifMsg: action.payload,
        notifType: notifT.error,
        openNoti: true,
        selectedIndex: 0
      };
    }

    // case DELETE_CLASS_DATA:
    //     return state.withMutations((mutableState) => {
    //         const index = state.get('contactList').indexOf(action.item);
    //         mutableState
    //             .update('contactList', contactList => contactList.splice(index, 1))
    //             .set('notifMsg', notif.removed);
    //     });
    // case TOGGLE_FAVORITE_CLASS:
    //     return state.withMutations((mutableState) => {
    //         const index = state.get('contactList').indexOf(action.item);
    //         mutableState.update('contactList', contactList => contactList
    //             .setIn([index, 'favorited'], !state.getIn(['contactList', index, 'favorited']))
    //         );
    //     });
    // case CLOSE_NOTIF:
    //     return state.withMutations((mutableState) => {
    //         mutableState.set('notifMsg', '');
    //     });


    default:
      return state;
  }
}
