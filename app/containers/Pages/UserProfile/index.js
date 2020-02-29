/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import AppBar from '@material-ui/core/AppBar';
import dummy from 'dan-api/dummy/dummyContents';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Favorite from '@material-ui/icons/Favorite';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import data from 'dan-api/apps/timelineData';
import { fetchAction } from 'dan-actions/SocmedActions';
import { Cover, About } from 'dan-components';
import bgCover from 'dan-images/petal_bg.svg';
import styles from 'dan-components/SocialMedia/jss/cover-jss';
import PackageProfile from '../PackageProfile';
import ClassProfile from '../ClassProfile';
import MeasurementProfile from '../MeasurementProfile';
import MediaProfile from '../MediaProfile';
import AccountProfile from '../AccountProfile';
import Attendance from '../AttendanceProfile';
import WorkoutNutritionProfile from '../WorkoutNutritionProfile';

function TabContainer(props) {
  const { children } = props;
  return (
    <div style={{ paddingTop: 8 * 3 }}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


class UserProfile extends React.Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData(data);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const title = brand.name + ' - Profile';
    const description = brand.desc;
    const { dataProps, classes, memberData } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Cover
          coverImg={bgCover}
          avatar={dummy.user.avatar}
          name={dummy.user.name}
          desc="Consectetur adipiscing elit."
        />
        <AppBar position="static" className={classes.profileTab} style={{ zIndex: 1 }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="ABOUT" icon={<AccountCircle />} />
            <Tab label="ACCOUNT" icon={<AccountTreeIcon />} />
            <Tab label="PACKAGE" icon={<SupervisorAccount />} />
            <Tab label="CLASS" icon={<Favorite />} />
            <Tab label="MEASUREMENTS" icon={<PhotoLibrary />} />
            <Tab label="Media" icon={<WallpaperIcon />} />
            <Tab label="WORKOUT/NUTRITION" icon={<FitnessCenterIcon />} />
            <Tab label="ATTENDANCE" icon={<HowToRegIcon />} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><About data={dataProps} memberData={memberData} /></TabContainer>}
        {value === 1 && <TabContainer><AccountProfile memberData={memberData} /></TabContainer>}
        {value === 2 && <TabContainer><PackageProfile memberData={memberData} /></TabContainer>}
        {value === 3 && <TabContainer><ClassProfile memberData={memberData} /></TabContainer>}
        {value === 4 && <TabContainer><MeasurementProfile memberData={memberData} /></TabContainer>}
        {value === 5 && <TabContainer><MediaProfile memberData={memberData} /></TabContainer>}
        {value === 6 && <TabContainer><WorkoutNutritionProfile memberData={memberData} /></TabContainer>}
        {value === 7 && <TabContainer><Attendance memberData={memberData} /></TabContainer>}
      </div>
    );
  }
}

const reducer = 'socmed';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  dataProps: state.getIn([reducer, 'dataTimeline'])
});

const constDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch)
});

const UserProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(UserProfile);

export default withStyles(styles)(UserProfileMapped);
