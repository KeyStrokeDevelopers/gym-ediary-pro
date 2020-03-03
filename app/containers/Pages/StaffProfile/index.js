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
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import data from 'dan-api/apps/timelineData';
import { fetchAction } from 'dan-actions/SocmedActions';
import { Cover, About } from 'dan-components';
import bgCover from 'dan-images/petal_bg.svg';
import styles from 'dan-components/SocialMedia/jss/cover-jss';
import AccountProfile from '../StaffAccountProfile';
import Attendance from '../StaffAttendanceProfile';

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


class StaffProfile extends React.Component {
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
    const { dataProps, classes, staffData } = this.props;
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
            <Tab label="ATTENDANCE" icon={<HowToRegIcon />} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><About data={dataProps} staffData={staffData} /></TabContainer>}
        {value === 1 && <TabContainer><AccountProfile staffData={staffData} /></TabContainer>}
        {value === 2 && <TabContainer><Attendance staffData={staffData} /></TabContainer>}
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

const StaffProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(StaffProfile);

export default withStyles(styles)(StaffProfileMapped);
