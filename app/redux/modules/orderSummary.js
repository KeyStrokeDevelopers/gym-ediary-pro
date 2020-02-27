import { Map } from 'immutable';
import {
  FETCH_ORDER_SUMMARY_DATA, SEARCH_ORDER_SUMMARY_DATA, EDIT_ORDER_SUMMARY_DATA, ADD_ORDER_SUMMARY_DATA, SET_ORDER_SUMMARY_DETAILS_FIELD,
  SHOW_DETAIL_ORDER_SUMMARY, HIDE_DETAIL_ORDER_SUMMARY, SUBMIT_ORDER_SUMMARY_DATA, CLOSE_ORDER_SUMMARY_FORM, LOADING_ACTION_ORDER_SUMMARY
} from '../../actions/actionConstants';


const initialState = {
  orderSummaryList: [],
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
    case FETCH_ORDER_SUMMARY_DATA:
      return {
        ...state,
        orderSummaryList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case SEARCH_ORDER_SUMMARY_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_ORDER_SUMMARY_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_ORDER_SUMMARY_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_ORDER_SUMMARY_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        orderSummaryList: [...state.orderSummaryList, action.payload],
        isLoading: false
      };
    case LOADING_ACTION_ORDER_SUMMARY:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_ORDER_SUMMARY:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_ORDER_SUMMARY_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_ORDER_SUMMARY_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_ORDER_SUMMARY: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    // case DELETE_ORDER_SUMMARY_DATA:
    //     return state.withMutations((mutableState) => {
    //         const index = state.get('contactList').indexOf(action.item);
    //         mutableState
    //             .update('contactList', contactList => contactList.splice(index, 1))
    //             .set('notifMsg', notif.removed);
    //     });
    // case TOGGLE_FAVORITE_ORDER_SUMMARY:
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
