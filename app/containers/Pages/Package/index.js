/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import Typography from '@material-ui/core/Typography';
import {
  getPackageData,
  submitPackageData,
  addPackageData,
  closeAction,
  showDetailAction,
  editPackageData,
  searchPackageData,
  updatePackageData,
  deletePackageData,
  setDetailField,
  loadingAction,
  hideDetailAction,
  closeNotifAction
} from 'dan-actions/vendorPackageActions';
import { AddContact } from 'dan-components';
import styles from 'dan-components/Contact/contact-jss';
import PackageDataList from '../../../components/Contact/PackageDataList';
import PackageDetail from '../../../components/Contact/PackageDetail';
import StyledNotif from '../../../components/Notification/StyledNotif';

class Package extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  submitPackageData = (data, avatar) => {
    const {
      submitData, formValue, updateData, loading
    } = this.props;
    if (Object.keys(formValue).length >= 1) {
      updateData(data);
    } else {
      loading();
      submitData(data);
    }
  }

  render() {
    const title = brand.name + ' - Contact';
    const description = brand.desc;
    const {
      classes,
      dataContact,
      packageData,
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
      deletePackageData,
      isLoading
    } = this.props;
    const isPackageData = packageData.length >= 1;
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
          <PackageDataList
            addFn
            total={packageData && packageData.length}
            addPackageData={add}
            clippedRight
            itemSelected={itemSelected}
            packageDataList={packageData}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            is_active={is_active}
            keyword={keyword}
          />
          <PackageDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            packageData={packageData}
            deletePackageData={deletePackageData}
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
          formType="package"
          edit={(Object.keys(formValue).length >= 1)}
          closeForm={close}
          submit={this.submitPackageData}
          avatarInit={avatarInit}
          isLoading={isLoading}
        />
      </div>
    );
  }
}


const mapStateToProps = state => {
  const packageReducer = state.get('packageInfo');
  return ({

    // force: state, // force state from reducer
    avatarInit: packageReducer.avatarInit,
    packageData: packageReducer.packageList,
    itemSelected: packageReducer.selectedIndex,
    keyword: packageReducer.keywordValue,
    open: packageReducer.openFrm,
    showMobileDetail: packageReducer.showMobileDetail,
    messageNotif: packageReducer.notifMsg,
    notifType: packageReducer.notifType,
    openNoti: packageReducer.openNoti,
    formValue: packageReducer.formValues,
    is_active: packageReducer.isActive,
    isLoading: packageReducer.isLoading
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitPackageData(data)),
  updateData: (data) => dispatch(updatePackageData(data)),
  fetchData: () => dispatch(getPackageData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editPackageData(data)),
  add: () => dispatch(addPackageData()),
  close: () => dispatch(closeAction()),
  deletePackageData: (data) => dispatch(deletePackageData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchPackageData(data)),
  loading: () => dispatch(loadingAction()),
  closeNotif: () => dispatch(closeNotifAction()),
});

const PackageMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Package);

export default withStyles(styles)(PackageMapped);
