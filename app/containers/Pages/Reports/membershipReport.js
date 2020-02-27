/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { AdvTable } from 'dan-components';
import styles from 'dan-components/Email/email-jss';
import FormControl from '@material-ui/core/FormControl';
import { reduxForm, Field } from 'redux-form/immutable';
import { getClassData } from 'dan-actions/ClassActions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { getPackageData } from 'dan-actions/vendorPackageActions';
import { SelectRedux } from '../../../components/Forms/ReduxFormMUI';
import { getReportsData, handleDnd, handleCall } from '../../../actions/reportActions';

class MembershipReport extends Component {
  state = {
    fromDate: null,
    toDate: null,
    order: 'asc',
    orderBy: 'date',
    selected: [],
    columnData: [
      {
        id: 'form',
        disablePadding: true,
        label: 'Form'
      }, {
        id: 'member',
        disablePadding: false,
        label: 'Member'
      }, {
        id: 'contect',
        numeric: true,
        disablePadding: false,
        label: 'Contact'
      }, {
        id: 'age',
        numeric: true,
        disablePadding: false,
        label: 'Age'
      }, {
        id: 'balance',
        numeric: true,
        disablePadding: false,
        label: 'Balance'
      },
      {
        id: 'bloodG',
        disablePadding: false,
        label: 'Blood G'
      },
      {
        id: 'fingercode',
        // numeric: true,
        disablePadding: false,
        label: 'Finger Code'
      },
    ],
    page: 0,
    rowsPerPage: 5,
    defaultPerPage: 5,
    filterText: '',
    title: 'Reports',
    reportType: 'Active',
    subscriptionType: 'All',
    packageClass: 'All',
    expiringIn: 5,
    updated: false
  };

  componentDidMount() {
    this.props.initialize({
      reportType: 'Active', subscriptionType: 'All', packageClass: 'All', expiringIn: '5'
    });
    const {
      fetchPackageData, fetchClassData, fetchReportsData, updated
    } = this.props;
    const {
      reportType, subscriptionType, packageClass, expiringIn
    } = this.state;
    const dataForFetchReport = {
      reportType, subscriptionType, packageClass, expiringIn
    };
    fetchPackageData();
    fetchClassData();
    fetchReportsData(dataForFetchReport);
    this.setState({ updated });
  }

  componentDidUpdate() {
    const { fetchReportsData, updated } = this.props;
    const {
      reportType, subscriptionType, packageClass, expiringIn
    } = this.state;
    const dataForFetchReport = {
      reportType, subscriptionType, packageClass, expiringIn
    };
    if (updated !== this.state.updated) {
      this.setState({ updated });
      fetchReportsData(dataForFetchReport);
    }
  }

  handleReportType = (e, reportType) => {
    this.setState({ reportType });
    const { fetchReportsData } = this.props;
    const { subscriptionType, packageClass, expiringIn } = this.state;
    const dataForFetchReport = {
      reportType, subscriptionType, packageClass, expiringIn
    };
    fetchReportsData(dataForFetchReport);
  }

  handleSubscriptionType = (e, subscriptionType) => {
    this.setState({ subscriptionType });
    const { fetchReportsData } = this.props;
    const { reportType, packageClass, expiringIn } = this.state;
    const dataForFetchReport = {
      reportType, subscriptionType, packageClass, expiringIn
    };
    fetchReportsData(dataForFetchReport);
  }

  handlePackageClassData = (e, packageClass) => {
    this.setState({ packageClass });
    const { fetchReportsData } = this.props;
    const { reportType, subscriptionType, expiringIn } = this.state;
    const dataForFetchReport = {
      reportType, subscriptionType, packageClass, expiringIn
    };
    fetchReportsData(dataForFetchReport);
  }

  handleExpiringData = (e, expiringIn) => {
    this.setState({ expiringIn });
    const { fetchReportsData } = this.props;
    const { reportType, subscriptionType, packageClass } = this.state;
    const dataForFetchReport = {
      reportType, subscriptionType, packageClass, expiringIn
    };
    fetchReportsData(dataForFetchReport);
  }

  handleToggleChange = (data) => {
    const { handleDnd } = this.props;
    handleDnd(data.memberId);
  }

  handleCall = (data) => {
    const { handleCall } = this.props;
    handleCall(data.memberId);
  }

