/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getMasterPackageData,
  getSubscriptionActiveData,
  submitSubscriptionData,
  addSubscriptionData,
  closeAction,
  showDetailAction,
  editSubscriptionData,
  searchSubscriptionData,
  updateSubscriptionData,
  deleteSubscriptionData,
  setDetailField,
  loadingAction,
  hideDetailAction
} from 'dan-actions/SubscriptionActions';
import { Notification } from 'dan-components';
import styles from 'dan-components/Contact/contact-jss';
import SubscriptionDataList from '../../../components/Subscription/SubscriptionDataList';
import SubscriptionDetail from '../../../components/Subscription/SubscriptionDetail';
import AddSubscription from '../../../components/Subscription/AddSubscription';

class Subscription extends React.Component {
  componentDidMount() {
    const { fetchData, fetchActiveSubscription } = this.props;
    fetchData();
    fetchActiveSubscription();
  }

  submitSubscriptionData = (data, avatar) => {
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
      masterPackageData,
      activePackage,
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
      deleteSubscriptionData,
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
          <SubscriptionDataList
            addFn
            total={activePackage && activePackage.length}
            addSubscriptionData={add}
            clippedRight
            itemSelected={itemSelected}
            activePackage={activePackage}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            is_active={is_active}
            keyword={keyword}
          />
          <SubscriptionDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            activePackage={activePackage}
            deleteSubscriptionData={deleteSubscriptionData}
            itemSelected={itemSelected}
            edit={edit}
            isActive={is_active}
            remove={remove}
            favorite={favorite}
          />
        </div>
        <AddSubscription
          addContact={add}
          openForm={open}
          masterPackageData={masterPackageData}
          closeForm={close}
          submit={this.submitSubscriptionData}
          avatarInit={avatarInit}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const subscriptionReducer = state.get('subscription');
  return ({

    // force: state, // force state from reducer
    avatarInit: subscriptionReducer.avatarInit,
    masterPackageData: subscriptionReducer.masterPackageList,
    activePackage: subscriptionReducer.activePackage,
    itemSelected: subscriptionReducer.selectedIndex,
    keyword: subscriptionReducer.keywordValue,
    open: subscriptionReducer.openFrm,
    showMobileDetail: subscriptionReducer.showMobileDetail,
    messageNotif: subscriptionReducer.notifMsg,
    formValue: subscriptionReducer.formValues,
    is_active: subscriptionReducer.isActive,
    isLoading: subscriptionReducer.isLoading
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitSubscriptionData(data)),
  updateData: (data) => dispatch(updateSubscriptionData(data)),
  fetchData: () => dispatch(getMasterPackageData()),
  fetchActiveSubscription: () => dispatch(getSubscriptionActiveData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editSubscriptionData(data)),
  add: () => dispatch(addSubscriptionData()),
  close: () => dispatch(closeAction()),
  deleteSubscriptionData: (data) => dispatch(deleteSubscriptionData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchSubscriptionData(data)),
  loading: () => dispatch(loadingAction())
  // closeNotif: () => dispatch(closeNotifAction),
});

const SubscriptionMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Subscription);

export default withStyles(styles)(SubscriptionMapped);
