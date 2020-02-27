/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getPurposeData,
  submitPurposeData,
  addPurposeData,
  closeAction,
  showDetailAction,
  editPurposeData,
  searchPurposeData,
  updatePurposeData,
  deletePurposeData,
  setDetailField,
  loadingAction,
  hideDetailAction
} from 'dan-actions/PurposeActions';
import {
  AddContact,
  Notification
} from 'dan-components';
import styles from 'dan-components/Contact/contact-jss';
import PurposeDataList from '../../../components/Contact/PurposeDataList';
import PurposeDetail from '../../../components/Contact/PurposeDetail';

class Purpose extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  submitPurposeData = (data, avatar) => {
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
      purposeData,
      itemSelected,
      showDetail,
      hideDetail,
      avatarInit,
      open,
      showMobileDetail,
      add,
      formValue,
      edit,
      isActive,
      is_active,
      close,
      remove,
      favorite,
      keyword,
      search,
      initValue,
      closeNotif,
      messageNotif,
      deletePurposeData,
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
          <PurposeDataList
            addFn
            total={purposeData && purposeData.length}
            addPurposeData={add}
            clippedRight
            itemSelected={itemSelected}
            purposeDataList={purposeData}
            is_active={is_active}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            isFollowUp={is_active}
            keyword={keyword}
          />
          <PurposeDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            purposeData={purposeData}
            deletePurposeData={deletePurposeData}
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
          formType="purpose"
          initFormValue={initValue}
          edit={(Object.keys(formValue).length >= 1)}
          closeForm={close}
          submit={this.submitPurposeData}
          avatarInit={avatarInit}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const purposeReducer = state.get('purpose');
  return ({

    // force: state, // force state from reducer
    avatarInit: purposeReducer.avatarInit,
    purposeData: purposeReducer.purposeList,
    accessData: purposeReducer.accessList,
    itemSelected: purposeReducer.selectedIndex,
    keyword: purposeReducer.keywordValue,
    open: purposeReducer.openFrm,
    showMobileDetail: purposeReducer.showMobileDetail,
    messageNotif: purposeReducer.notifMsg,
    formValue: purposeReducer.formValues,
    is_active: purposeReducer.isActive,
    isLoading: purposeReducer.isLoading,
    initValue: purposeReducer.formValues
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitPurposeData(data)),
  updateData: (data) => dispatch(updatePurposeData(data)),
  fetchData: () => dispatch(getPurposeData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editPurposeData(data)),
  add: () => dispatch(addPurposeData()),
  close: () => dispatch(closeAction()),
  deletePurposeData: (data) => dispatch(deletePurposeData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchPurposeData(data)),
  loading: () => dispatch(loadingAction())
  // closeNotif: () => dispatch(closeNotifAction),
});

const PurposeMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Purpose);

export default withStyles(styles)(PurposeMapped);
