import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_WORKOUT_NUTRITION_DATA, SEARCH_WORKOUT_NUTRITION_DATA, EDIT_WORKOUT_NUTRITION_DATA, ADD_WORKOUT_NUTRITION_DATA, SET_WORKOUT_NUTRITION_DETAILS_FIELD, FETCH_ACCESS_DATA,
  SHOW_DETAIL_WORKOUT_NUTRITION, HIDE_DETAIL_WORKOUT_NUTRITION, SUBMIT_WORKOUT_NUTRITION_DATA, CLOSE_WORKOUT_NUTRITION_FORM, LOADING_ACTION_WORKOUT_NUTRITION, ERROR_WORKOUT_NUTRITION_DATA, CLOSE_WORKOUT_NUTRITION_NOTIF
} from '../../actions/actionConstants';

const initialState = {
  workoutNutritionList: [],
  accessList: [],
  formValues: { test: 'test' },
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
    case FETCH_WORKOUT_NUTRITION_DATA:
      return {
        ...state,
        workoutNutritionList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        selectedIndex: 0
      };
    case SEARCH_WORKOUT_NUTRITION_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_WORKOUT_NUTRITION_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_WORKOUT_NUTRITION_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_WORKOUT_NUTRITION_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        workoutNutritionList: [...state.workoutNutritionList, action.payload],
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_WORKOUT_NUTRITION:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_WORKOUT_NUTRITION: {
      const workoutNutritionData = state.isActive ? state.workoutNutritionList.filter(item => item.status === 1) : state.workoutNutritionList.filter(item => item.status === 0);
      const index = workoutNutritionData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }

    case CLOSE_WORKOUT_NUTRITION_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: ''
      };

    case SET_WORKOUT_NUTRITION_DETAILS_FIELD:
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };

    case HIDE_DETAIL_WORKOUT_NUTRITION:
      return {
        ...state,
        showMobileDetail: false
      };

    case FETCH_ACCESS_DATA:
      return {
        ...state,
        accessList: action.payload,
      };

    case CLOSE_WORKOUT_NUTRITION_NOTIF: {
      return {
        ...state,
        openNoti: false
      };
    }

    case ERROR_WORKOUT_NUTRITION_DATA: {
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
