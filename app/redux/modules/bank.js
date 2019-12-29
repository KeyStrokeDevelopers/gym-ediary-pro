import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import {
    FETCH_BANK_DATA, SEARCH_BANK_DATA, EDIT_BANK_DATA, DELETE_BANK_DATA, ADD_BANK_DATA,
    ERROR_BANK_DATA, SHOW_DETAIL_BANK, HIDE_DETAIL_BANK, SUBMIT_BANK_DATA, CLOSE_BANK_FORM, TOGGLE_FAVORITE_BANK, CLOSE_NOTIF
} from '../../actions/actionConstants';


const initialState = {
    bankList: [{ bankName: 'sbi', accountNumber: '1234565', ifsc: '1245', upi: 'okdfa@12', accountHolder: 'Virender', swipe: 'yes', status: '1' },
    { bankName: 'hdfc', accountNumber: '1234565', ifsc: '1245', upi: 'okdfa@12', accountHolder: 'Virender', swipe: 'yes', status: '1' }],
    formValues: Map(),
    selectedIndex: 0,
    selectedId: '',
    keywordValue: '',
    avatarInit: '',
    openFrm: false,
    showMobileDetail: false,
    notifMsg: '',
};
let editingIndex = 0;

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_BANK_DATA:
            return {
                ...state,
                bankList: [{ bankName: 'sbi', accountNumber: '1234565', ifsc: '1245', upi: 'okdfa@12', accountHolder: 'Virender', swipe: 'yes', status: '1' },
                { bankName: 'hdfc', accountNumber: '1234565', ifsc: '1245', upi: 'okdfa@12', accountHolder: 'Virender', swipe: 'yes', status: '1' }]
            }
        case SEARCH_BANK_DATA:
            return state.withMutations((mutableState) => {
                action.keyword.persist();
                const keyword = action.keyword.target.value.toLowerCase();
                mutableState.set('keywordValue', keyword);
            });
        case EDIT_BANK_DATA:
            return state.withMutations((mutableState) => {
                editingIndex = state.get('contactList').indexOf(action.item);
                mutableState
                    .set('openFrm', true)
                    .set('selectedId', action.item.get('id'))
                    .set('formValues', action.item)
                    .set('avatarInit', action.item.get('avatar'));
            });
        case ADD_BANK_DATA:
            return {
                ...state,
                openFrm: true,
                formValues: Map([]),
                avatarInit: ''
            }
        case SUBMIT_BANK_DATA:
            return {
                ...state,
                openFrm: false,
                formValues: Map([]),
                avatarInit: '',
                bankList: [{ bankName: 'sbi', accountNumber: '1234565', ifsc: '1245', upi: 'okdfa@12', accountHolder: 'Virender', swipe: 'yes', status: '1' },
                { bankName: 'hdfc', accountNumber: '1234565', ifsc: '1245', upi: 'okdfa@12', accountHolder: 'Virender', swipe: 'yes', status: '1' }]
            }
        // return state.withMutations((mutableState) => {
        //     const initItem = Map(action.newData);
        //     if (state.get('selectedId') === action.newData.get('id')) {
        //         // Update data
        //         const avatar = action.avatar !== '' ? action.avatar : state.get('avatarInit');
        //         const newItem = initItem.update((initUpdated) => (initUpdated.set('avatar', avatar)));
        //         mutableState
        //             .update('contactList', contactList => contactList.setIn(
        //                 [editingIndex], newItem
        //             ))
        //             .set('notifMsg', notif.updated);
        //     } else {
        //         // Insert data
        //         const avatar = action.avatar !== '' ? action.avatar : '/images/pp_boy.svg';
        //         const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        //         const newItem = initItem
        //             .update('id', (val = id) => val)
        //             .update('avatar', (val = avatar) => val)
        //             .update('favorited', (val = false) => val);
        //         mutableState
        //             .update('contactList', contactList => contactList.unshift(newItem))
        //             .set('selectedIndex', 0)
        //             .set('notifMsg', notif.saved);
        //     }
        //     mutableState
        //         .set('formValues', null)
        //         .set('avatarInit', '')
        //         .set('openFrm', false);
        // });
        case CLOSE_BANK_FORM:
            return {
                ...state,
                openFrm: false,
                formValues: Map([]),
                avatarInit: ''
            }

        case SHOW_DETAIL_BANK:
            return state.withMutations((mutableState) => {
                const index = state.get('contactList').indexOf(action.item);
                mutableState
                    .set('selectedIndex', index)
                    .set('showMobileDetail', true);
            });
        case HIDE_DETAIL_BANK:
            return state.withMutations((mutableState) => {
                mutableState.set('showMobileDetail', false);
            });
        case DELETE_BANK_DATA:
            return state.withMutations((mutableState) => {
                const index = state.get('contactList').indexOf(action.item);
                mutableState
                    .update('contactList', contactList => contactList.splice(index, 1))
                    .set('notifMsg', notif.removed);
            });
        case TOGGLE_FAVORITE_BANK:
            return state.withMutations((mutableState) => {
                const index = state.get('contactList').indexOf(action.item);
                mutableState.update('contactList', contactList => contactList
                    .setIn([index, 'favorited'], !state.getIn(['contactList', index, 'favorited']))
                );
            });
        case CLOSE_NOTIF:
            return state.withMutations((mutableState) => {
                mutableState.set('notifMsg', '');
            });


        default:
            return state;
    }
}