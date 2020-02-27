/* eslint-disable */
import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import {
  getMeasurementData, submitMeasurementData, addMeasurementData, closeAction
} from '../../../actions/measurementActions';
import MeasurementList from '../../../components/MeasurementProfile/MeasurementList';
import MeasurementHeader from '../../../components/MeasurementProfile/MeasurementProfileHeader';
import Measurement from '../../../components/MeasurementProfile/Measurement';

// validation functions
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : ''
);

class MeasurementProfile extends React.Component {
  state = {
    mobileOpen: false,
  };

  componentDidMount() {
    const { fetchData, fetchMeasurementData } = this.props;
    fetchMeasurementData();
  }

  handleReply = (mail) => {
    const { compose } = this.props;
    compose();
    this.setState({
      to: mail.get('name'),
      subject: 'Reply: ' + mail.get('subject'),
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
      open,
      search, keyword,
      submitData,
      remove,
      moveTo, toggleStar,
      closeNotif, messageNotif,
      measurementData,
      memberData,
      add, close
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
          <MeasurementHeader search={search} handleDrawerToggle={this.handleDrawerToggle} />
          <MeasurementList
            emailData={emailData}
            openMail={openMail}
            filterPage={currentPage}
            measurementData={measurementData}
            keyword={keyword}
            moveTo={moveTo}
            remove={remove}
            toggleStar={toggleStar}
            reply={this.handleReply}
          />
          <Measurement
            submitData={submitData}
            memberData={memberData}
            open={open}
            add={add}
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
  measurementData: state.get('measurement').measurementList,
  memberData: state.get('addMember').viewProfileData,
  open: state.get('measurement').openFrm,
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

  add: () => dispatch(addMeasurementData()),
  close: () => dispatch(closeAction()),
  fetchMeasurementData: () => dispatch(getMeasurementData()),
  submitData: (data) => dispatch(submitMeasurementData(data)),
});

const MeasurementProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(MeasurementProfile);

export default withStyles(styles)(MeasurementProfileMapped);
