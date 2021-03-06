/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getStaffData,
  submitStaffData,
  addStaffData,
  closeAction,
  showDetailAction,
  editStaffData,
  searchStaffData,
  updateStaffData,
  activeStaffData,
  deleteStaffData,
  setDetailField,
  loadingAction,
  hideDetailAction,
  fetchAccessData,
  changePassword,
  closeNotifAction
} from 'dan-actions/StaffActions';
import { AddContact } from 'dan-components';
import styles from 'dan-components/Contact/contact-jss';
import StaffDataList from '../../../components/Contact/StaffDataList';
import StaffDetail from '../../../components/Contact/StaffDetail';
import staffDataField from '../../../components/Contact/FieldData.js';
import StyledNotif from '../../../components/Notification/StyledNotif';

class Staff extends React.Component {
  componentDidMount() {
    const { fetchData, fetchAccess } = this.props;
    fetchData();
    fetchAccess();
  }

  createFormData = (data, avatar) => {
    const formData = new FormData();
    if (avatar) {
      formData.append('staffImage', avatar);
    }
    staffDataField.map((staffData) => {
      if (data.get(staffData.primary)) {
        formData.set(staffData.primary, data.get(staffData.primary));
      }
      return null;
    });
    return formData;
  }


  submitStaffData = (data, avatar) => {
    const {
      submitData, formValue, updateData, loading
    } = this.props;
    if (Object.keys(formValue).length >= 1) {
      let formData = this.createFormData(data, avatar);
      formData.set('_id', data.get('_id'));
      updateData(formData);
    } else {
      const formData = this.createFormData(data, avatar);
      loading();
      submitData(formData);
      return null;
    }
    // const avatarBase64 = typeof avatar === 'object' ? URL.createObjectURL(avatar) : avatar;
    // const avatarPreview = avatar !== null ? avatarBase64 : dummy.user.avatar;
  }

  render() {
    const title = brand.name + ' - Contact';
    const description = brand.desc;
    const {
      classes,
      staffData,
      accessData,
      itemSelected,
      showDetail,
      hideDetail,
      avatarInit,
      open,
      showMobileDetail,
      add,
      edit,
      formValue,
      changePasswordData,
      isActive,
      isActiveData,
      close,
      remove,
      favorite,
      keyword,
      search,
      messageNotif,
      notifType,
      openNoti,
      closeNotif,
      delete_Staff_Data,
      active_Staff_Data,
      isFormReset,
      isLoading
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <StyledNotif close={() => closeNotif()} openNoti={openNoti} message={messageNotif} notifType={notifType} />
        <div className={classes.root}>
          <StaffDataList
            addFn
            total={staffData && staffData.length}
            addStaffData={add}
            clippedRight
            itemSelected={itemSelected}
            staffDataList={staffData}
            isActiveData={isActiveData}
            showDetail={showDetail}
            search={search}
            isActive={isActive}
            keyword={keyword}
          />
          <StaffDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            changePassword={changePasswordData}
            staffData={staffData}
            deleteStaffData={delete_Staff_Data}
            activeStaffData={active_Staff_Data}
            itemSelected={itemSelected}
            edit={edit}
            isActive={isActive}
            remove={remove}
            favorite={favorite}
          />
        </div>
        <AddContact
          addContact={add}
          openForm={open}
          edit={(Object.keys(formValue).length >= 1)}
          formType="staff"
          closeForm={close}
          accessData={accessData}
          isFormReset={isFormReset}
          staffData={staffData}
          initFormValue={formValue}
          itemSelected={itemSelected}
          submit={this.submitStaffData}
          avatarInit={avatarInit}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const staffReducer = state.get('staff');
  return ({
    // force: state, // force state from reducer
    avatarInit: staffReducer.avatarInit,
    staffData: staffReducer.staffList,
    accessData: staffReducer.accessList,
    itemSelected: staffReducer.selectedIndex,
    keyword: staffReducer.keywordValue,
    open: staffReducer.openFrm,
    showMobileDetail: staffReducer.showMobileDetail,
    messageNotif: staffReducer.notifMsg,
    notifType: staffReducer.notifType,
    openNoti: staffReducer.openNoti,
    formValue: staffReducer.formValues,
    isActive: staffReducer.isActive,
    isLoading: staffReducer.isLoading,
    isFormReset: staffReducer.isFormReset
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitStaffData(data)),
  updateData: (data) => dispatch(updateStaffData(data)),
  fetchData: () => dispatch(getStaffData()),
  fetchAccess: () => dispatch(fetchAccessData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editStaffData(data)),
  add: () => dispatch(addStaffData()),
  close: () => dispatch(closeAction()),
  delete_Staff_Data: (data) => dispatch(deleteStaffData(data)),
  active_Staff_Data: (dataId) => dispatch(activeStaffData(dataId)),
  isActiveData: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchStaffData(data)),
  closeNotif: () => dispatch(closeNotifAction()),
  loading: () => dispatch(loadingAction()),
  changePasswordData: (newPassword, staffId) => dispatch(changePassword(newPassword, staffId))
});

const StaffMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Staff);

export default withStyles(styles)(StaffMapped);
