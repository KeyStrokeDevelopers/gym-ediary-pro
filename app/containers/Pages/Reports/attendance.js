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
import moment from 'moment';
import { getReportsData, markAttendance, closeNotifAction } from '../../../actions/reportActions';
import { SelectRedux, DatePickerInput } from '../../../components/Forms/ReduxFormMUI';
import StyledNotif from '../../../components/Notification/StyledNotif';


class Attendance extends Component {
  state = {
    order: 'asc',
    orderBy: 'date',
    selected: [],
    columnData: [
      {
        id: 'attendance',
        disablePadding: true,
        label: 'Mark Attendance'
      }, {
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
    date: moment(new Date()).format('YYYY-MM-DD'),
    filterText: '',
    title: 'Attendance',
    attendanceType: 'forBoth',
    subscriptionType: 'All',
    packageClass: 'All',
    reportType: 'Active',
    updated: false
  };

  componentDidMount() {
    this.props.initialize({ attendanceType: 'forBoth', subscriptionType: 'All', packageClass: 'All' });
    const { fetchPackageData, fetchClassData, fetchReportsData } = this.props;
    const {
      attendanceType, subscriptionType, packageClass, reportType, date
    } = this.state;
    const dataForFetchReport = {
      attendanceType, reportType, subscriptionType, packageClass, date
    };
    fetchPackageData();
    fetchClassData();
    fetchReportsData(dataForFetchReport);
  }

  componentDidUpdate() {
    const { updated } = this.props;
    if (updated !== this.state.updated) {
      const { fetchReportsData } = this.props;
      const {
        attendanceType, subscriptionType, packageClass, reportType, date
      } = this.state;
      const dataForFetchReport = {
        attendanceType, reportType, subscriptionType, packageClass, date
      };
      fetchReportsData(dataForFetchReport);
      this.setState({ updated });
    }
  }

  handleAttendanceType = (e, attendanceType) => {
    this.setState({ attendanceType });
    const { fetchReportsData } = this.props;
    const {
      subscriptionType, packageClass, reportType, date
    } = this.state;
    const dataForFetchReport = {
      attendanceType, reportType, subscriptionType, packageClass, date
    };
    fetchReportsData(dataForFetchReport);
  }

  handleSubscriptionType = (e, subscriptionType) => {
    this.setState({ subscriptionType });
    const { fetchReportsData } = this.props;
    const {
      attendanceType, packageClass, reportType, date
    } = this.state;
    const dataForFetchReport = {
      attendanceType, reportType, subscriptionType, packageClass, date
    };
    fetchReportsData(dataForFetchReport);
  }

  handlePackageClassData = (e, packageClass) => {
    this.setState({ packageClass });
    const { fetchReportsData } = this.props;
    const {
      attendanceType, subscriptionType, reportType, date
    } = this.state;
    const dataForFetchReport = {
      attendanceType, reportType, subscriptionType, packageClass, date
    };
    fetchReportsData(dataForFetchReport);
  }

  handleDate = (e, date) => {
    const { fetchReportsData } = this.props;
    const { attendanceType, packageClass, reportType, subscriptionType } = this.state;
    const dataForFetchReport = {
      attendanceType, reportType, subscriptionType, packageClass, date
    };
    fetchReportsData(dataForFetchReport);
    this.setState({ date, isRadioOn: false });
  }

  handleAttendance = (data) => {
    const {
      date, attendanceType, subscriptionType, packageClass
    } = this.state;
    const { markAttendance } = this.props;
    const attendance = {
      date, attendance: data.attendance, member: data.memberId, attendanceType, subscriptionType, packageClass
    };
    markAttendance(attendance);
  }

  render() {
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
      date
    } = this.state;
    const { classes, classData, packageData, reportData, messageNotif, notifType, openNoti, closeNotif } = this.props;
    let distinctData = [];
    reportData.map((item) => {
      let duplicate = distinctData.find(data => data.memberId === item.memberId)
      if (!duplicate) {
        distinctData.push(item);
      }
    })
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
        <StyledNotif close={() => closeNotif()} openNoti={openNoti} message={messageNotif} notifType={notifType} />
        <div style={{ marginLeft: '10px', marginTop: '10px', width: '100%' }}>
          SELECT ATTENDANCE DATE
          </div>
        <div style={{ display: 'flex', marginTop: '-8px', width: '100%' }}>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <Field
              name="date"
              label="Date"
              component={DatePickerInput}
              disableFuture
              onChange={this.handleDate}
              dateValue={date}
            />
          </div>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Marking Format</InputLabel>
              <Field
                name="attendanceType"
                component={SelectRedux}
                required
                placeholder="Attendance Type"
                onChange={this.handleAttendanceType}
              >
                <MenuItem value="forBoth">Mark For Both</MenuItem>
                <MenuItem value="forSelected">Mark For Selected</MenuItem>
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
        </div>
        <AdvTable
          order={order}
          orderBy={orderBy}
          selected={selected}
          data={distinctData}
          page={page}
          title={title}
          attendance={this.handleAttendance}
          rowsPerPage={rowsPerPage}
          defaultPerPage={defaultPerPage}
          filterText={filterText}
          columnData={columnData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const reportReducer = state.get('reports');
  return ({
    classData: state.get('classInfo').classList,
    packageData: state.get('packageInfo').packageList,
    reportData: state.get('reports').reportList,
    updated: reportReducer.updated,
    messageNotif: reportReducer.notifMsg,
    notifType: reportReducer.notifType,
    openNoti: reportReducer.openNoti,
  });
}

const mapDispatchToProps = (dispatch) => ({
  fetchReportsData: (data) => dispatch(getReportsData(data)),
  fetchPackageData: () => dispatch(getClassData()),
  fetchClassData: () => dispatch(getPackageData()),
  markAttendance: (data) => dispatch(markAttendance(data)),
  closeNotif: () => dispatch(closeNotifAction())
});

const AttendanceRedux = reduxForm({
  form: 'attendanceForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Attendance);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AttendanceRedux));
