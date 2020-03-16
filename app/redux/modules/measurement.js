import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_MEASUREMENT_DATA, SEARCH_MEASUREMENT_DATA, EDIT_MEASUREMENT_DATA, ADD_MEASUREMENT_DATA, SET_MEASUREMENT_DETAILS_FIELD,
  SHOW_DETAIL_MEASUREMENT, HIDE_DETAIL_MEASUREMENT, SUBMIT_MEASUREMENT_DATA, CLOSE_MEASUREMENT_FORM, LOADING_ACTION_MEASUREMENT, CLOSE_MEASUREMENT_NOTIF, ERROR_MEASUREMENT_DATA
} from '../../actions/actionConstants';


const initialState = {
  measurementList: [],
  formValues: {},
  selectedIndex: 0,
  selectedId: '',
  keywordValue: '',
  avatarInit: '',
  openFrm: false,
  showMobileDetail: false,
  isActive: true,
  isLoading: false,
  notifMsg: '',
  notifType: '', // success or error
  openNoti: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_MEASUREMENT_DATA:
      return {
        ...state,
        measurementList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case SEARCH_MEASUREMENT_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_MEASUREMENT_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
      };
    case ADD_MEASUREMENT_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_MEASUREMENT_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        measurementList: [...state.measurementList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_MEASUREMENT:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_MEASUREMENT: {
      const measurementData = state.isActive ? state.measurementList.filter(item => item.status === 1) : state.measurementList.filter(item => item.status === 0);
      const index = measurementData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }

    case CLOSE_MEASUREMENT_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_MEASUREMENT_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case CLOSE_MEASUREMENT_NOTIF: {
      return {
        ...state,
        openNoti: false
      };
    }

    case ERROR_MEASUREMENT_DATA: {
      return {
        ...state,
        notifMsg: action.payload,
        notifType: notifT.error,
        openNoti: true,
        selectedIndex: 0
      };
    }

    case HIDE_DETAIL_MEASUREMENT: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    default:
      return state;
  }
}
