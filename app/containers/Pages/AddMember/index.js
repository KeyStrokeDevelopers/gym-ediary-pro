/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getAddMemberData,
  submitAddMemberData,
  addMemberData,
  closeAction,
  showDetailAction,
  editAddMemberData,
  searchAddMemberData,
  updateAddMemberData,
  deleteAddMemberData,
  setDetailField,
  loadingAction,
  hideDetailAction,
  setFilterValue,
  getGymInfoData
} from 'dan-actions/addMemberActions';
import { getPurposeData } from 'dan-actions/purposeActions';
import { getPackageData } from 'dan-actions/vendorPackageActions.js';
import { getClassData } from 'dan-actions/classActions';
import { getEnquiryData } from 'dan-actions/EnquiryActions';
import { getPaymentMethodData } from 'dan-actions/paymentMethodActions';
import styles from 'dan-components/Contact/contact-jss';
import { Notification } from 'dan-components';
import AddMember from '../../../components/AddMember/AddMember';
import AddMemberDataList from '../../../components/AddMember/AddMemberDataList';
import AddMemberDetail from '../../../components/AddMember/AddMemberDetail';
import addMemberDataField from '../../../components/AddMember/addMemberField';

class Member extends React.Component {
  componentDidMount() {
    const {
      fetchData, fetchPurposeData, fetchClassData, fetchPackageData, fetchEnquiryData, fetchPaymentMethodData, fetchGymInfoData
    } = this.props;
    fetchData();
    fetchPurposeData();
    fetchPackageData();
    fetchClassData();
    fetchEnquiryData();
    fetchPaymentMethodData();
    fetchGymInfoData();
  }

  submitAddMemberData = (data, avatar) => {
    const {
      submitData, formValue, updateData, loading
    } = this.props;
    if (Object.keys(formValue).length >= 1) {
      updateData(data);
    } else {
      const formData = new FormData();
      formData.append('addmImage', avatar);
      addMemberDataField.map((memberData) => {
        if (data.get(memberData.primary)) {
          formData.set(memberData.primary, data.get(memberData.primary));
        }
      });
      loading();
      submitData(formData);
    }
    // const avatarBase64 = typeof avatar === 'object' ? URL.createObjectURL(avatar) : avatar;
    // const avatarPreview = avatar !== null ? avatarBase64 : dummy.user.avatar;
  }

  render() {
    const title = brand.name + ' - Contact';
    const description = brand.desc;
    const {
      classes,
      addMemberData,
      itemSelected,
      showDetail,
      hideDetail,
      avatarInit,
      open,
      showMobileDetail,
      add,
      edit,
      isActive,
      occupationData,
      formValue,
      filterValue,
      filter_value,
      is_active,
      close,
      remove,
      favorite,
      purposeData,
      packageData,
      classData,
      enquiryData,
      paymentMethodData,
      gymInfoData,
      showDetails,
      keyword,
      search,
      closeNotif,
      messageNotif,
      deleteAddMemberData,
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
        <Notification close={() => closeNotif()} message={messageNotif} />
        <div className={classes.root}>
          <AddMemberDataList
            addFn
            total={addMemberData && addMemberData.length}
            addAddMemberData={add}
            filterValue={filterValue}
            clippedRight
            itemSelected={itemSelected}
            addMemberDataList={addMemberData}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            is_active={is_active}
            keyword={keyword}
          />
          <AddMemberDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            addMemberData={addMemberData}
            deleteAddMemberData={deleteAddMemberData}
            itemSelected={itemSelected}
            showDetails={showDetails}
            filterValue={filter_value}
            edit={edit}
            isActive={is_active}
            remove={remove}
            favorite={favorite}
          />
        </div>
        {gymInfoData.length >= 1
          && (
            <AddMember
              addMember={add}
              openForm={open}
              closeForm={close}
              classData={classData}
              packageData={packageData}
              purposeData={purposeData}
              addMemberData={addMemberData}
              itemSelected={itemSelected}
              occupationData={occupationData}
              enquiryData={enquiryData}
              paymentMethodData={paymentMethodData}
              gymInfoData={gymInfoData}
              edit={(Object.keys(formValue).length >= 1)}
              type="addMember"
              submit={this.submitAddMemberData}
              avatarInit={avatarInit}
              isLoading={isLoading}
            />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const addMemberReducer = state.get('addMember');
  const purposeReducer = state.get('purpose');
  const packageReducer = state.get('packageInfo');
  const classReducer = state.get('classInfo');
  const enquiryReducer = state.get('enquiry');
  const paymentMethodReducer = state.get('paymentMethod');
  return ({

    // force: state, // force state from reducer
    avatarInit: addMemberReducer.avatarInit,
    addMemberData: addMemberReducer.addMemberList,
    itemSelected: addMemberReducer.selectedIndex,
    keyword: addMemberReducer.keywordValue,
    open: addMemberReducer.openFrm,
    showMobileDetail: addMemberReducer.showMobileDetail,
    messageNotif: addMemberReducer.notifMsg,
    formValue: addMemberReducer.formValues,
    occupationData: addMemberReducer.occupation,
    is_active: addMemberReducer.isActive,
    isLoading: addMemberReducer.isLoading,
    showDetails: addMemberReducer.showDetails,
    filter_value: addMemberReducer.filterValue,
    gymInfoData: addMemberReducer.gymInfo,
    purposeData: purposeReducer.purposeList,
    packageData: packageReducer.packageList,
    classData: classReducer.classList,
    enquiryData: enquiryReducer.enquiryList,
    paymentMethodData: paymentMethodReducer.paymentMethodList,
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitAddMemberData(data)),
  updateData: (data) => dispatch(updateAddMemberData(data)),
  fetchData: () => dispatch(getAddMemberData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editAddMemberData(data)),
  add: () => dispatch(addMemberData()),
  close: () => dispatch(closeAction()),
  deleteAddMemberData: (data) => dispatch(deleteAddMemberData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchAddMemberData(data)),
  loading: () => dispatch(loadingAction()),
  fetchPurposeData: () => dispatch(getPurposeData()),
  fetchClassData: () => dispatch(getClassData()),
  fetchPackageData: () => dispatch(getPackageData()),
  fetchEnquiryData: () => dispatch(getEnquiryData()),
  fetchPaymentMethodData: () => dispatch(getPaymentMethodData()),
  fetchGymInfoData: () => dispatch(getGymInfoData()),
  filterValue: (value) => dispatch(setFilterValue(value))
  // closeNotif: () => dispatch(closeNotifAction),
});

const AddMemberMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Member);

export default withStyles(styles)(AddMemberMapped);
