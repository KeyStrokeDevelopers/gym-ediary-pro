
import { LOGIN_STAFF, LOGIN_ERROR } from '../../actions/actionConstants';

const initialState = {
  staffInfo: {
    'empName': 'Virender Maira',
    'empEmail': 'viru@gmail.com',
    'empContact': '1111111111'
  },
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

    case LOGIN_ERROR:
      return state;
    default:
      return state;
  }
}