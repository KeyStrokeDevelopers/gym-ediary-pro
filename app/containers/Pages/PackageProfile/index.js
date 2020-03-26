/* eslint-disable */
import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchAction, toggleStaredAction } from 'dan-actions/EmailActions';
import { getPaymentMethodData } from 'dan-actions/paymentMethodActions';
import styles from 'dan-components/Email/email-jss';
import PackageList from '../../../components/PackageProfile/PackageList';
import PackageHeader from '../../../components/PackageProfile/PackageProfileHeader';
import StyledNotif from '../../../components/Notification/StyledNotif';
import PackageSubscription from '../../../components/PackageProfile/PackageSubscription';
import {
  submitVendorPackageSubscriptionData, getVendorPackageDataByMemberId, addVendorPackageSubscriptionData, closeAction, closeNotifAction, packageFreeze
} from '../../../actions/vendorPackageSubscriptionActions';
import { getPackageData } from '../../../actions/vendorPackageActions';

class PackageProfile extends React.Component {
  state = {
    mobileOpen: false,
  };

  componentDidMount() {
    const { fetchVendorPackageData, fetchVendorPackageSubscriptionDataByMemberId, fetchPaymentMethodData, memberData
    } = this.props;
    fetchVendorPackageData();
    fetchVendorPackageSubscriptionDataByMemberId(memberData._id);
    fetchPaymentMethodData();
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const {
      classes,
      currentPage,
      openFrm,
      search, keyword, toggleStar,
      memberData,
      subscribedPackageData,
      availablePackageData,
      paymentMethodData,
      add,
      close,
      submitData,
      messageNotif,
      isFormReset,
      notifType,
      openNoti,
      closeNotif,
      packageFreeze
    } = this.props;
    const title = brand.name + ' - Email';
    const description = brand.desc;
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
          <PackageHeader search={search} handleDrawerToggle={this.handleDrawerToggle} />
          <PackageList
            filterPage={currentPage}
            subscribedPackageData={subscribedPackageData}
            keyword={keyword}
            packageFreeze={packageFreeze}
            toggleStar={toggleStar}
          />
          <PackageSubscription
            submitData={submitData}
            availablePackageData={availablePackageData}
            subscribedPackageData={subscribedPackageData}
            paymentMethodData={paymentMethodData}
            inputChange={this.handleChange}
            isFormReset={isFormReset}
            memberData={memberData}
            add={add}
            open={openFrm}
            closeForm={close}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const packageSubscriptionReducer = state.get('vendorPackageSubscription');
  return ({
    force: state,
    availablePackageData: state.get('packageInfo').packageList,
    paymentMethodData: state.get('paymentMethod').paymentMethodList,
    openFrm: state.get('vendorPackageSubscription').openFrm,
    subscribedPackageData: packageSubscriptionReducer.vendorPackageSubscriptionList,
    messageNotif: packageSubscriptionReducer.notifMsg,
    notifType: packageSubscriptionReducer.notifType,
    openNoti: packageSubscriptionReducer.openNoti,
    isFormReset: packageSubscriptionReducer.isFormReset

  });
}

const constDispatchToProps = dispatch => ({
  search: bindActionCreators(searchAction, dispatch),
  toggleStar: bindActionCreators(toggleStaredAction, dispatch),
  closeNotif: () => dispatch(closeNotifAction),
  fetchPaymentMethodData: () => dispatch(getPaymentMethodData()),
  fetchVendorPackageData: () => dispatch(getPackageData()),
  fetchVendorPackageSubscriptionDataByMemberId: (memberId) => dispatch(getVendorPackageDataByMemberId(memberId)),
  add: () => dispatch(addVendorPackageSubscriptionData()),
  close: () => dispatch(closeAction()),
  closeNotif: () => dispatch(closeNotifAction()),
  packageFreeze: (data) => dispatch(packageFreeze(data)),
  submitData: (data) => dispatch(submitVendorPackageSubscriptionData(data))
});

const PackageProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(PackageProfile);

export default withStyles(styles)(PackageProfileMapped);