  render() {
    const {
      classes, classData, packageData, reportData
    } = this.props;
    const description = brand.desc;
    const {
      order,
      orderBy,
      selected,
      page,
      rowsPerPage,
      defaultPerPage,
      filterText,
      columnData,
      subscriptionType,
      title,
      reportType,
      isToggleOn
    } = this.state;
    const filterColumnData = (reportType === 'Expiring' || reportType === 'Expired')
      ? [{
        id: 'dnd',
        disablePadding: true,
        label: 'DND'
      }, {
        id: 'callDate',
        disablePadding: true,
        label: 'Call Date'
      },
      ...columnData] : columnData;
    const packageClassData = [];
    if (subscriptionType === 'Package') {
      packageData.map((item) => {
        packageClassData.push({ value: item._id, label: item.packName });
      });
    }
    if (subscriptionType === 'Class') {
      classData.map((item) => {
        packageClassData.push({ value: item._id, label: item.className });
      });
    }

    return (
      <div className={classes.root} style={{ display: 'block' }}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div style={{ marginLeft: '10px', marginTop: '10px', width: '100%' }}>
          SELECT
          </div>
        <div style={{ display: 'flex', marginTop: '-8px', width: '100%' }}>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Report Type</InputLabel>
              <Field
                name="reportType"
                component={SelectRedux}
                required
                placeholder="Report Type"
                onChange={this.handleReportType}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Expiring">Expiring</MenuItem>
                <MenuItem value="Expired">Expired</MenuItem>
                <MenuItem value="Non-Active">Non-Active</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Subscription Type</InputLabel>
              <Field
                name="subscriptionType"
                component={SelectRedux}
                required
                placeholder="Subscription Type"
                onChange={this.handleSubscriptionType}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Package">Package</MenuItem>
                <MenuItem value="Class">Class</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Package/Class</InputLabel>
              <Field
                name="packageClass"
                component={SelectRedux}
                required
                placeholder="Package Class"
                onChange={this.handlePackageClassData}
              >
                <MenuItem value="All">All</MenuItem>
                {packageClassData && packageClassData.map((item, index) => <MenuItem value={item.value} key={index + Math.random()}>{item.label}</MenuItem>)}
              </Field>
            </FormControl>
          </div>
          {(reportType === 'Expiring')
            && (
              <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">Expiring In</InputLabel>
                  <Field
                    name="expiringIn"
                    component={SelectRedux}
                    required
                    placeholder="Expiring In"
                    onChange={this.handleExpiringData}
                  >
                    <MenuItem value={1}>Day 1</MenuItem>
                    <MenuItem value={2}>Day 2</MenuItem>
                    <MenuItem value={3}>Day 3</MenuItem>
                    <MenuItem value={4}>Day 4</MenuItem>
                    <MenuItem value={5}>Day 5</MenuItem>
                    <MenuItem value={6}>Day 6</MenuItem>
                    <MenuItem value={7}>Day 7</MenuItem>
                    <MenuItem value={8}>Day 8</MenuItem>
                    <MenuItem value={9}>Day 9</MenuItem>
                    <MenuItem value={10}>Day 10</MenuItem>
                  </Field>
                </FormControl>
              </div>
            )
          }
        </div>
        <AdvTable
          order={order}
          orderBy={orderBy}
          selected={selected}
          data={reportData}
          handleCall={this.handleCall}
          isToggleOn={isToggleOn}
          toggleChange={this.handleToggleChange}
          page={page}
          title={title}
          rowsPerPage={rowsPerPage}
          defaultPerPage={defaultPerPage}
          filterText={filterText}
          columnData={filterColumnData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  classData: state.get('classInfo').classList,
  packageData: state.get('packageInfo').packageList,
  reportData: state.get('reports').reportList,
  updated: state.get('reports').updated
});

const mapDispatchToProps = (dispatch) => ({
  fetchReportsData: (data) => dispatch(getReportsData(data)),
  fetchPackageData: () => dispatch(getClassData()),
  fetchClassData: () => dispatch(getPackageData()),
  handleCall: (memberId) => dispatch(handleCall(memberId)),
  handleDnd: (memberId) => dispatch(handleDnd(memberId))
});

const MembershipReportRedux = reduxForm({
  form: 'reportForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(MembershipReport);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MembershipReportRedux));
