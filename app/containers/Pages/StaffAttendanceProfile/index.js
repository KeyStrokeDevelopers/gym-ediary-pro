/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm, Field } from 'redux-form/immutable';
import { AdvTable } from 'dan-components';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { fetchStaffAttendanceData } from '../../../actions/staffActions';
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
        id: 'staffAttendance',
        //  numeric: true,
        disablePadding: false,
        label: 'Attendance'
      }
    ],
    page: 0,
    rowsPerPage: 5,
    defaultPerPage: 5,
    filterText: '',
    fromDate: moment(new Date()).format('YYYY-MM-DD'),
    toDate: moment(new Date()).format('YYYY-MM-DD'),
    title: 'Staff Attendance'
  };

  componentDidMount() {
    const { fetchAttendanceData, staffData } = this.props;
    const { toDate, fromDate } = this.state;
    fetchAttendanceData({ staff: staffData._id, fromDate, toDate });
  }

  handleFromDate = (fromDate) => {
    const { fetchAttendanceData, staffData } = this.props;
    const { toDate } = this.state;
    fetchAttendanceData({ staff: staffData._id, fromDate, toDate });
    this.setState({ fromDate });
  }

  handleToDate = (toDate) => {
    const { fetchAttendanceData, staffData } = this.props;
    const { fromDate } = this.state;
    fetchAttendanceData({ staff: staffData._id, fromDate, toDate });
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
    const { attendanceData, classes } = this.props;
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
        {(attendanceData)
          ? (
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
          ) : (
            <div
              className={classes.cover}
              style={{
                backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'
              }}
            >
              <div
                className={classes.bg}
                style={{
                  minHeight: '200px', display: 'flex', color: '#2196F3', alignItems: 'center'
                }}
              >
                <Typography variant="h3" component="h3">
                  No data to show
                  </Typography>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const reportReducer = state.get('staff');
  return ({
    attendanceData: reportReducer.staffProfileAttendanceData
  });
};

const mapDispatchToProps = dispatch => ({
  fetchAttendanceData: (memberId) => dispatch(fetchStaffAttendanceData(memberId)),
});

const staffAttendanceRedux = reduxForm({
  form: 'staffAttendanceForm'
})(Attendance);


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(staffAttendanceRedux));
