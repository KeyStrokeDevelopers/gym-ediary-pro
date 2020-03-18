import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_ENQUIRY_DATA, SEARCH_ENQUIRY_DATA, EDIT_ENQUIRY_DATA, ADD_ENQUIRY_DATA, SET_ENQUIRY_DETAILS_FIELD,
  SHOW_DETAIL_ENQUIRY, HIDE_DETAIL_ENQUIRY, SUBMIT_ENQUIRY_DATA, CLOSE_ENQUIRY_FORM, LOADING_ACTION_ENQUIRY, HANDLE_FROM_TO_FILTER, CLOSE_ENQUIRY_NOTIF, ERROR_ENQUIRY_DATA, UPDATE_ENQUIRY_DATA
} from '../../actions/actionConstants';


const initialState = {
  enquiryList: [{}],
  formValues: {},
  selectedIndex: 0,
  selectedId: '',
  keywordValue: '',
  avatarInit: '',
  openFrm: true,
  showMobileDetail: false,
  notifMsg: '',
  notifType: '', // success or error
  openNoti: true,
  isActive: true,
  isLoading: false,
  fromToDate: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ENQUIRY_DATA:
      return {
        ...state,
        enquiryList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case UPDATE_ENQUIRY_DATA:
      return {
        ...state,
        enquiryList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: notifM.updated,
        notifType: notifT.success,
        openNoti: true
      };
    case SEARCH_ENQUIRY_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_ENQUIRY_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_ENQUIRY_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_ENQUIRY_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        enquiryList: [...state.enquiryList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_ENQUIRY:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_ENQUIRY:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_ENQUIRY_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_ENQUIRY_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_ENQUIRY: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case HANDLE_FROM_TO_FILTER: {
      return {
        ...state,
        fromToDate: action.payload
      };
    }

    case CLOSE_ENQUIRY_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_ENQUIRY_DATA: {
      return {
        ...state,
        notifMsg: action.payload,
        notifType: notifT.error,
        openNoti: true,
        selectedIndex: 0
      };
    }

    // case DELETE_ENQUIRY_DATA:
    //     return state.withMutations((mutableState) => {
    //         const index = state.get('contactList').indexOf(action.item);
    //         mutableState
    //             .update('contactList', contactList => contactList.splice(index, 1))
    //             .set('notifMsg', notif.removed);
    //     });
    // case TOGGLE_FAVORITE_ENQUIRY:
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
