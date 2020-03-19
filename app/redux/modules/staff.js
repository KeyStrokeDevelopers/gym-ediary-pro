import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_STAFF_DATA, SEARCH_STAFF_DATA, EDIT_STAFF_DATA, ADD_STAFF_DATA, SET_STAFF_DETAILS_FIELD, FETCH_ACCESS_DATA,
  SHOW_DETAIL_STAFF, HIDE_DETAIL_STAFF, SUBMIT_STAFF_DATA, CLOSE_STAFF_FORM, LOADING_ACTION_STAFF, SET_STAFF_ATTENDANCE_DATA, SET_STAFF_PROFILE_ATTENDANCE_DATA, CLOSE_STAFF_NOTIF, ERROR_STAFF_DATA, MARK_STAFF_ATTENDANCE, UPDATED_STAFF_DATA
} from '../../actions/actionConstants';


const initialState = {
  staffList: [],
  accessList: [],
  staffAttendanceData: [],
  staffProfileAttendanceData: [],
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
    case FETCH_STAFF_DATA:
      return {
        ...state,
        staffList: action.payload,
        formValues: {},
        openFrm: false,
        selectedIndex: 0,
        isLoading: false,
      };
    case UPDATED_STAFF_DATA:
      return {
        ...state,
        staffList: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        notifMsg: 'Staff data updated',
        notifType: notifT.success,
        openNoti: true
      };

    case SET_STAFF_ATTENDANCE_DATA:
      return {
        ...state,
        staffAttendanceData: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };

    case MARK_STAFF_ATTENDANCE:
      return {
        ...state,
        staffAttendanceData: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false,
        notifMsg: 'Staff attendance mark successfully',
        notifType: notifT.success,
        openNoti: true
      };

    case SET_STAFF_PROFILE_ATTENDANCE_DATA:
      return {
        ...state,
        staffProfileAttendanceData: action.payload,
        formValues: {},
        openFrm: false,
        isLoading: false
      };

    case SEARCH_STAFF_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_STAFF_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_STAFF_DATA:
      return {
        ...state,
        openFrm: true,
        formValues: {},
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_STAFF_DATA:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: '',
        staffList: action.payload,
        isLoading: false,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true
      };
    case LOADING_ACTION_STAFF:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_STAFF: {
      const staffData = state.isActive ? state.staffList.filter(item => item.status === 1) : state.staffList.filter(item => item.status === 0);
      const index = staffData.indexOf(action.payload);
      return {
        ...state,
        selectedIndex: index,
        showMobileDetail: true,
      };
    }

    case CLOSE_STAFF_FORM:
      return {
        ...state,
        openFrm: false,
        formValues: {},
        avatarInit: ''
      };

    case SET_STAFF_DETAILS_FIELD:
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };

    case HIDE_DETAIL_STAFF:
      return {
        ...state,
        showMobileDetail: false
      };

    case FETCH_ACCESS_DATA:
      return {
        ...state,
        accessList: action.payload,
      };

    case CLOSE_STAFF_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_STAFF_DATA:
      return {
        ...state,
        notifMsg: action.payload,
        notifType: notifT.error,
        openNoti: true,
        selectedIndex: 0
      };

    default:
      return state;
  }
}
