import notifM from 'dan-api/ui/notifMessage';
import notifT from 'dan-api/ui/notifType';
import {
  FETCH_SALE_DATA, SEARCH_SALE_DATA, EDIT_SALE_DATA, ADD_SALE_DATA, SET_SALE_DETAILS_FIELD,
  SHOW_DETAIL_SALE, HIDE_DETAIL_SALE, SUBMIT_SALE_DATA, CLOSE_SALE_FORM, LOADING_ACTION_SALE, SET_VALUE_IN_CART_SALE, RESET_CART_SALE,
  DELETE_CART_VALUE_SALE, HANDLE_NEXT_STEP_SALE, HANDLE_BACK_STEP_SALE, SHOPING_AGAIN_SALE, SET_BILL_INFO_DATA_SALE, SET_DISCOUNT_SALE,
  SET_DISCOUNT_IN_VALUE_SALE, GET_GYM_INFO_DATA_SALE, SET_PAID_AMOUNT, CLOSE_SALE_NOTIF, ERROR_SALE_DATA, SET_ACCOUNT_DATA_SALE
} from '../../actions/actionConstants';


const initialState = {
  saleList: [],
  cartList: [],
  activeStep: 0,
  formValues: {},
  selectedIndex: 0,
  selectedId: '',
  keywordValue: '',
  avatarInit: '',
  openFrm: false,
  customerData: {},
  billInfoData: {},
  gymInfoData: {},
  showMobileDetail: false,
  notifMsg: '',
  notifType: '', // success or error
  openNoti: true,
  isActive: true,
  isLoading: false,
  isSubmited: false,
  discount: 0,
  discountInValue: 0,
  paidAmount: 0,
  isFormReset: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_SALE_DATA:
      return {
        ...state,
        saleList: action.payload,
        openFrm: false,
        isLoading: false,
        selectedIndex: 0,
      };
    case SEARCH_SALE_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_SALE_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isFormReset: false,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_SALE_DATA:
      return {
        ...state,
        openFrm: true,
        isFormReset: false,
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_SALE_DATA:
      return {
        ...state,
        openFrm: false,
        avatarInit: '',
        saleList: [...state.saleList, action.payload],
        isLoading: false,
        isFormReset: true,
        notifMsg: notifM.saved,
        notifType: notifT.success,
        openNoti: true,
        isSubmited: true
      };
    case SET_VALUE_IN_CART_SALE:
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };
    case LOADING_ACTION_SALE:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_SALE:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_SALE_FORM:
      return {
        ...state,
        openFrm: false,
        avatarInit: ''
      };

    case SET_SALE_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_SALE: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case RESET_CART_SALE: {
      return {
        ...state,
        cartList: [],
        activeStep: 0,
        formValues: {}
      };
    }

    case DELETE_CART_VALUE_SALE: {
      const cartListCopy = [...state.cartList];
      cartListCopy.splice(action.payload, 1);
      return {
        ...state,
        cartList: cartListCopy
      };
    }

    case HANDLE_NEXT_STEP_SALE: {
      return {
        ...state,
        activeStep: state.activeStep + 1
      };
    }

    case HANDLE_BACK_STEP_SALE: {
      return {
        ...state,
        activeStep: state.activeStep - 1
      };
    }

    case SHOPING_AGAIN_SALE: {
      return {
        ...state,
        activeStep: 0,
        isSubmited: false,
        cartList: [],
        formValues: {},
        customerData: {},
        billInfoData: {},

      };
    }

    case SET_BILL_INFO_DATA_SALE: {
      return {
        ...state,
        billInfoData: action.payload,
        activeStep: state.activeStep + 1
      };
    }

    case SET_ACCOUNT_DATA_SALE: {
      return {
        ...state,
        customerData: action.payload,
        activeStep: state.activeStep + 1
      };
    }

    case SET_DISCOUNT_SALE: {
      return {
        ...state,
        discount: action.payload
      };
    }

    case SET_DISCOUNT_IN_VALUE_SALE: {
      return {
        ...state,
        discountInValue: action.payload
      };
    }

    case SET_PAID_AMOUNT: {
      const paidAmount = action.payload === 'NaN' ? 0 : action.payload;
      return {
        ...state,
        paidAmount
      };
    }

    case GET_GYM_INFO_DATA_SALE: {
      return {
        ...state,
        gymInfoData: action.payload
      };
    }

    case CLOSE_SALE_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    case ERROR_SALE_DATA: {
      return {
        ...state,
        notifMsg: action.payload,
        notifType: notifT.error,
        openNoti: true,
        isSubmited: true,
        selectedIndex: 0
      };
    }

    default:
      return state;
  }
}
