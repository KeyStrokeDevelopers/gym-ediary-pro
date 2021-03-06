import { Map } from 'immutable';
import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_EXPENSE_INCOME_DATA, SEARCH_EXPENSE_INCOME_DATA, EDIT_EXPENSE_INCOME_DATA, ADD_EXPENSE_INCOME_DATA, SET_EXPENSE_INCOME_DETAILS_FIELD,
  SHOW_DETAIL_EXPENSE_INCOME, HIDE_DETAIL_EXPENSE_INCOME, SUBMIT_EXPENSE_INCOME_DATA, CLOSE_EXPENSE_INCOME_FORM, LOADING_ACTION_EXPENSE_INCOME, CLOSE_EXPENSE_INCOME_NOTIF, ERROR_EXPENSE_INCOME_DATA, UPDATED_EXPENSE_INCOME_DATA,
  DELETE_EXPENSE_INCOME_DATA, ACTIVE_EXPENSE_INCOME_DATA
} from '../../actions/actionConstants';


const initialState = {
  expenseIncomeList: [{}],
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
  paymentType: 'Expenditure',
  isFormReset: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_EXPENSE_INCOME_DATA:
      return {
        ...state,
        expenseIncomeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case UPDATED_EXPENSE_INCOME_DATA:
      return {
        ...state,
        expenseIncomeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: notifM.updated,
        notifType: notifT.success,
        openNoti: true
      };
    case DELETE_EXPENSE_INCOME_DATA:
      return {
        ...state,
        expenseIncomeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Expense Income data deleted',
        notifType: notifT.success,
        openNoti: true
      };
    case ACTIVE_EXPENSE_INCOME_DATA:
      return {
        ...state,
        expenseIncomeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
        notifMsg: 'Expense Income data activated',
        notifType: notifT.success,
        openNoti: true
      };
    case SEARCH_EXPENSE_INCOME_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_EXPENSE_INCOME_DATA: {
      const formValue = Object.assign({}, action.payload, { catName: action.payload.catName._id, paymentMethod: action.payload.paymentMethod._id });
      return {
        ...state,
        openFrm: true,
        formValues: formValue,
        isFormReset: false,
        isLoading: false
      };
    }
    case ADD_EXPENSE_INCOME_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        isFormReset: false,
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_EXPENSE_INCOME_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        isFormReset: true,
        expenseIncomeList: action.payload,
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_EXPENSE_INCOME:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_EXPENSE_INCOME:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_EXPENSE_INCOME_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: Map([]),
        avatarInit: ''
      };

    case SET_EXPENSE_INCOME_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload.is_active,
        paymentType: action.payload.paymentType,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_EXPENSE_INCOME: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case CLOSE_EXPENSE_INCOME_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_EXPENSE_INCOME_DATA: {
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
