import { Map } from 'immutable';
import {
  FETCH_CLASS_SUBSCRIPTION_DATA, SEARCH_CLASS_SUBSCRIPTION_DATA, EDIT_CLASS_SUBSCRIPTION_DATA, ADD_CLASS_SUBSCRIPTION_DATA, SET_CLASS_SUBSCRIPTION_DETAILS_FIELD,
  SHOW_DETAIL_CLASS_SUBSCRIPTION, HIDE_DETAIL_CLASS_SUBSCRIPTION, SUBMIT_CLASS_SUBSCRIPTION_DATA, CLOSE_CLASS_SUBSCRIPTION_FORM, LOADING_ACTION_CLASS_SUBSCRIPTION
} from '../../actions/actionConstants';


const initialState = {
  classSubscriptionList: [],
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
    case FETCH_CLASS_SUBSCRIPTION_DATA:
      return {
        ...state,
        classSubscriptionList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case SEARCH_CLASS_SUBSCRIPTION_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_CLASS_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_CLASS_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_CLASS_SUBSCRIPTION_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        classSubscriptionList: [...state.classSubscriptionList, action.payload],
        isLoading: false
      };
    case LOADING_ACTION_CLASS_SUBSCRIPTION:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_CLASS_SUBSCRIPTION: {
      const classSubscriptionData = state.isActive ? state.classSubscriptionList.filter(item => item.status === 1) : state.classSubscriptionList.filter(item => item.status === 0);
      const index = classSubscriptionData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }

    case CLOSE_CLASS_SUBSCRIPTION_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_CLASS_SUBSCRIPTION_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_CLASS_SUBSCRIPTION: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    // case DELETE_CLASS_SUBSCRIPTION_DATA:
    //     return state.withMutations((mutableState) => {
    //         const index = state.get('contactList').indexOf(action.item);
    //         mutableState
    //             .update('contactList', contactList => contactList.splice(index, 1))
    //             .set('notifMsg', notif.removed);
    //     });
    // case TOGGLE_FAVORITE_CLASS_SUBSCRIPTION:
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
