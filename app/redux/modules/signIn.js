

import { LOGIN_STAFF, LOGIN_ERROR, STAFF_INITIAL_IFNO } from '../../actions/actionConstants';

const initialState = {
  staffInfo: {},
  gymInfo: {},
  accessInfo: {},
  subscriptionInfo: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_STAFF:
      return {
        ...state,
        staffInfo: action.payload.staffInfo,
        gymInfo: action.payload.gymInfo,
        accessInfo: action.payload.accessInfo,
        subscriptionInfo: action.payload.subscriptionInfo
      };

    case STAFF_INITIAL_IFNO:
      return {
        ...state,
        staffInfo: action.payload
      };

    case LOGIN_ERROR:
      return state;
    default:
      return state;
  }
}
