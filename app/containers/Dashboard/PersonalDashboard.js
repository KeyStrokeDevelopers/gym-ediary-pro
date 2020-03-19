/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  SliderWidget,
  DateWidget,
  TaskWidget,
  WeatherWidget,
  ContactWidget,
  TimelineWidget,
  FilesWidget,
} from 'dan-components';
import { initialData } from '../../actions/signIn';
import styles from './dashboard-jss';
import { closeNotifAction } from '../../actions/signIn';
import StyledNotif from '../../components/Notification/StyledNotif';


class PersonalDashboard extends PureComponent {
  componentDidMount() {
    this.props.sign_in();
  }

  render() {
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes,
      messageNotif,
      notifType,
      openNoti,
      closeNotif } = this.props;
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
        {/* 1st Section */}
        <StyledNotif close={closeNotif} openNoti={openNoti} message={messageNotif} notifType={notifType} />
        <Grid container spacing={3} className={classes.root}>

          <Grid item md={6} sm={12} xs={12}>
            <div className={classes.sliderWrap}>
              <SliderWidget />
            </div>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        {/* 2nd Section */}

        {/* 3rd Section */}
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={6} xs={12}>
            <Divider className={classes.divider} />
            <ContactWidget />
            <Divider className={classes.divider} />
            <TaskWidget />
          </Grid>
          <Grid item md={6} xs={12}>
            <Hidden mdDown>
              <Divider className={classes.divider} />
            </Hidden>
            <WeatherWidget />
            <Divider className={classes.divider} />
            <DateWidget />
            <Divider className={classes.divider} />
            <TimelineWidget />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <FilesWidget />
      </div>
    );
  }
}

PersonalDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  const signInReducer = state.get('signIn');
  return ({
    messageNotif: signInReducer.notifMsg,
    notifType: signInReducer.notifType,
    openNoti: signInReducer.openNoti,
  });
}

const constDispatchToProps = dispatch => ({
  sign_in: () => dispatch(initialData()),
  closeNotif: () => dispatch(closeNotifAction())
});

const PersonalDashboardMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(PersonalDashboard);

export default withStyles(styles)(PersonalDashboardMapped);
