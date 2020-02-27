/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getEnquiryData,
  submitEnquiryData,
  addEnquiryData,
  closeAction,
  showDetailAction,
  editEnquiryData,
  searchEnquiryData,
  updateEnquiryData,
  deleteEnquiryData,
  setDetailField,
  loadingAction,
  hideDetailAction,
  dateFromTo
} from 'dan-actions/EnquiryActions';
import { getPackageData } from 'dan-actions/vendorPackageActions';
import { getPurposeData } from 'dan-actions/purposeActions';
import { getClassData } from 'dan-actions/classActions';
import styles from 'dan-components/Contact/contact-jss';
import { Notification } from 'dan-components';
import AddEnquiry from '../../../components/Enquiry/AddEnquiry';
import EnquiryDataList from '../../../components/Enquiry/EnquiryDataList';
import EnquiryDetail from '../../../components/Enquiry/EnquiryDetail';

class Enquiry extends React.Component {
  componentDidMount() {
    const {
      fetchData, fetchPurposeData, fetchPackageData, fetchClassData
    } = this.props;
    fetchData();
    fetchPurposeData();
    fetchPackageData();
    fetchClassData();
  }

  submitEnquiryData = (data, avatar) => {
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

  handleDateFromToFilter = (date) => {
    const { dateFromTo } = this.props;
    dateFromTo(date);
  }

  render() {
    const title = brand.name + ' - Contact';
    const description = brand.desc;
    const {
      classes,
      enquiryData,
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
      purposeData,
      packageData,
      classData,
      keyword,
      search,
      closeNotif,
      messageNotif,
      deleteEnquiryData,
      isLoading,
      fromToDate
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
        <Notification close={() => closeNotif()} message={messageNotif} />
        <div className={classes.root}>
          <EnquiryDataList
            addFn
            total={enquiryData && enquiryData.length}
            addEnquiryData={add}
            clippedRight
            itemSelected={itemSelected}
            enquiryDataList={enquiryData}
            isActive={isActive}
            showDetail={showDetail}
            dateFromTo={this.handleDateFromToFilter}
            search={search}
            isFollowUp={is_active}
            keyword={keyword}
          />
          <EnquiryDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            enquiryData={enquiryData}
            deleteEnquiryData={deleteEnquiryData}
            itemSelected={itemSelected}
            edit={edit}
            isFollowUp={is_active}
            fromToDate={fromToDate}
            remove={remove}
            favorite={favorite}
          />
        </div>
        <AddEnquiry
          addEnquiry={add}
          openForm={open}
          closeForm={close}
          packageData={packageData}
          purposeData={purposeData}
          classData={classData}
          type="enquiry"
          edit={(Object.keys(formValue).length >= 1)}
          submit={this.submitEnquiryData}
          avatarInit={avatarInit}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const enquiryReducer = state.get('enquiry');
  const purposeReducer = state.get('purpose');
  const packageReducer = state.get('packageInfo');
  const classReducer = state.get('classInfo');
  return ({

    // force: state, // force state from reducer
    avatarInit: enquiryReducer.avatarInit,
    enquiryData: enquiryReducer.enquiryList,
    itemSelected: enquiryReducer.selectedIndex,
    keyword: enquiryReducer.keywordValue,
    open: enquiryReducer.openFrm,
    showMobileDetail: enquiryReducer.showMobileDetail,
    messageNotif: enquiryReducer.notifMsg,
    formValue: enquiryReducer.formValues,
    is_active: enquiryReducer.isActive,
    isLoading: enquiryReducer.isLoading,
    purposeData: purposeReducer.purposeList,
    packageData: packageReducer.packageList,
    classData: classReducer.classList,
    fromToDate: enquiryReducer.fromToDate,
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitEnquiryData(data)),
  updateData: (data) => dispatch(updateEnquiryData(data)),
  fetchData: () => dispatch(getEnquiryData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editEnquiryData(data)),
  add: () => dispatch(addEnquiryData()),
  close: () => dispatch(closeAction()),
  deleteEnquiryData: (data) => dispatch(deleteEnquiryData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchEnquiryData(data)),
  loading: () => dispatch(loadingAction()),
  fetchPurposeData: () => dispatch(getPurposeData()),
  fetchPackageData: () => dispatch(getPackageData()),
  fetchClassData: () => dispatch(getClassData()),
  dateFromTo: (date) => dispatch(dateFromTo(date))
  // closeNotif: () => dispatch(closeNotifAction),
});

const EnquiryMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Enquiry);

export default withStyles(styles)(EnquiryMapped);
