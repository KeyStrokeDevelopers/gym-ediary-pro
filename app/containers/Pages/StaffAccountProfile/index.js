/* eslint-disable */
import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  getAccountData,
  submitSalaryData,
  getSalaryData,
  updateSalaryData,
  addAccountData,
  editAccountData,
  closeAction,
  deleteAccountData,
  loadingAction,
  closeNotifAction
} from 'dan-actions/accountActions';
import { getPaymentMethodData } from 'dan-actions/paymentMethodActions';
import styles from 'dan-components/Email/email-jss';
import AccountList from '../../../components/StaffAccountProfile/AccountList';
import Account from '../../../components/StaffAccountProfile/Account';
import PrintDetail from './printDetail'
import StyledNotif from '../../../components/Notification/StyledNotif';
import moment from 'moment';

class AccountProfile extends React.Component {
  state = {
    mobileOpen: false,
    openPrint: false,
    printData: null,
    fromDate: moment(new Date).format('YYYY-MM-DD'),
    toDate: moment(new Date).format('YYYY-MM-DD')
  };

  componentDidMount() {
    const { fetchAccountData, fetchPaymentMethodData, staffData } = this.props;
    fetchAccountData(staffData._id),
      fetchPaymentMethodData();
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  submitSalaryData = (data, avatar) => {
    const {
      submitData, formValues, updateData, loading
    } = this.props;
    const { fromDate, toDate } = this.state;
    if (Object.keys(formValues).length >= 1) {
      updateData({ data, fromDate, toDate });
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


  handleFromDate = (fromDate) => {
    this.setState({ fromDate })
  }

  handleToDate = (toDate) => {
    this.setState({ toDate })
  }


  render() {
    const {
      classes,
      currentPage,
      open, keyword, remove,
      moveTo, toggleStar,
      messageNotif,
      notifType,
      openNoti,
      closeNotif,
      fetchSalaryData,
      staffData,
      salaryData,
      add, close,
      paymentMethodData,
      formValues,
      editSalary,
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
        <StyledNotif close={() => closeNotif()} openNoti={openNoti} message={messageNotif} notifType={notifType} />
        <div className={classes.root}>
          <PrintDetail
            open={openPrint}
            close={this.handleClose}
            printData={printData}
            staffData={staffData}
          />
          <AccountList
            filterPage={currentPage}
            staffData={staffData}
            salaryData={salaryData}
            keyword={keyword}
            fetchSalaryData={fetchSalaryData}
            setFromDate={this.handleFromDate}
            setToDate={this.handleToDate}
            handlePrint={this.handlePrint}
            editSalary={editSalary}
            moveTo={moveTo}
            remove={remove}
            toggleStar={toggleStar}
          />
          <Account
            submitData={this.submitSalaryData}
            staffData={staffData}
            paymentMethodData={paymentMethodData}
            formValues={formValues}
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
  const paymentMethodReducer = state.get('paymentMethod');
  return ({
    force: state, // force state from reducer
    accountData: accountReducer.accountList,
    salaryData: accountReducer.salaryList,
    itemSelected: accountReducer.selectedIndex,
    keyword: accountReducer.keywordValue,
    formValues: accountReducer.formValues,
    open: accountReducer.openFrm,
    showMobileDetail: accountReducer.showMobileDetail,
    messageNotif: accountReducer.notifMsg,
    notifType: accountReducer.notifType,
    openNoti: accountReducer.openNoti,
    occupationData: accountReducer.occupation,
    is_active: accountReducer.isActive,
    isLoading: accountReducer.isLoading,
    showDetails: accountReducer.showDetails,
    filter_value: accountReducer.filterValue,
    paymentMethodData: paymentMethodReducer.paymentMethodList
  });
};

const constDispatchToProps = dispatch => ({
  loading: () => dispatch(loadingAction()),
  add: () => dispatch(addAccountData()),
  editSalary: (data) => dispatch(editAccountData(data)),
  close: () => dispatch(closeAction()),
  fetchAccountData: (memberId) => dispatch(getAccountData(memberId)),
  submitData: (data) => dispatch(submitSalaryData(data)),
  fetchSalaryData: (data) => dispatch(getSalaryData(data)),
  deleteAccount: (dataId) => dispatch(deleteAccountData(dataId)),
  updateData: (data) => dispatch(updateSalaryData(data)),
  fetchPaymentMethodData: () => dispatch(getPaymentMethodData()),
  closeNotif: () => dispatch(closeNotifAction()),
});

const AccountProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(AccountProfile);

export default withStyles(styles)(AccountProfileMapped);
