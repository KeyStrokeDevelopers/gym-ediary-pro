import { toast } from 'react-toastify';
import {
  FETCH_WORKOUT_NUTRITION_DATA, SEARCH_WORKOUT_NUTRITION_DATA, EDIT_WORKOUT_NUTRITION_DATA, ADD_WORKOUT_NUTRITION_DATA, SET_WORKOUT_NUTRITION_DETAILS_FIELD,
  ERROR_WORKOUT_NUTRITION_DATA, SHOW_DETAIL_WORKOUT_NUTRITION, HIDE_DETAIL_WORKOUT_NUTRITION, SUBMIT_WORKOUT_NUTRITION_DATA, CLOSE_WORKOUT_NUTRITION_FORM, LOADING_ACTION_WORKOUT_NUTRITION, FETCH_ACCESS_DATA
} from './actionConstants';
import {
  addWorkoutNutritionApi, getWorkoutNutritionApi, updateWorkoutNutritionDataApi, deleteWorkoutNutritionDataApi, fetchAccessDataApi
} from '../api/workoutNutrition';

const fetchWorkoutNutritionData = workoutNutritionData => ({
  type: FETCH_WORKOUT_NUTRITION_DATA,
  payload: workoutNutritionData
});

const submitAction = (workoutNutritionData) => ({
  type: SUBMIT_WORKOUT_NUTRITION_DATA,
  payload: workoutNutritionData
});

export const addWorkoutNutritionData = () => ({
  type: ADD_WORKOUT_NUTRITION_DATA
});

export const closeAction = () => ({
  type: CLOSE_WORKOUT_NUTRITION_FORM
});

export const showDetailAction = workoutNutritionData => ({
  type: SHOW_DETAIL_WORKOUT_NUTRITION,
  payload: workoutNutritionData
});

export const editWorkoutNutritionData = workoutNutritionData => ({
  type: EDIT_WORKOUT_NUTRITION_DATA,
  payload: workoutNutritionData
});

export const searchWorkoutNutritionData = workoutNutritionData => ({
  type: SEARCH_WORKOUT_NUTRITION_DATA,
  payload: workoutNutritionData
});

const errorWorkoutNutritionData = error => ({
  type: ERROR_WORKOUT_NUTRITION_DATA,
  payload: error
});

export const setDetailField = (data) => ({
  type: SET_WORKOUT_NUTRITION_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_WORKOUT_NUTRITION
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_WORKOUT_NUTRITION
});


const setAccessData = (accessData) => ({
  type: FETCH_ACCESS_DATA,
  payload: accessData
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

export const fetchAccessData = () => (dispatch) => {
  fetchAccessDataApi().then((response) => {
    dispatch(setAccessData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorWorkoutNutritionData(err));
  });
};

export const submitWorkoutNutritionData = (data) => (dispatch) => {
  addWorkoutNutritionApi(data).then((response) => {
    toast.success('WorkoutNutrition Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorWorkoutNutritionData(err));
  });
};

export const getWorkoutNutritionData = () => (dispatch) => {
  getWorkoutNutritionApi().then((response) => {
    dispatch(fetchWorkoutNutritionData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorWorkoutNutritionData(err));
  });
};

export const updateWorkoutNutritionData = (data) => (dispatch) => {
  updateWorkoutNutritionDataApi(data).then((response) => {
    toast.success('WorkoutNutrition Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchWorkoutNutritionData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorWorkoutNutritionData(err));
  });
};

export const deleteWorkoutNutritionData = (data) => (dispatch) => {
  deleteWorkoutNutritionDataApi(data).then((response) => {
    toast.success('WorkoutNutrition Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchWorkoutNutritionData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorWorkoutNutritionData(err));
  });
};
