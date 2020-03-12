/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getSmsData,
  getSmsActiveData,
  submitSmsData,
  addSmsData,
  closeAction,
  showDetailAction,
  editSmsData,
  searchSmsData,
  updateSmsData,
  deleteSmsData,
  setDetailField,
  loadingAction,
  hideDetailAction,
  closeNotifAction
} from 'dan-actions/SmsActions';
import styles from 'dan-components/Contact/contact-jss';
import SmsDataList from '../../../components/Sms/SmsDataList';
import SmsDetail from '../../../components/Sms/SmsDetail';
import AddSms from '../../../components/Sms/AddSms';
import { getSmsActiveApi } from '../../../api/sms';
import StyledNotif from '../../../components/Notification/StyledNotif';

class Sms extends React.Component {
  componentDidMount() {
    const { fetchData, fetchActiveSmsData } = this.props;
    fetchData();
    fetchActiveSmsData();
  }

  submitSmsData = (data, avatar) => {
    const {
      submitData, formValue, updateData, loading
    } = this.props;
    if (Object.keys(formValue).length >= 1) {
      updateData(data);
    } else {
      loading();
      submitData(data);
    }
    // const avatarBase64 = typeof avatar === 'object' ? URL.createObjectURL(avatar) : avatar;
    // const avatarPreview = avatar !== null ? avatarBase64 : dummy.user.avatar;
  }

  render() {
    const title = brand.name + ' - Contact';
    const description = brand.desc;
    const {
      classes,
      smsData,
      smsActiveData,
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
      deleteSmsData,
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
          <SmsDataList
            addFn
            total={smsActiveData && smsActiveData.length}
            addSmsData={add}
            clippedRight
            itemSelected={itemSelected}
            smsDataList={smsActiveData}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            is_active={is_active}
            keyword={keyword}
          />
          <SmsDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            smsData={smsActiveData}
            deleteSmsData={deleteSmsData}
            itemSelected={itemSelected}
            edit={edit}
            isActive={is_active}
            remove={remove}
            favorite={favorite}
          />
        </div>
        <AddSms
          addContact={add}
          openForm={open}
          smsData={smsData}
          edit={(Object.keys(formValue).length >= 1)}
          closeForm={close}
          submit={this.submitSmsData}
          avatarInit={avatarInit}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const smsReducer = state.get('sms');
  return ({

    // force: state, // force state from reducer
    avatarInit: smsReducer.avatarInit,
    smsData: smsReducer.smsList,
    smsActiveData: smsReducer.smsActiveList,
    itemSelected: smsReducer.selectedIndex,
    keyword: smsReducer.keywordValue,
    open: smsReducer.openFrm,
    showMobileDetail: smsReducer.showMobileDetail,
    messageNotif: smsReducer.notifMsg,
    notifType: smsReducer.notifType,
    openNoti: smsReducer.openNoti,
    formValue: smsReducer.formValues,
    is_active: smsReducer.isActive,
    isLoading: smsReducer.isLoading
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitSmsData(data)),
  updateData: (data) => dispatch(updateSmsData(data)),
  fetchData: () => dispatch(getSmsData()),
  fetchActiveSmsData: () => dispatch(getSmsActiveData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editSmsData(data)),
  add: () => dispatch(addSmsData()),
  close: () => dispatch(closeAction()),
  deleteSmsData: (data) => dispatch(deleteSmsData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchSmsData(data)),
  loading: () => dispatch(loadingAction()),
  closeNotif: () => dispatch(closeNotifAction()),
});

const SmsMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Sms);

export default withStyles(styles)(SmsMapped);
