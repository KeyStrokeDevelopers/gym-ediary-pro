import { Map } from 'immutable';
import {
  FETCH_BANK_DATA, SEARCH_BANK_DATA, EDIT_BANK_DATA, ADD_BANK_DATA, SET_BANK_DETAILS_FIELD,
  ERROR_BANK_DATA, SHOW_DETAIL_BANK, HIDE_DETAIL_BANK, SUBMIT_BANK_DATA, CLOSE_BANK_FORM, LOADING_ACTION_BANK
} from '../../actions/actionConstants';


const initialState = {
  bankList: [{
    bankName: 'sbi', accountNumber: '7897898', ifsc: '369565', upi: 'oksbi@12', accountHolder: 'Test1', swipe: 'yes', status: '1'
  },
  {
    bankName: 'hdfc', accountNumber: '1234565', ifsc: '1245', upi: 'okdfa@12', accountHolder: 'Test2', swipe: 'yes', status: '1'
  }],
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
    case FETCH_BANK_DATA:
      return {
        ...state,
        bankList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case SEARCH_BANK_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_BANK_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_BANK_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_BANK_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        bankList: [...state.bankList, action.payload],
        isLoading: false
      };
    case LOADING_ACTION_BANK:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_BANK: {
      const bankData = state.isActive ? state.bankList.filter(item => item.status === 1) : state.bankList.filter(item => item.status === 0);
      const index = bankData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }

    case CLOSE_BANK_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_BANK_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_BANK: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case ERROR_BANK_DATA: {
      return {
        ...state,
        isLoading: false
      };
    }


    default:
      return state;
  }
}
