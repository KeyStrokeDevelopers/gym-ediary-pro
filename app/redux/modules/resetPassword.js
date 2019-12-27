
import { INIT } from '../../actions/actionConstants';

const initialState = {
    usersLogin: {
        email: 'johndoe@mail.com',
        password: '12345678',
        remember: false
    }
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case INIT:
            return state;
        default:
            return state;
    }
}