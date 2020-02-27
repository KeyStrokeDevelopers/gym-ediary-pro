import { Map } from 'immutable';
import {
  FETCH_EXPENSE_INCOME_DATA, SEARCH_EXPENSE_INCOME_DATA, EDIT_EXPENSE_INCOME_DATA, ADD_EXPENSE_INCOME_DATA, SET_EXPENSE_INCOME_DETAILS_FIELD,
  SHOW_DETAIL_EXPENSE_INCOME, HIDE_DETAIL_EXPENSE_INCOME, SUBMIT_EXPENSE_INCOME_DATA, CLOSE_EXPENSE_INCOME_FORM, LOADING_ACTION_EXPENSE_INCOME
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
  isActive: true,
  isLoading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_EXPENSE_INCOME_DATA:
      return {
        ...state,
        expenseIncomeList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };
    case SEARCH_EXPENSE_INCOME_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_EXPENSE_INCOME_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_EXPENSE_INCOME_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_EXPENSE_INCOME_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        expenseIncomeList: [...state.expenseIncomeList, action.payload],
        isLoading: false
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
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_EXPENSE_INCOME: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    default:
      return state;
  }
}
