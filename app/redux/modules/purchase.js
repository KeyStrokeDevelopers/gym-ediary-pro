
import {
  FETCH_PURCHASE_DATA, SEARCH_PURCHASE_DATA, EDIT_PURCHASE_DATA, ADD_PURCHASE_DATA, SET_PURCHASE_DETAILS_FIELD,
  SHOW_DETAIL_PURCHASE, HIDE_DETAIL_PURCHASE, SUBMIT_PURCHASE_DATA, CLOSE_PURCHASE_FORM, LOADING_ACTION_PURCHASE, SET_VALUE_IN_CART, RESET_CART, DELETE_CART_VALUE, SET_ACCOUNT_DATA, HANDLE_NEXT_STEP, HANDLE_BACK_STEP, SHOPING_AGAIN, SET_BILL_INFO_DATA, SET_DISCOUNT, SET_DISCOUNT_IN_VALUE, GET_GYM_INFO_DATA
} from '../../actions/actionConstants';


const initialState = {
  purchaseList: [],
  cartList: [],
  activeStep: 0,
  formValues: {},
  selectedIndex: 0,
  selectedId: '',
  keywordValue: '',
  avatarInit: '',
  openFrm: false,
  accountData: {},
  billInfoData: {},
  gymInfoData: {},
  showMobileDetail: false,
  notifMsg: '',
  isActive: true,
  isLoading: false,
  discount: 0,
  discountInValue: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PURCHASE_DATA:
      return {
        ...state,
        purchaseList: action.payload,
        openFrm: false,
        isLoading: false
      };
    case SEARCH_PURCHASE_DATA:
      return {
        ...state,
        keywordValue: action.payload.toLowerCase(),
        isLoading: false
      };
    case EDIT_PURCHASE_DATA:
      return {
        ...state,
        openFrm: true,
        // .set('selectedId', action.item.get('id'))
        formValues: action.payload,
        isLoading: false
        // .set('avatarInit', action.item.get('avatar'));
      };
    case ADD_PURCHASE_DATA:
      return {
        ...state,
        openFrm: true,
        avatarInit: '',
        isLoading: false
      };

    case SUBMIT_PURCHASE_DATA:
      return {
        ...state,
        openFrm: false,
        avatarInit: '',
        purchaseList: [...state.purchaseList, action.payload],
        isLoading: false
      };
    case SET_VALUE_IN_CART:
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };
    case LOADING_ACTION_PURCHASE:
      return {
        ...state,
        isLoading: true
      };

    case SHOW_DETAIL_PURCHASE:
      return {
        ...state,
        selectedIndex: action.payload,
        showMobileDetail: true,
      };

    case CLOSE_PURCHASE_FORM:
      return {
        ...state,
        openFrm: false,
        avatarInit: ''
      };

    case SET_PURCHASE_DETAILS_FIELD: {
      return {
        ...state,
        isActive: action.payload,
        selectedIndex: 0

      };
    }

    case HIDE_DETAIL_PURCHASE: {
      return {
        ...state,
        showMobileDetail: false
      };
    }

    case RESET_CART: {
      return {
        ...state,
        cartList: [],
        activeStep: 0,
        formValues: {}
      };
    }

    case DELETE_CART_VALUE: {
      const cartListCopy = [...state.cartList];
      cartListCopy.splice(action.payload, 1);
      return {
        ...state,
        cartList: cartListCopy
      };
    }

    case SET_ACCOUNT_DATA: {
      return {
        ...state,
        accountData: action.payload,
        activeStep: state.activeStep + 1
      };
    }

    case HANDLE_NEXT_STEP: {
      return {
        ...state,
        activeStep: state.activeStep + 1
      };
    }

    case HANDLE_BACK_STEP: {
      return {
        ...state,
        activeStep: state.activeStep - 1
      };
    }

    case SHOPING_AGAIN: {
      return {
        ...state,
        activeStep: 0,
        cartList: [],
        formValues: {},
        accountData: {},
        billInfoData: {},

      };
    }

    case SET_BILL_INFO_DATA: {
      return {
        ...state,
        billInfoData: action.payload,
        activeStep: state.activeStep + 1
      };
    }

    case SET_DISCOUNT: {
      return {
        ...state,
        discount: action.payload
      };
    }

    case SET_DISCOUNT_IN_VALUE: {
      return {
        ...state,
        discountInValue: action.payload
      };
    }

    case GET_GYM_INFO_DATA: {
      return {
        ...state,
        gymInfoData: action.payload
      };
    }

    default:
      return state;
  }
}
