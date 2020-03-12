/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getExpenseIncomeData,
  submitExpenseIncomeData,
  addExpenseIncomeData,
  closeAction,
  showDetailAction,
  editExpenseIncomeData,
  searchExpenseIncomeData,
  updateExpenseIncomeData,
  deleteExpenseIncomeData,
  setDetailField,
  loadingAction,
  hideDetailAction,
  closeNotifAction
} from 'dan-actions/ExpenseIncomeActions';
import { getCategoryData } from 'dan-actions/CategoryActions';
import { getPaymentMethodData } from 'dan-actions/paymentMethodActions';
import styles from 'dan-components/Contact/contact-jss';
import StyledNotif from '../../../components/Notification/StyledNotif';
import AddExpenseIncome from '../../../components/ExpenseIncome/AddExpenseIncome';
import ExpenseIncomeDataList from '../../../components/ExpenseIncome/ExpenseIncomeDataList';
import ExpenseIncomeDetail from '../../../components/ExpenseIncome/ExpenseIncomeDetail';

class ExpenseIncome extends React.Component {
  componentDidMount() {
    const { fetchData, fetchCategoryData, fetchPaymentMethodData } = this.props;
    fetchData();
    fetchCategoryData();
    fetchPaymentMethodData();
  }

  submitExpenseIncomeData = (data, avatar) => {
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
      expenseIncomeData,
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
      paymentMethodData,
      categoryData,
      keyword,
      search,
      messageNotif,
      notifType,
      openNoti,
      closeNotif,
      deleteExpenseIncomeData,
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
          <ExpenseIncomeDataList
            addFn
            total={expenseIncomeData && expenseIncomeData.length}
            addExpenseIncomeData={add}
            clippedRight
            itemSelected={itemSelected}
            expenseIncomeDataList={expenseIncomeData}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            is_active={is_active}
            keyword={keyword}
          />
          <ExpenseIncomeDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            expenseIncomeData={expenseIncomeData}
            deleteExpenseIncomeData={deleteExpenseIncomeData}
            itemSelected={itemSelected}
            edit={edit}
            is_active={is_active}
            remove={remove}
            favorite={favorite}
          />
        </div>
        <AddExpenseIncome
          addExpenseIncome={add}
          openForm={open}
          closeForm={close}
          packageData={packageData}
          purposeData={purposeData}
          paymentMethodData={paymentMethodData}
          categoryData={categoryData}
          type="expenseIncome"
          edit={(Object.keys(formValue).length >= 1)}
          submit={this.submitExpenseIncomeData}
          avatarInit={avatarInit}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const expenseIncomeReducer = state.get('expenseIncome');
  const paymentMethodReducer = state.get('paymentMethod');
  const categoryReducer = state.get('category');
  return ({

    // force: state, // force state from reducer
    avatarInit: expenseIncomeReducer.avatarInit,
    expenseIncomeData: expenseIncomeReducer.expenseIncomeList,
    itemSelected: expenseIncomeReducer.selectedIndex,
    keyword: expenseIncomeReducer.keywordValue,
    open: expenseIncomeReducer.openFrm,
    showMobileDetail: expenseIncomeReducer.showMobileDetail,
    messageNotif: expenseIncomeReducer.notifMsg,
    notifType: expenseIncomeReducer.notifType,
    openNoti: expenseIncomeReducer.openNoti,
    formValue: expenseIncomeReducer.formValues,
    is_active: expenseIncomeReducer.isActive,
    isLoading: expenseIncomeReducer.isLoading,
    paymentMethodData: paymentMethodReducer.paymentMethodList,
    categoryData: categoryReducer.categoryList,

  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitExpenseIncomeData(data)),
  updateData: (data) => dispatch(updateExpenseIncomeData(data)),
  fetchData: () => dispatch(getExpenseIncomeData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editExpenseIncomeData(data)),
  add: () => dispatch(addExpenseIncomeData()),
  close: () => dispatch(closeAction()),
  deleteExpenseIncomeData: (data) => dispatch(deleteExpenseIncomeData(data)),
  fetchCategoryData: () => dispatch(getCategoryData()),
  fetchPaymentMethodData: () => dispatch(getPaymentMethodData()),

  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchExpenseIncomeData(data)),
  loading: () => dispatch(loadingAction()),
  closeNotif: () => dispatch(closeNotifAction()),
});

const ExpenseIncomeMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(ExpenseIncome);

export default withStyles(styles)(ExpenseIncomeMapped);
