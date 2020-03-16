import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_MEDIA_DATA, SEARCH_MEDIA_DATA, EDIT_MEDIA_DATA, ADD_MEDIA_DATA, SET_MEDIA_DETAILS_FIELD,
  SHOW_DETAIL_MEDIA, HIDE_DETAIL_MEDIA, SUBMIT_MEDIA_DATA, CLOSE_MEDIA_FORM, LOADING_ACTION_MEDIA,
  CLOSE_MEDIA_NOTIF, ERROR_MEDIA_DATA
} from '../../actions/actionConstants';


const initialState = {
  mediaList: [],
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
    case FETCH_MEDIA_DATA:
      return {
        ...state,
        mediaList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case SEARCH_MEDIA_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_MEDIA_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_MEDIA_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_MEDIA_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        mediaList: [...state.mediaList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_MEDIA:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_MEDIA: {
      const mediaData = state.isActive ? state.mediaList.filter(item => item.status === 1) : state.mediaList.filter(item => item.status === 0);
      const index = mediaData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }

    case CLOSE_MEDIA_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_MEDIA_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case CLOSE_MEDIA_NOTIF: {
      return {
        ...state,
        openNoti: false
      };
    }

    case ERROR_MEDIA_DATA: {
      return {
        ...state,
        notifMsg: action.payload,
        notifType: notifT.error,
        openNoti: true,
        selectedIndex: 0
      };
    }

    case HIDE_DETAIL_MEDIA: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    default:
      return state;
  }
}
