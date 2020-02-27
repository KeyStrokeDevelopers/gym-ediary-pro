import { toast } from 'react-toastify';
import {
  FETCH_EXPENSE_INCOME_DATA, SEARCH_EXPENSE_INCOME_DATA, EDIT_EXPENSE_INCOME_DATA, ADD_EXPENSE_INCOME_DATA, SET_EXPENSE_INCOME_DETAILS_FIELD,
  ERROR_EXPENSE_INCOME_DATA, SHOW_DETAIL_EXPENSE_INCOME, HIDE_DETAIL_EXPENSE_INCOME, SUBMIT_EXPENSE_INCOME_DATA, CLOSE_EXPENSE_INCOME_FORM, LOADING_ACTION_EXPENSE_INCOME
} from './actionConstants';
import {
  addExpenseIncomeApi, getExpenseIncomeApi, updateExpenseIncomeDataApi, deleteExpenseIncomeDataApi
} from '../api/expenseIncome';

const fetchExpenseIncomeData = expenseIncomeData => ({
  type: FETCH_EXPENSE_INCOME_DATA,
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
  payload: error
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

const viewError = (error) => {
  const { response } = error;
  const { data } = response;
  const { message } = data;
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000
  });
};

export const submitExpenseIncomeData = (data) => (dispatch) => {
  addExpenseIncomeApi(data).then((response) => {
    toast.success('ExpenseIncome Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorExpenseIncomeData(err));
    });
};

export const getExpenseIncomeData = () => (dispatch) => {
  getExpenseIncomeApi().then((response) => {
    dispatch(fetchExpenseIncomeData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorExpenseIncomeData(err));
  });
};

export const updateExpenseIncomeData = (data) => (dispatch) => {
  updateExpenseIncomeDataApi(data).then((response) => {
    toast.success('ExpenseIncome Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchExpenseIncomeData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorExpenseIncomeData(err));
  });
};

export const deleteExpenseIncomeData = (data) => (dispatch) => {
  deleteExpenseIncomeDataApi(data).then((response) => {
    toast.success('ExpenseIncome Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchExpenseIncomeData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorExpenseIncomeData(err));
  });
};
