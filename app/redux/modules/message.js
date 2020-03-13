import notifT from 'dan-api/ui/notifType';
import {
  SEND_EMAIL_INVOICE, SEND_SMS_INVOICE, SEND_MEESSAGE_ERROR, CLOSE_MESSAGE_NOTIF
} from '../../actions/actionConstants';

const initialState = {
  notifMsg: '',
  notifType: '', // success or error
  openNoti: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEND_EMAIL_INVOICE:
      return {
        notifMsg: 'Email is send to your email id',
        notifType: notifT.success,
        openNoti: true
      };

    case SEND_SMS_INVOICE:
      return {
        notifMsg: 'SMS is send to your contact number',
        notifType: notifT.success,
        openNoti: true
      };

    case SEND_MEESSAGE_ERROR: {
      return {
        ...state,
        notifMsg: action.payload,
        notifType: notifT.error,
        openNoti: true
      };
    }

    case CLOSE_MESSAGE_NOTIF: {
      return {
        ...state,
        openNoti: false
      };
    }

    default:
      return state;
  }
}
