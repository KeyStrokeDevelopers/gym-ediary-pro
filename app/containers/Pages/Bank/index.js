/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getBankData,
  submitBankData,
  addBankData,
  closeAction,
  showDetailAction,
  editBankData,
  searchBankData,
  updateBankData,
  deleteBankData,
  setDetailField,
  loadingAction,
  hideDetailAction
} from 'dan-actions/BankActions';
import {
  AddContact,
  Notification
} from 'dan-components';
import styles from 'dan-components/Contact/contact-jss';
import BankDataList from '../../../components/Contact/BankDataList';
import BankDetail from '../../../components/Contact/BankDetail';

class Bank extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  submitBankData = (data, avatar) => {
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
      bankData,
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
      closeNotif,
      messageNotif,
      deleteBankData,
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
          <BankDataList
            addFn
            total={bankData && bankData.length}
            addBankData={add}
            clippedRight
            itemSelected={itemSelected}
            bankDataList={bankData}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            is_active={is_active}
            keyword={keyword}
          />
          <BankDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            bankData={bankData}
            deleteBankData={deleteBankData}
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
          edit={(Object.keys(formValue).length >= 1)}
          formType="bank"
          closeForm={close}
          submit={this.submitBankData}
          avatarInit={avatarInit}
          isLoading={isLoading}
        />
      </div>
    );
  }
}



const mapStateToProps = state => {
  const bankReducer = state.get('bank');
  return ({

    // force: state, // force state from reducer
    avatarInit: bankReducer.avatarInit,
    bankData: bankReducer.bankList,
    itemSelected: bankReducer.selectedIndex,
    keyword: bankReducer.keywordValue,
    open: bankReducer.openFrm,
    showMobileDetail: bankReducer.showMobileDetail,
    messageNotif: bankReducer.notifMsg,
    formValue: bankReducer.formValues,
    is_active: bankReducer.isActive,
    isLoading: bankReducer.isLoading
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitBankData(data)),
  updateData: (data) => dispatch(updateBankData(data)),
  fetchData: () => dispatch(getBankData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editBankData(data)),
  add: () => dispatch(addBankData()),
  close: () => dispatch(closeAction()),
  deleteBankData: (data) => dispatch(deleteBankData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchBankData(data)),
  loading: () => dispatch(loadingAction())
  // closeNotif: () => dispatch(closeNotifAction),
});

const BankMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Bank);

export default withStyles(styles)(BankMapped);
