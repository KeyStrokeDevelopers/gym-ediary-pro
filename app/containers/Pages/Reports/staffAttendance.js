/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { AdvTable } from 'dan-components';
import styles from 'dan-components/Email/email-jss';
import { reduxForm, Field } from 'redux-form/immutable';
import moment from 'moment';
import { getStaffAttendanceData, markAttendance, closeNotifAction } from '../../../actions/staffActions';
import { DatePickerInput } from '../../../components/Forms/ReduxFormMUI';
import StyledNotif from '../../../components/Notification/StyledNotif';


class Attendance extends Component {
    state = {
        order: 'asc',
        orderBy: 'date',
        selected: [],
        tableData: [{
            attendance: 'true', form: 'abcdef', member: 'viender', constact: '9466051803'
        }],

        columnData: [
            {
                id: 'attendance',
                disablePadding: true,
                label: 'Mark Attendance'
            }, {
                id: 'staffName',
                disablePadding: true,
                label: 'Staff Name'
            }, {
                id: 'staffAddress',
                numeric: true,
                disablePadding: false,
                label: 'Staff Address'
            }, {
                id: 'staffContact',
                numeric: true,
                disablePadding: false,
                label: 'Staff Contact'
            }, {
                id: 'staffEmail',
                numeric: true,
                disablePadding: false,
                label: 'Staff Email'
            },
            {
                id: 'staffCode',
                disablePadding: false,
                label: 'Staff Code'
            },
            {
                id: 'staffAccessLevel',
                // numeric: true,
                disablePadding: false,
                label: 'Staff Access Level'
            },
        ],
        page: 0,
        rowsPerPage: 5,
        defaultPerPage: 5,
        date: moment(new Date()).format('YYYY-MM-DD'),
        filterText: '',
        title: 'Staff Attendance',
        attendanceType: 'forBoth',
        updated: false
    };

    componentDidMount() {
        const { fetchStaffData } = this.props;
        const { date } = this.state;
        fetchStaffData({ date });
    }

    handleDate = (e, date) => {
        const { fetchStaffData } = this.props;
        fetchStaffData({ date });
        this.setState({ date, isRadioOn: false });
    }

    handleAttendance = (data) => {
        const { markAttendance } = this.props;
        const { date } = this.state;
        const attendance = {
            date, attendance: data.attendance, staff: data.staffId
        };
        markAttendance(attendance);
    }

    render() {
        const { staffAttendanceData } = this.props;
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
        const {
            classes, classData, packageData, messageNotif, notifType, openNoti, closeNotif
        } = this.props;

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
                </div>
                <AdvTable
                    order={order}
                    orderBy={orderBy}
                    selected={selected}
                    data={staffAttendanceData}
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
    const staffReducer = state.get('staff');
    return ({
        staffAttendanceData: staffReducer.staffAttendanceData,
        messageNotif: staffReducer.notifMsg,
        notifType: staffReducer.notifType,
        openNoti: staffReducer.openNoti,
    });
}

const mapDispatchToProps = (dispatch) => ({
    fetchStaffData: (date) => dispatch(getStaffAttendanceData(date)),
    markAttendance: (data) => dispatch(markAttendance(data)),
    closeNotif: () => dispatch(closeNotifAction())
});

const AttendanceRedux = reduxForm({
    form: 'staffAttendanceForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(Attendance);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AttendanceRedux));
