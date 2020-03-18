import {
  FETCH_EXPENSE_INCOME_DATA, SEARCH_EXPENSE_INCOME_DATA, EDIT_EXPENSE_INCOME_DATA, ADD_EXPENSE_INCOME_DATA, SET_EXPENSE_INCOME_DETAILS_FIELD,
  ERROR_EXPENSE_INCOME_DATA, SHOW_DETAIL_EXPENSE_INCOME, HIDE_DETAIL_EXPENSE_INCOME, SUBMIT_EXPENSE_INCOME_DATA, CLOSE_EXPENSE_INCOME_FORM, LOADING_ACTION_EXPENSE_INCOME, CLOSE_EXPENSE_INCOME_NOTIF, UPDATED_EXPENSE_INCOME_DATA
} from './actionConstants';
import {
  addExpenseIncomeApi, getExpenseIncomeApi, updateExpenseIncomeDataApi, deleteExpenseIncomeDataApi
} from '../api/expenseIncome';

const fetchExpenseIncomeData = expenseIncomeData => ({
  type: FETCH_EXPENSE_INCOME_DATA,
  payload: expenseIncomeData
});

const updatedExpenseIncomeData = expenseIncomeData => ({
  type: UPDATED_EXPENSE_INCOME_DATA,
  payload: expenseIncomeData
});

const submitAction = (expenseIncomeData) => ({
  type: SUBMIT_EXPENSE_INCOME_DATA,
  payload: expenseIncomeData
});

export const addExpenseIncomeData = () => ({
  type: ADD_EXPENSE_INCOME_DATA
});

export const closeAction = () => ({
  type: CLOSE_EXPENSE_INCOME_FORM
});

export const showDetailAction = expenseIncomeData => ({
  type: SHOW_DETAIL_EXPENSE_INCOME,
  payload: expenseIncomeData
});

export const editExpenseIncomeData = expenseIncomeData => ({
  type: EDIT_EXPENSE_INCOME_DATA,
  payload: expenseIncomeData
});

export const searchExpenseIncomeData = expenseIncomeData => ({
  type: SEARCH_EXPENSE_INCOME_DATA,
  payload: expenseIncomeData
});

const errorExpenseIncomeData = error => ({
  type: ERROR_EXPENSE_INCOME_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_EXPENSE_INCOME_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_EXPENSE_INCOME
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_EXPENSE_INCOME
});

export const closeNotifAction = () => ({
  type: CLOSE_EXPENSE_INCOME_NOTIF
});

export const submitExpenseIncomeData = (data) => (dispatch) => {
  addExpenseIncomeApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorExpenseIncomeData(err));
  });
};

export const getExpenseIncomeData = () => (dispatch) => {
  getExpenseIncomeApi().then((response) => {
    dispatch(fetchExpenseIncomeData(response.data));
  }).catch((err) => {
    dispatch(errorExpenseIncomeData(err));
  });
};

export const updateExpenseIncomeData = (data) => (dispatch) => {
  updateExpenseIncomeDataApi(data).then((response) => {
    dispatch(updatedExpenseIncomeData(response.data));
  }).catch((err) => {
    dispatch(errorExpenseIncomeData(err));
  });
};

export const deleteExpenseIncomeData = (data) => (dispatch) => {
  deleteExpenseIncomeDataApi(data).then((response) => {
    dispatch(fetchExpenseIncomeData(response.data));
  }).catch((err) => {
    dispatch(errorExpenseIncomeData(err));
  });
};
