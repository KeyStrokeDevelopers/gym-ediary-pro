/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { AdvTable } from 'dan-components';
import { connect } from 'react-redux';
import { getAttendance } from '../../../actions/reportActions';
const styles = ({
  root: {
    flexGrow: 1,
  }
});

class Attendance extends Component {
  state = {
    fromDate: null,
    toDate: null,
    order: 'asc',
    orderBy: 'date',
    selected: [],
    tableData: [{ transactionDate: '20-02-2020', description: 'Test' }],
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
    title: 'Attendance'
  };

  componentDidMount() {
    const { memberData, fetchAttendanceData } = this.props;
    fetchAttendanceData(memberData._id);
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
      tableData,
      fromDate,
      toDate,
      title
    } = this.state;
    const { attendanceData } = this.props;
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
        {(tableData.length >= 1)
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
    attendanceData: reportReducer.attendanceList
  });
};

const mapDispatchToProps = dispatch => ({
  fetchAttendanceData: (memberId) => dispatch(getAttendance(memberId)),
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Attendance));
