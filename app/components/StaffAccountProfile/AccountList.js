/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { AdvTable } from 'dan-components';
import { reduxForm, Field } from 'redux-form/immutable';
import { DatePickerInput } from '../Forms/ReduxFormMUI';
import moment from 'moment';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class AccountList extends Component {
  state = {
    order: 'asc',
    orderBy: 'date',
    selected: [],
    columnData: [
      {
        id: 'editSalary',
        disablePadding: true,
        label: 'Edit'
      },
      {
        id: 'date',
        disablePadding: true,
        label: 'Date'
      }, {
        id: 'description',
        //  numeric: true,
        disablePadding: false,
        label: 'Description'
      }, {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Amount'
      }, {
        id: 'paymentMethod',
        // numeric: true,
        disablePadding: false,
        label: 'Payment Mode'
      },
    ],
    page: 0,
    rowsPerPage: 5,
    defaultPerPage: 5,
    filterText: '',
    title: 'Salary',
    fromDate: moment(new Date()).format('YYYY-MM-DD'),
    toDate: moment(new Date()).format('YYYY-MM-DD')
  };


  componentDidMount = () => {
    const { fetchSalaryData, staffData } = this.props;
    const { toDate, fromDate } = this.state;
    fetchSalaryData({ staff: staffData._id, fromDate, toDate });
  }


  handleFromDate = (fromDate) => {
    const { fetchSalaryData, staffData, setFromDate } = this.props;
    const { toDate } = this.state;
    fetchSalaryData({ staff: staffData._id, fromDate, toDate });
    this.setState({ fromDate });
    setFromDate(fromDate);
  }

  handleToDate = (toDate) => {
    const { fetchSalaryData, staffData, setToDate } = this.props;
    const { fromDate } = this.state;
    fetchSalaryData({ staff: staffData._id, fromDate, toDate });
    this.setState({ toDate });
    setToDate(toDate)
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
    const { classes, handlePrint, salaryData, editSalary } = this.props;
    const tableData = salaryData.filter(item => moment(new Date(item.date)).format('YYYY-MM-DD') >= fromDate && moment(new Date(item.date)).format('YYYY-MM-DD') <= toDate);
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
          SELECT DATE RANGE
        </div>
        <div style={{ display: 'flex', marginTop: '-8px' }}>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <Field
              name="fromDate"
              label="From"
              component={DatePickerInput}
              disableFuture
              onChange={this.handleFromDate}
              dateValue={fromDate}
            />
          </div>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <Field
              name="toDate"
              label="To"
              component={DatePickerInput}
              onChange={this.handleToDate}
              dateValue={toDate}
            />
          </div>
        </div>
        {(tableData)
          && (
            <>
              <AdvTable
                order={order}
                orderBy={orderBy}
                selected={selected}
                data={tableData}
                editSalary={editSalary}
                page={page}
                title={title}
                rowsPerPage={rowsPerPage}
                handlePrint={handlePrint}
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


const AccountListRedux = reduxForm({
  form: 'staffAccountListFilter'
})(AccountList);


export default withStyles(styles)(AccountListRedux);
