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
import styles from 'dan-components/Email/email-jss';
import { getClassData } from '../../../actions/classActions';
import { getPaymentMethodData } from '../../../actions/paymentMethodActions';
import ClassList from '../../../components/ClassProfile/ClassList';
import ClassProfileHeader from '../../../components/ClassProfile/ClassProfileHeader';
import ClassSubscription from '../../../components/ClassProfile/ClassSubscription';
import {
  submitClassSubscriptionData, addClassSubscriptionData, closeAction, getClassDataByMemberId
} from '../../../actions/classSubscriptionActions';

// validation functions
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : ''
);

class ClassProfile extends React.Component {
  state = {
    to: '',
    subject: '',
    validMail: '',
    mobileOpen: false,
  };

  componentDidMount() {
    const {
      fetchData, fetchClassData, fetchPaymentMethodData, fetchClassSubscriptionDataByMemberId, memberData
    } = this.props;
    fetchData(data);
    fetchClassData();
    fetchPaymentMethodData(),
      fetchClassSubscriptionDataByMemberId(memberData._id);
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
      search, keyword, remove,
      moveTo, toggleStar,
      closeNotif, messageNotif,
      memberData,
      availableClassData,
      subscribedClassData,
      paymentMethodData,
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
        <Notification close={() => closeNotif()} message={messageNotif} />
        <div className={classes.root}>
          <ClassProfileHeader search={search} handleDrawerToggle={this.handleDrawerToggle} />

          <ClassList
            emailData={emailData}
            openMail={openMail}
            filterPage={currentPage}
            subscribedClassData={subscribedClassData}
            keyword={keyword}
            moveTo={moveTo}
            remove={remove}
            toggleStar={toggleStar}
            reply={this.handleReply}
          />
          <ClassSubscription
            submitData={submitData}
            availableClassData={availableClassData}
            paymentMethodData={paymentMethodData}
            memberData={memberData}
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
const mapStateToProps = state => ({
  force: state, // force state from reducer
  keyword: state.getIn([reducer, 'keywordValue']),
  initValues: state.getIn([reducer, 'formValues']),
  emailData: state.getIn([reducer, 'inbox']),
  currentPage: state.getIn([reducer, 'currentPage']),
  openFrm: state.getIn([reducer, 'openFrm']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
  memberData: state.get('addMember').viewProfileData,
  availableClassData: state.get('classInfo').classList,
  paymentMethodData: state.get('paymentMethod').paymentMethodList,
  openFrm: state.get('classSubscription').openFrm,
  subscribedClassData: state.get('classSubscription').classSubscriptionList,
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
  fetchClassData: () => dispatch(getClassData()),
  fetchPaymentMethodData: () => dispatch(getPaymentMethodData()),
  add: () => dispatch(addClassSubscriptionData()),
  close: () => dispatch(closeAction()),
  submitData: (data) => dispatch(submitClassSubscriptionData(data)),
  fetchClassSubscriptionDataByMemberId: (memberId) => dispatch(getClassDataByMemberId(memberId)),
});

const ClassProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(ClassProfile);

export default withStyles(styles)(ClassProfileMapped);
