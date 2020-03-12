/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getClassData,
  submitClassData,
  addClassData,
  closeAction,
  showDetailAction,
  editClassData,
  searchClassData,
  updateClassData,
  deleteClassData,
  setDetailField,
  loadingAction,
  hideDetailAction,
  closeNotifAction
} from 'dan-actions/ClassActions';
import { getStaffData } from 'dan-actions/StaffActions';
import { AddContact } from 'dan-components';
import StyledNotif from '../../../components/Notification/StyledNotif';
import styles from 'dan-components/Contact/contact-jss';
import ClassDataList from '../../../components/Contact/ClassDataList';
import ClassDetail from '../../../components/Contact/ClassDetail';

class Classes extends React.Component {
  componentDidMount() {
    const { fetchData, fetchStaffData } = this.props;
    fetchData();
    fetchStaffData();
  }

  submitClassData = (data, avatar) => {
    const {
      submitData, formValue, updateData, loading
    } = this.props;
    if (Object.keys(formValue).length >= 1) {
      updateData(data);
    } else {
      loading();
      submitData(data);
    }
    const avatarPreview = avatar !== null ? avatarBase64 : dummy.user.avatar;
  }

  render() {
    const title = brand.name + ' - Contact';
    const description = brand.desc;
    const {
      classes,
      classData,
      itemSelected,
      showDetail,
      hideDetail,
      avatarInit,
      open,
      showMobileDetail,
      add,
      edit,
      formValue,
      isActive,
      is_active,
      close,
      remove,
      favorite,
      keyword,
      search,
      messageNotif,
      notifType,
      openNoti,
      closeNotif,
      deleteClassData,
      staffData,
      isLoading
    } = this.props;
    const isClassData = classData.length >= 1;
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
          <ClassDataList
            addFn
            total={classData && classData.length}
            addClassData={add}
            clippedRight
            itemSelected={itemSelected}
            classDataList={classData}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            is_active={is_active}
            keyword={keyword}
          />
          <ClassDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            classData={classData}
            deleteClassData={deleteClassData}
            itemSelected={itemSelected}
            edit={edit}
            isActive={is_active}
            remove={remove}
            favorite={favorite}
          />
        </div>
        <AddContact
          addContact={add}
          openForm={open}
          formType="class"
          edit={(Object.keys(formValue).length >= 1)}
          closeForm={close}
          submit={this.submitClassData}
          avatarInit={avatarInit}
          isLoading={isLoading}
          staffData={staffData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const classReducer = state.get('classInfo');
  const staffReducer = state.get('staff');
  return ({
    // force: state, // force state from reducer
    avatarInit: classReducer.avatarInit,
    classData: classReducer.classList,
    staffData: staffReducer.staffList,
    itemSelected: classReducer.selectedIndex,
    keyword: classReducer.keywordValue,
    open: classReducer.openFrm,
    showMobileDetail: classReducer.showMobileDetail,
    messageNotif: classReducer.notifMsg,
    notifType: classReducer.notifType,
    openNoti: classReducer.openNoti,
    formValue: classReducer.formValues,
    is_active: classReducer.isActive,
    isLoading: classReducer.isLoading
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitClassData(data)),
  updateData: (data) => dispatch(updateClassData(data)),
  fetchData: () => dispatch(getClassData()),
  fetchStaffData: () => dispatch(getStaffData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editClassData(data)),
  add: () => dispatch(addClassData()),
  close: () => dispatch(closeAction()),
  deleteClassData: (data) => dispatch(deleteClassData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchClassData(data)),
  loading: () => dispatch(loadingAction()),
  closeNotif: () => dispatch(closeNotifAction()),
});

const ClassMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Classes);

export default withStyles(styles)(ClassMapped);
