import {
  SEND_EMAIL_INVOICE, SEND_SMS_INVOICE, SEND_MEESSAGE_ERROR, CLOSE_MESSAGE_NOTIF
} from './actionConstants';
import { sendEmailApi, sendSmsApi } from '../api/Message';


const sendEmailInvoice = purposeData => ({
  type: SEND_EMAIL_INVOICE,
  payload: purposeData
});

const sendSmsInvoice = purposeData => ({
  type: SEND_SMS_INVOICE,
  payload: purposeData
});

const errorSendingMessage = error => ({
  type: SEND_MEESSAGE_ERROR,
  payload: error.response.data.message
});

export const closeNotifAction = () => ({
  type: CLOSE_MESSAGE_NOTIF
});

export const sendEmail = (data) => (dispatch) => {
  sendEmailApi(data).then((response) => {
    dispatch(sendEmailInvoice(response.data));
  }).catch((err) => {
    dispatch(errorSendingMessage(err));
  });
};

export const sendSms = (data) => (dispatch) => {
  sendSmsApi(data).then((response) => {
    dispatch(sendSmsInvoice(response.data));
  }).catch((err) => {
    dispatch(errorSendingMessage(err));
  });
};
