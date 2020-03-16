import notifT from 'dan-api/ui/notifType';
import {
  FETCH_PENDING_PAYMENTS_DATA, FETCH_REPORTS_DATA, FETCH_EXPIRING_MEMBERSHIPS_DATA, FETCH_EXPIRED_MEMBERS_DATA, FETCH_NON_ACTIVE_MEMBERS_DATA, FETCH_CLASSES_DATA, FETCH_ALL_NEW_REGISTERED_DATA, FETCH_ALL_RENEWED_MEMBERSHIP_DATA, SET_ATTENDANCE, UPDATED_DATA, ERROR_REPORTS_DATA, CLOSE_REPORTS_NOTIF, FETCH_CURRENT_STOCK_DATA
} from '../../actions/actionConstants';

const initialState = {
  pendingPaymentList: [],
  reportList: [],
  expiringMembershipList: [],
  expiredMemberList: [],
  nonActiveMemberList: [],
  classeList: [],
  registrationList: [],
  renewalMembershipList: [],
  currentStockList: [],
  attendanceList: [],
  notifMsg: '',
  notifType: '', // success or error
  openNoti: true,
  error: null,
  updated: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PENDING_PAYMENTS_DATA:
      return {
        ...state,
        pendingPaymentList: action.payload,
      };

    case FETCH_CURRENT_STOCK_DATA:
      return {
        ...state,
        currentStockList: action.payload,
      };

    case FETCH_REPORTS_DATA:
      return {
        ...state,
        reportList: action.payload
      };

    case FETCH_EXPIRING_MEMBERSHIPS_DATA:
      return {
        ...state,
        expiringMembershipList: action.payload,
      };

    case FETCH_EXPIRED_MEMBERS_DATA:
      return {
        ...state,
        expiredMemberList: action.payload,
      };

    case FETCH_NON_ACTIVE_MEMBERS_DATA:
      return {
        ...state,
        nonActiveMemberList: action.payload,
      };

    case FETCH_CLASSES_DATA:
      return {
        ...state,
        classeList: action.payload,
      };

    case FETCH_ALL_NEW_REGISTERED_DATA:
      return {
        ...state,
        registrationList: action.payload,
      };

    case FETCH_ALL_RENEWED_MEMBERSHIP_DATA:
      return {
        ...state,
        renewalMembershipList: action.payload,
      };

    case SET_ATTENDANCE:
      return {
        ...state,
        attendanceList: action.payload
      };

    case UPDATED_DATA:
      return {
        ...state,
        updated: !state.updated,
        notifMsg: 'Attendance mark successfully',
        notifType: notifT.success, // success or error
        openNoti: true,

      };

    case CLOSE_REPORTS_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_REPORTS_DATA: {
      return {
        ...state,
        notifMsg: action.payload,
        notifType: notifT.error,
        openNoti: true
      };
    }

    default:
      return state;
  }
}
