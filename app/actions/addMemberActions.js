import { toast } from 'react-toastify';
import {
  FETCH_ADD_MEMBER_DATA, SEARCH_ADD_MEMBER_DATA, EDIT_ADD_MEMBER_DATA, ADD_ADD_MEMBER_DATA, SET_ADD_MEMBER_DETAILS_FIELD,
  ERROR_ADD_MEMBER_DATA, SHOW_DETAIL_ADD_MEMBER, HIDE_DETAIL_ADD_MEMBER, SUBMIT_ADD_MEMBER_DATA, CLOSE_ADD_MEMBER_FORM, LOADING_ACTION_ADD_MEMBER, VIEW_PROFILE, SET_FILTER_VALUE, FETCH_GYM_INFO
} from './actionConstants';
import history from '../utils/history';
import {
  addAddMemberApi, getAddMemberApi, updateAddMemberDataApi, getOccupationDataApi, getGymInfoApi, sendWishApi
} from '../api/addMember';

const fetchAddMemberData = addMemberData => ({
  type: FETCH_ADD_MEMBER_DATA,
  payload: addMemberData
});

const submitAction = (addMemberData) => ({
  type: SUBMIT_ADD_MEMBER_DATA,
  payload: addMemberData
});

const addMember = (data) => ({
  type: ADD_ADD_MEMBER_DATA,
  payload: data
});

const fetchGymInfoData = (data) => ({
  type: FETCH_GYM_INFO,
  payload: data
});

export const closeAction = () => ({
  type: CLOSE_ADD_MEMBER_FORM
});

// need to be name change of method     todo
export const deleteAddMemberData = (data) => {
  history.push('/app/profile');
  return ({
    type: VIEW_PROFILE,
    payload: data
  });
};

export const showDetailAction = addMemberData => ({
  type: SHOW_DETAIL_ADD_MEMBER,
  payload: addMemberData
});

export const editAddMemberData = addMemberData => ({
  type: EDIT_ADD_MEMBER_DATA,
  payload: addMemberData
});

export const searchAddMemberData = addMemberData => ({
  type: SEARCH_ADD_MEMBER_DATA,
  payload: addMemberData
});

const errorAddMemberData = error => ({
  type: ERROR_ADD_MEMBER_DATA,
  payload: error
});

export const setDetailField = (data) => ({
  type: SET_ADD_MEMBER_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_ADD_MEMBER
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_ADD_MEMBER
});

export const setFilterValue = (value) => ({
  type: SET_FILTER_VALUE,
  payload: value
});

const viewError = (error) => {
  const { response } = error;
  const { data } = response;
  const { message } = data;
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000
  });
};

export const submitAddMemberData = (data) => (dispatch) => {
  addAddMemberApi(data).then((response) => {
    toast.success('AddMember Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorAddMemberData(err));
    });
};

export const getAddMemberData = () => (dispatch) => {
  getAddMemberApi().then((response) => {
    dispatch(fetchAddMemberData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorAddMemberData(err));
  });
};

export const getGymInfoData = () => (dispatch) => {
  getGymInfoApi().then((response) => {
    dispatch(fetchGymInfoData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorAddMemberData(err));
  });
};

export const updateAddMemberData = (data) => (dispatch) => {
  updateAddMemberDataApi(data).then((response) => {
    toast.success('AddMember Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchAddMemberData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorAddMemberData(err));
  });
};

// export const deleteAddMemberData = (data) => (dispatch) => {
//     deleteAddMemberDataApi(data).then((response) => {
//         toast.success('AddMember Data Remove Successfully !', {
//             position: toast.POSITION.TOP_CENTER,
//             autoClose: 2000
//         });
//         dispatch(fetchAddMemberData(response.data));
//     }).catch((err) => {
//         viewError();
//         dispatch(errorAddMemberData(err));
//     });
// };

export const addMemberData = () => (dispatch) => {
  getOccupationDataApi().then((response) => {
    dispatch(addMember(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorAddMemberData(err));
  });
};

export const sendWish = (data) => (dispatch) => {
  sendWishApi(data).then((response) => {
    dispatch(fetchAddMemberData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorAddMemberData(err));
  });
};
