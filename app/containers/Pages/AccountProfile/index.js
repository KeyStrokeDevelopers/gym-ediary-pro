/* eslint-disable */
import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  Notification
} from 'dan-components';
import {
  getAccountData,
  submitAccountData,
  addAccountData,
  closeAction,
  deleteAccountData,
  loadingAction,
} from 'dan-actions/accountActions';
import { getPaymentMethodData } from 'dan-actions/paymentMethodActions';
import styles from 'dan-components/Email/email-jss';
import AccountList from '../../../components/AccountProfile/AccountList';
import Account from '../../../components/AccountProfile/Account';
import PrintDetail from './printDetail'

class AccountProfile extends React.Component {
  state = {
    mobileOpen: false,
    openPrint: false,
    printData: null
  };

  componentDidMount() {
    const { fetchAccountData, fetchPaymentMethodData, memberData } = this.props;
    fetchAccountData(memberData._id),
      fetchPaymentMethodData();
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  submitAccountData = (data, avatar) => {
    const {
      submitData, formValue, updateData, loading, memberData
    } = this.props;
    if (Object.keys(formValue).length >= 1) {
      updateData(data);
    } else {
      loading();
      submitData(data);
    }
  }

  handlePrint = (data) => {
    this.setState({ printData: data, openPrint: true });
  }

  handleClose = () => {
    this.setState({ openPrint: false });
  }


  render() {
    const {
      classes,
      currentPage,
      open, keyword, remove,
      moveTo, toggleStar,
      closeNotif, messageNotif,
      accountData,
      deleteAccount,
      memberData,
      add, close,
      paymentMethodData
    } = this.props;
    const { openPrint, printData } = this.state;
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
          <PrintDetail
            open={openPrint}
            close={this.handleClose}
            printData={printData}
            memberData={memberData}
          />
          <AccountList
            filterPage={currentPage}
            accountData={accountData}
            memberData={memberData}
            deleteAccount={deleteAccount}
            keyword={keyword}
            paymentMethodData={paymentMethodData}
            handlePrint={this.handlePrint}
            moveTo={moveTo}
            remove={remove}
            toggleStar={toggleStar}
          />
          <Account
            submitData={this.submitAccountData}
            memberData={memberData}
            paymentMethodData={paymentMethodData}
            open={open}
            add={add}
            closeForm={close}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const accountReducer = state.get('account');
  const memberReducer = state.get('addMember');
  const paymentMethodReducer = state.get('paymentMethod');
  return ({
    force: state, // force state from reducer
    accountData: accountReducer.accountList,
    itemSelected: accountReducer.selectedIndex,
    keyword: accountReducer.keywordValue,
    open: accountReducer.openFrm,
    showMobileDetail: accountReducer.showMobileDetail,
    messageNotif: accountReducer.notifMsg,
    formValue: accountReducer.formValues,
    occupationData: accountReducer.occupation,
    is_active: accountReducer.isActive,
    isLoading: accountReducer.isLoading,
    showDetails: accountReducer.showDetails,
    filter_value: accountReducer.filterValue,
    paymentMethodData: paymentMethodReducer.paymentMethodList,
  });
};

const constDispatchToProps = dispatch => ({
  loading: () => dispatch(loadingAction()),
  add: () => dispatch(addAccountData()),
  close: () => dispatch(closeAction()),
  fetchAccountData: (memberId) => dispatch(getAccountData(memberId)),
  submitData: (data) => dispatch(submitAccountData(data)),
  deleteAccount: (dataId) => dispatch(deleteAccountData(dataId)),
  fetchPaymentMethodData: () => dispatch(getPaymentMethodData()),
});

const AccountProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(AccountProfile);

export default withStyles(styles)(AccountProfileMapped);
