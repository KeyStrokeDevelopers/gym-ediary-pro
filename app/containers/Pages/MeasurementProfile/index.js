/* eslint-disable */
import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchAction, toggleStaredAction } from 'dan-actions/EmailActions';
import styles from 'dan-components/Email/email-jss';
import {
  getMeasurementData, submitMeasurementData, addMeasurementData, closeAction, closeNotifAction
} from '../../../actions/measurementActions';
import StyledNotif from '../../../components/Notification/StyledNotif';
import MeasurementList from '../../../components/MeasurementProfile/MeasurementList';
import MeasurementHeader from '../../../components/MeasurementProfile/MeasurementProfileHeader';
import Measurement from '../../../components/MeasurementProfile/Measurement';

class MeasurementProfile extends React.Component {
  state = {
    mobileOpen: false,
  };

  componentDidMount() {
    const { fetchMeasurementData } = this.props;
    fetchMeasurementData();
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const {
      classes,
      currentPage,
      open,
      search, keyword,
      submitData, toggleStar,
      measurementData,
      memberData,
      add, close,
      messageNotif,
      notifType,
      openNoti,
      closeNotif,
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
          <MeasurementHeader search={search} handleDrawerToggle={this.handleDrawerToggle} />
          <MeasurementList
            filterPage={currentPage}
            measurementData={measurementData}
            keyword={keyword}
            toggleStar={toggleStar}
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
const mapStateToProps = state => {
  const measurementReducer = state.get('measurement');
  return ({
    force: state, // force state from reducer
    keyword: state.getIn([reducer, 'keywordValue']),
    initValues: state.getIn([reducer, 'formValues']),
    openFrm: state.getIn([reducer, 'openFrm']),
    measurementData: measurementReducer.measurementList,
    open: measurementReducer.openFrm,
    messageNotif: measurementReducer.notifMsg,
    notifType: measurementReducer.notifType,
    openNoti: measurementReducer.openNoti,
  });
}
const constDispatchToProps = dispatch => ({
  search: bindActionCreators(searchAction, dispatch),
  toggleStar: bindActionCreators(toggleStaredAction, dispatch),
  add: () => dispatch(addMeasurementData()),
  close: () => dispatch(closeAction()),
  closeNotif: () => dispatch(closeNotifAction()),
  fetchMeasurementData: () => dispatch(getMeasurementData()),
  submitData: (data) => dispatch(submitMeasurementData(data)),
});

const MeasurementProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(MeasurementProfile);

export default withStyles(styles)(MeasurementProfileMapped);
