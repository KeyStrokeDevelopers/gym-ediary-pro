/* eslint-disable */
import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  searchAction,
  toggleStaredAction,
} from 'dan-actions/EmailActions';
import styles from 'dan-components/Email/email-jss';
import { getClassData } from '../../../actions/classActions';
import { getPaymentMethodData } from '../../../actions/paymentMethodActions';
import StyledNotif from '../../../components/Notification/StyledNotif';
import ClassList from '../../../components/ClassProfile/ClassList';
import ClassProfileHeader from '../../../components/ClassProfile/ClassProfileHeader';
import ClassSubscription from '../../../components/ClassProfile/ClassSubscription';
import {
  submitClassSubscriptionData, addClassSubscriptionData, closeAction, getClassDataByMemberId, closeNotifAction
} from '../../../actions/classSubscriptionActions';


class ClassProfile extends React.Component {
  state = {
    mobileOpen: false,
  };

  componentDidMount() {
    const { fetchClassData, fetchPaymentMethodData, fetchClassSubscriptionDataByMemberId, memberData
    } = this.props;
    fetchClassData();
    fetchPaymentMethodData(),
      fetchClassSubscriptionDataByMemberId(memberData._id);
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const {
      classes,
      currentPage,
      openFrm,
      search, keyword,
      toggleStar,
      messageNotif,
      notifType,
      openNoti,
      closeNotif,
      memberData,
      availableClassData,
      subscribedClassData,
      paymentMethodData,
      isFormReset,
      close,
      add,
      submitData
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
          <ClassProfileHeader search={search} handleDrawerToggle={this.handleDrawerToggle} />
          <ClassList
            filterPage={currentPage}
            subscribedClassData={subscribedClassData}
            keyword={keyword}
            toggleStar={toggleStar}
          />
          <ClassSubscription
            submitData={submitData}
            availableClassData={availableClassData}
            paymentMethodData={paymentMethodData}
            memberData={memberData}
            isFormReset={isFormReset}
            inputChange={this.handleChange}
            add={add}
            open={openFrm}
            closeForm={close}
          />
        </div>
      </div>
    );
  }
}

const reducer = 'email';
const mapStateToProps = state => {
  const classSubscriptionReducer = state.get('classSubscription');
  return ({
    force: state, // force state from reducer
    keyword: state.getIn([reducer, 'keywordValue']),
    initValues: state.getIn([reducer, 'formValues']),
    currentPage: state.getIn([reducer, 'currentPage']),
    openFrm: state.getIn([reducer, 'openFrm']),
    availableClassData: state.get('classInfo').classList,
    paymentMethodData: state.get('paymentMethod').paymentMethodList,
    openFrm: classSubscriptionReducer.openFrm,
    subscribedClassData: classSubscriptionReducer.classSubscriptionList,
    messageNotif: classSubscriptionReducer.notifMsg,
    notifType: classSubscriptionReducer.notifType,
    openNoti: classSubscriptionReducer.openNoti,
    isFormReset: classSubscriptionReducer.isFormReset
  });
}

const constDispatchToProps = dispatch => ({
  search: bindActionCreators(searchAction, dispatch),
  toggleStar: bindActionCreators(toggleStaredAction, dispatch),
  closeNotif: () => dispatch(closeNotifAction),
  fetchClassData: () => dispatch(getClassData()),
  fetchPaymentMethodData: () => dispatch(getPaymentMethodData()),
  add: () => dispatch(addClassSubscriptionData()),
  close: () => dispatch(closeAction()),
  closeNotif: () => dispatch(closeNotifAction()),
  submitData: (data) => dispatch(submitClassSubscriptionData(data)),
  fetchClassSubscriptionDataByMemberId: (memberId) => dispatch(getClassDataByMemberId(memberId)),
});

const ClassProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(ClassProfile);

export default withStyles(styles)(ClassProfileMapped);
