/* eslint-disable */
import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import data from 'dan-api/apps/emailData';
import {
  Notification
} from 'dan-components';
import {
  fetchMailAction,
  openMailAction,
  filterAction,
  composeAction,
  discardAction,
  searchAction,
  sendAction,
  moveAction,
  deleteAction,
  toggleStaredAction,
  closeNotifAction
} from 'dan-actions/EmailActions';
import { getPaymentMethodData } from 'dan-actions/paymentMethodActions';
import styles from 'dan-components/Email/email-jss';
import PackageList from '../../../components/PackageProfile/PackageList';
import PackageHeader from '../../../components/PackageProfile/PackageProfileHeader';
import PackageSubscription from '../../../components/PackageProfile/PackageSubscription';
import {
  submitVendorPackageSubscriptionData,
  getVendorPackageDataByMemberId, addVendorPackageSubscriptionData, closeAction
} from '../../../actions/vendorPackageSubscriptionActions';
import { getPackageData } from '../../../actions/vendorPackageActions';

// validation functions
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : ''
);

class PackageProfile extends React.Component {
  state = {
    to: '',
    subject: '',
    validMail: '',
    mobileOpen: false,
  };

  componentDidMount() {
    const {
      fetchData, fetchVendorPackageData, fetchVendorPackageSubscriptionDataByMemberId, fetchPaymentMethodData, memberData
    } = this.props;
    fetchData(data);
    fetchVendorPackageData();
    fetchVendorPackageSubscriptionDataByMemberId(memberData._id);
    fetchPaymentMethodData();
  }

  handleChange = (event, name) => {
    if (name === 'to') {
      this.setState({ validMail: email(event.target.value) });
    }
    this.setState({
      [name]: event.target.value,
    });
  };

  handleReply = (mail) => {
    const { compose } = this.props;
    compose();
    this.setState({
      to: mail.get('name'),
      subject: 'Reply: ' + mail.get('subject'),
    });
  }

  handleCompose = () => {
    const { compose } = this.props;
    compose();
    this.setState({
      to: '  ',
      subject: '  ',
    });
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const {
      classes,
      emailData, openMail,
      currentPage,
      openFrm,
      search, keyword,
      remove,
      moveTo, toggleStar,
      closeNotif, messageNotif,
      memberData,
      subscribedPackageData,
      availablePackageData,
      paymentMethodData,
      add,
      close,
      submitData,
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
        <Notification close={() => closeNotif()} message={messageNotif} />
        <div className={classes.root}>
          <PackageHeader search={search} handleDrawerToggle={this.handleDrawerToggle} />
          <PackageList
            emailData={emailData}
            openMail={openMail}
            filterPage={currentPage}
            subscribedPackageData={subscribedPackageData}
            keyword={keyword}
            moveTo={moveTo}
            remove={remove}
            toggleStar={toggleStar}
            reply={this.handleReply}
          />
          <PackageSubscription
            submitData={submitData}
            availablePackageData={availablePackageData}
            subscribedPackageData={subscribedPackageData}
            paymentMethodData={paymentMethodData}
            inputChange={this.handleChange}
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

const mapStateToProps = state => ({
  force: state,
  availablePackageData: state.get('packageInfo').packageList,
  paymentMethodData: state.get('paymentMethod').paymentMethodList,
  openFrm: state.get('vendorPackageSubscription').openFrm,
  subscribedPackageData: state.get('vendorPackageSubscription').vendorPackageSubscriptionList,

});

const constDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchMailAction, dispatch),
  openMail: bindActionCreators(openMailAction, dispatch),
  goto: bindActionCreators(filterAction, dispatch),
  search: bindActionCreators(searchAction, dispatch),
  moveTo: bindActionCreators(moveAction, dispatch),
  remove: bindActionCreators(deleteAction, dispatch),
  toggleStar: bindActionCreators(toggleStaredAction, dispatch),
  compose: () => dispatch(composeAction),
  discard: () => dispatch(discardAction),
  sendEmail: bindActionCreators(sendAction, dispatch),
  closeNotif: () => dispatch(closeNotifAction),
  fetchPaymentMethodData: () => dispatch(getPaymentMethodData()),
  fetchVendorPackageData: () => dispatch(getPackageData()),
  fetchVendorPackageSubscriptionDataByMemberId: (memberId) => dispatch(getVendorPackageDataByMemberId(memberId)),
  add: () => dispatch(addVendorPackageSubscriptionData()),
  close: () => dispatch(closeAction()),
  submitData: (data) => dispatch(submitVendorPackageSubscriptionData(data))
});

const PackageProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(PackageProfile);

export default withStyles(styles)(PackageProfileMapped);
