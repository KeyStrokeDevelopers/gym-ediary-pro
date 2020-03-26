import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_ACCOUNT_DATA, SEARCH_ACCOUNT_DATA, EDIT_ACCOUNT_DATA, ADD_ACCOUNT_DATA, SET_ACCOUNT_DETAILS_FIELD, SHOW_DETAIL_ACCOUNT, HIDE_DETAIL_ACCOUNT, SUBMIT_ACCOUNT_DATA, CLOSE_ACCOUNT_FORM, LOADING_ACTION_ACCOUNT, SUBMIT_SALARY_DATA, SET_SALARY_DATA, CLOSE_ACCOUNT_NOTIF, ERROR_ACCOUNT_DATA, UPDATE_SALARY_DATA
} from '../../actions/actionConstants';


const initialState = {
  accountList: [],
  salaryList: [],
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
  isLoading: false,
  isFormReset: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ACCOUNT_DATA:
      return {
        ...state,
        accountList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        isFormReset: true,
        selectedIndex: 0
      };
    case UPDATE_SALARY_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        isFormReset: true,
        salaryList: action.payload,
        notifMsg: notifM.updated,
        notifType: notifT.success,
        openNoti: true,
        isLoading: false
      };
    case SEARCH_ACCOUNT_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_ACCOUNT_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isFormReset: false,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_ACCOUNT_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isFormReset: false,
        isLoading: false
      };

    case SUBMIT_ACCOUNT_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        isFormReset: true,
        accountList: [...state.accountList, action.payload],
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true,
        isLoading: false
      };
    case LOADING_ACTION_ACCOUNT:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_ACCOUNT:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_ACCOUNT_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_ACCOUNT_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case SUBMIT_SALARY_DATA: {
      return {
        ...state,
        salaryList: [...state.salaryList, action.payload],
        openFrm: false,
        formValues: {},
        avatarInit: '',
        isLoading: false,
        isFormReset: true,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true,
      };
    }

    case SET_SALARY_DATA: {
      return {
        ...state,
        salaryList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    }

    case CLOSE_ACCOUNT_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_ACCOUNT_DATA: {
      return {
        ...state,
        notifMsg: action.payload,
        notifType: notifT.error,
        openNoti: true,
        selectedIndex: 0
      };
    }

    case HIDE_DETAIL_ACCOUNT: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    default:
      return state;
  }
}
