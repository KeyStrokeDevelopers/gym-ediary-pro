import { FETCH_PAYMENT_METHOD_DATA, SEARCH_PAYMENT_METHOD_DATA, EDIT_PAYMENT_METHOD_DATA, DELETE_PAYMENT_METHOD_DATA, ADD_PAYMENT_METHOD_DATA, ERROR_PAYMENT_METHOD_DATA } from '../actions/actionConstants';
import { addPaymentMethodApi, getPaymentMethodApi } from '../api/paymentMethod'

const fetchPaymentMethodData = paymentMethodData => ({
    type: FETCH_PAYMENT_METHOD_DATA,
    payload: paymentMethodData
});

const editPaymentMethodData = paymentMethodData => ({
    type: EDIT_PAYMENT_METHOD_DATA,
    payload: paymentMethodData
});

const searchPaymentMethodData = paymentMethodData => ({
    type: SEARCH_PAYMENT_METHOD_DATA,
    payload: paymentMethodData
});

const deletePaymentMethodData = paymentMethodData => ({
    type: DELETE_PAYMENT_METHOD_DATA,
    payload: paymentMethodData
});

const addPaymentMethodData = paymentMethodData => ({
    type: ADD_PAYMENT_METHOD_DATA,
    payload: paymentMethodData
});

const errorPaymentMethodData = error => ({
    type: ERROR_PAYMENT_METHOD_DATA,
    payload: error
})

export const addPaymentMethod = (data) => {
    return (dispatch) => {
        addPaymentMethodApi(data).then((response) => {
            console.log('response data --------', response.data);
            dispatch(addPaymentMethodData(response.data))
        })
            .catch((err) => {
                console.log('error-----', err);
                dispatch(errorPaymentMethodData(err));
            })
    }
}

