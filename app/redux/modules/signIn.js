

import notifT from 'dan-api/ui/notifType';
import {
  LOGIN_STAFF, LOGIN_ERROR, STAFF_INITIAL_IFNO, CLOSE_LOGIN_NOTIF
} from '../../actions/actionConstants';

const initialState = {
  staffInfo: {},
  gymInfo: {},
  accessInfo: {},
  subscriptionInfo: {},
  notifMsg: '',
  notifType: '', // success or error
  openNoti: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_STAFF:
      return {
        ...state,
        staffInfo: action.payload.staffInfo,
        gymInfo: action.payload.gymInfo,
        accessInfo: action.payload.accessInfo,
        subscriptionInfo: action.payload.subscriptionInfo,
        notifMsg: 'Sigin in success',
        notifType: notifT.success,
        openNoti: true,
      };

    case STAFF_INITIAL_IFNO:
      return {
        ...state,
        staffInfo: action.payload.staffData,
        gymInfo: action.payload.gymData
      };

    case LOGIN_ERROR:
      return {
        ...state,
        notifMsg: 'Registered Number, Contact Number or Password is incorrect',
        notifType: notifT.error,
        openNoti: true
      };

    case CLOSE_LOGIN_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    default:
      return state;
  }
}
