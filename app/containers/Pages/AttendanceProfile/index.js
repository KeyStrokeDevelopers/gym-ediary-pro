/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { AdvTable } from 'dan-components';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import moment from 'moment';
import StyledNotif from '../../../components/Notification/StyledNotif';
import { getAttendance, closeNotifAction } from '../../../actions/reportActions';
import { DatePickerInput } from '../../../components/Forms/ReduxFormMUI';
const styles = ({
  root: {
    flexGrow: 1,
  }
});

class Attendance extends Component {
  state = {
    order: 'asc',
    orderBy: 'date',
    selected: [],
    columnData: [
      {
        id: 'date',
        disablePadding: true,
        label: 'Date'
      }, {
        id: 'packAttendance',
        //  numeric: true,
        disablePadding: false,
        label: 'Package Attendance'
      }, {
        id: 'classAttendance',
        //  numeric: true,
        disablePadding: false,
        label: 'Class Attendance'
      }
    ],
    page: 0,
    rowsPerPage: 5,
    defaultPerPage: 5,
    filterText: '',
    title: 'Attendance',
    fromDate: moment(new Date()).format('YYYY-MM-DD'),
    toDate: moment(new Date()).format('YYYY-MM-DD'),
  };

  componentDidMount() {
    const { memberData, fetchAttendanceData } = this.props;
    const { fromDate, toDate } = this.state;
    fetchAttendanceData({ member: memberData._id, fromDate, toDate });
  }

  handleFromDate = (fromDate) => {
    const { fetchAttendanceData, memberData } = this.props;
    const { toDate } = this.state;
    fetchAttendanceData({ member: memberData._id, fromDate, toDate });
    this.setState({ fromDate });
  }

  handleToDate = (toDate) => {
    const { fetchAttendanceData, memberData } = this.props;
    const { fromDate } = this.state;
    fetchAttendanceData({ member: memberData._id, fromDate, toDate });
    this.setState({ toDate });
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
      fromDate,
      toDate,
      title
    } = this.state;
    const { attendanceData, classes, messageNotif,
      notifType,
      openNoti,
      closeNotif, } = this.props;
    return (
      <div style={{ width: '100%' }}>
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
          SELECT FIELD
        </div>
        <div style={{ display: 'flex', marginTop: '-8px' }}>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <Field
              name="fromDate"
              label="From"
              disableFuture
              component={DatePickerInput}
              onChange={this.handleFromDate}
              dateValue={fromDate}
            />
          </div>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <Field
              name="toDate"
              label="To"
              disableFuture
              component={DatePickerInput}
              onChange={this.handleToDate}
              dateValue={toDate}
            />
          </div>
        </div>
        {(attendanceData.length >= 1)
          && (
            <>
              <AdvTable
                order={order}
                orderBy={orderBy}
                selected={selected}
                data={attendanceData}
                page={page}
                title={title}
                rowsPerPage={rowsPerPage}
                defaultPerPage={defaultPerPage}
                filterText={filterText}
                columnData={columnData}
              />
            </>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const reportReducer = state.get('reports');
  return ({
    attendanceData: reportReducer.attendanceList,
    messageNotif: reportReducer.notifMsg,
    notifType: reportReducer.notifType,
    openNoti: reportReducer.openNoti,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchAttendanceData: (data) => dispatch(getAttendance(data)),
  closeNotif: () => dispatch(closeNotifAction()),
});

const attendanceRedux = reduxForm({
  form: 'attendanceProfileForm'
})(Attendance);


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(attendanceRedux));
