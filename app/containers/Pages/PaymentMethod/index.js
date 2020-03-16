/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getPaymentMethodData,
  submitPaymentMethodData,
  addPaymentMethodData,
  closeAction,
  showDetailAction,
  editPaymentMethodData,
  searchPaymentMethodData,
  updatePaymentMethodData,
  deletePaymentMethodData,
  activePaymentMethodData,
  setDetailField,
  loadingAction,
  hideDetailAction,
  closeNotifAction
} from 'dan-actions/paymentMethodActions';
import { AddContact } from 'dan-components';
import styles from 'dan-components/Contact/contact-jss';
import PaymentMethodDataList from '../../../components/Contact/PaymentMethodDataList';
import PaymentMethodDetail from '../../../components/Contact/PaymentMethodDetail';
import StyledNotif from '../../../components/Notification/StyledNotif';

class PaymentMethod extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  submitPaymentMethodData = (data, avatar) => {
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
      paymentMethodData,
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
      deletePaymentMethodData,
      activePaymentMethodData,
      isLoading
    } = this.props;
    const isPaymentMethodData = paymentMethodData.length >= 1;
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
          <PaymentMethodDataList
            addFn
            total={paymentMethodData && paymentMethodData.length}
            addPaymentMethodData={add}
            clippedRight
            itemSelected={itemSelected}
            paymentMethodDataList={paymentMethodData}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            is_active={is_active}
            keyword={keyword}
          />
          <PaymentMethodDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            paymentMethodData={paymentMethodData}
            deletePaymentMethodData={deletePaymentMethodData}
            activePaymentMethodData={activePaymentMethodData}
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
          formType="paymentMethod"
          edit={(Object.keys(formValue).length >= 1)}
          closeForm={close}
          submit={this.submitPaymentMethodData}
          avatarInit={avatarInit}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const paymentMethodReducer = state.get('paymentMethod');
  return ({

    // force: state, // force state from reducer
    avatarInit: paymentMethodReducer.avatarInit,
    paymentMethodData: paymentMethodReducer.paymentMethodList,
    itemSelected: paymentMethodReducer.selectedIndex,
    keyword: paymentMethodReducer.keywordValue,
    open: paymentMethodReducer.openFrm,
    showMobileDetail: paymentMethodReducer.showMobileDetail,
    messageNotif: paymentMethodReducer.notifMsg,
    notifType: paymentMethodReducer.notifType,
    openNoti: paymentMethodReducer.openNoti,
    formValue: paymentMethodReducer.formValues,
    is_active: paymentMethodReducer.isActive,
    isLoading: paymentMethodReducer.isLoading
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitPaymentMethodData(data)),
  updateData: (data) => dispatch(updatePaymentMethodData(data)),
  fetchData: () => dispatch(getPaymentMethodData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editPaymentMethodData(data)),
  add: () => dispatch(addPaymentMethodData()),
  close: () => dispatch(closeAction()),
  deletePaymentMethodData: (data) => dispatch(deletePaymentMethodData(data)),
  activePaymentMethodData: (data) => dispatch(activePaymentMethodData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchPaymentMethodData(data)),
  loading: () => dispatch(loadingAction()),
  closeNotif: () => dispatch(closeNotifAction()),
});

const PaymentMethodMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(PaymentMethod);

export default withStyles(styles)(PaymentMethodMapped);
