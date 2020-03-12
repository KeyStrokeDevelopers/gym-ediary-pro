/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { AdvTable } from 'dan-components';
import { reduxForm, Field } from 'redux-form/immutable';
import { DatePickerInput } from '../Forms/ReduxFormMUI';
import moment from 'moment'

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class AccountList extends Component {
  state = {
    fromDate: moment(new Date).format('YYYY-MM-DD'),
    toDate: moment(new Date).format('YYYY-MM-DD'),
    order: 'asc',
    orderBy: 'date',
    selected: [],
    tableData: [],
    columnData: [
      {
        id: 'print',
        label: 'Print'
      },
      {
        id: 'transactionDate',
        disablePadding: true,
        label: 'Date'
      }, {
        id: 'description',
        //  numeric: true,
        disablePadding: false,
        label: 'Description'
      }, {
        id: 'debit',
        numeric: true,
        disablePadding: false,
        label: '[+]DEBIT'
      }, {
        id: 'credit',
        numeric: true,
        disablePadding: false,
        label: '[-]CREDIT'
      }, {
        id: 'paymentMode',
        // numeric: true,
        disablePadding: false,
        label: 'MODE'
      },
    ],
    page: 0,
    rowsPerPage: 5,
    defaultPerPage: 5,
    filterText: '',
    title: 'Account',
    accountData: []
  };

  getDate = (dateValue) => {
    const year = new Date(dateValue).getFullYear();
    const d = new Date(dateValue).getDate();
    const m = new Date(dateValue).getMonth() + 1;
    const month = m <= 9 ? `0${m}` : `${m}`;
    const day = d <= 9 ? `0${d}` : `${d}`;
    const date = `${year}-${month}-${day}`;
    return date;
  }

  createTableDate = (accountData) => {
    const { fromDate, toDate } = this.state;
    const beforeData = [];
    const afterData = [];
    const viewData = [];
    const tabData = [];
    accountData.map((item, index) => {
      if (this.getDate(item.transactionDate) < fromDate) {
        beforeData.push(item);
      }
      if (this.getDate(item.transactionDate) > toDate) {
        afterData.push(item);
      }
      if (!(this.getDate(item.transactionDate) < fromDate || this.getDate(item.transactionDate) > toDate)) {
        viewData.push(item);
      }
    });

    let bcredit = 0;
    let bdebit = 0;
    const bDate = `Before ${new Date(fromDate).toLocaleDateString()}`;
    const bDes = 'Prev Balance';
    beforeData.map((item, index) => {
      if (item.transactionStatus === 'Debit') {
        bdebit += item.amount;
      } else {
        bcredit += item.amount;
      }
    });

    let acredit = 0;
    let adebit = 0;
    const aDate = `After ${new Date(toDate).toLocaleDateString()}`;
    const aDes = 'Later Balance';

    afterData.map((item, index) => {
      if (item.transactionStatus === 'Debit') {
        adebit += item.amount;
      } else {
        acredit += item.amount;
      }
    });

    const before = {
      transactionDate: bDate, description: bDes, debit: bdebit, credit: bcredit
    };
    tabData.push(before);
    viewData.map((item) => tabData.push(item));
    const after = {
      transactionDate: aDate, description: aDes, debit: adebit, credit: acredit
    };
    tabData.push(after);
    this.setState({ tableData: tabData });
  }

  componentDidMount = () => {
    const { accountData } = this.props;
    setTimeout(() => {
      this.createTableDate(accountData);
    }, 0);
  }

  componentDidUpdate = () => {
    const { accountData } = this.props;
    if (accountData !== this.state.accountData) {
      setTimeout(() => {
        this.createTableDate(accountData);
      }, 0);
      this.setState({ accountData: accountData })
    }
  }


  handleFromDate = (fromDate) => {
    const { accountData } = this.state;
    this.setState({ fromDate });
    setTimeout(() => {
      this.createTableDate(accountData);
    }, 0);
  }

  handleToDate = (toDate) => {
    const { accountData } = this.state;
    this.setState({ toDate });
    setTimeout(() => {
      this.createTableDate(accountData);
    }, 0);
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
    const { paymentMethodData, classes, handlePrint } = this.props;
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
        {(tableData.length >= 1)
          && (
            <>
              <AdvTable
                order={order}
                orderBy={orderBy}
                selected={selected}
                paymentMethodData={paymentMethodData}
                data={tableData}
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
  form: 'accountListFilter'
})(AccountList);


export default withStyles(styles)(AccountListRedux);
