
import { REGISTRATION_FAILED, REGISTRATION_SUCCESS } from '../../actions/actionConstants';

const initialState = {
  registrationInfo: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return state;
    case REGISTRATION_FAILED:
      return state;
    default:
      return state;
  }
}
