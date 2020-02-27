/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { AdvTable } from 'dan-components';
import { connect } from 'react-redux';
import styles from 'dan-components/Email/email-jss';
import { reduxForm, Field } from 'redux-form/immutable';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { getAccountInfoData } from '../../../actions/accountInfoActions';
import { getInvoiceInData } from '../../../actions/invoiceInActions';
import { getPurchaseData, editPurchaseData, resetCart } from '../../../actions/purchaseActions';
import { DatePickerInput, SelectRedux } from '../../../components/Forms/ReduxFormMUI';

import history from '../../../utils/history';

class Purchase extends Component {
  state = {
    fromDate: null,
    toDate: null,
    order: 'asc',
    orderBy: 'date',
    selected: [],
    columnData: [
      {
        id: 'date',
        disablePadding: true,
        label: 'BILL DATE'
      }, {
        id: 'invoice',
        //  numeric: true,
        disablePadding: false,
        label: 'INVOICE'
      }, {
        id: 'distributor',
        numeric: true,
        disablePadding: false,
        label: 'DISTRIBUTOR'
      }, {
        id: 'quantity',
        numeric: true,
        disablePadding: false,
        label: 'QUANTITY'
      }, {
        id: 'taxableAmount',
        numeric: true,
        disablePadding: false,
        label: 'TAXABLE AMOUNT'
      }, {
        id: 'preDiscount',
        disablePadding: false,
        label: 'PRE DISCOUNT'
      }, {
        id: 'sgst',
        disablePadding: false,
        label: 'SGST'
      }, {
        id: 'cgst',
        disablePadding: false,
        label: 'CGST'
      }, {
        id: 'igst',
        numeric: true,
        disablePadding: false,
        label: 'IGST'
      }, {
        id: 'ugst',
        numeric: true,
        disablePadding: false,
        label: 'UGST'
      }, {
        id: 'discount',
        numeric: true,
        disablePadding: false,
        label: 'DISCOUNT'
      }, {
        id: 'adCharge',
        numeric: true,
        disablePadding: false,
        label: 'AD. CHARGES'
      }, {
        id: 'netAmount',
        numeric: true,
        disablePadding: false,
        label: 'NET AMOUNT'
      }
    ],
    page: 0,
    rowsPerPage: 5,
    defaultPerPage: 5,
    filterText: '',
    title: 'Purchase',
    fromDate: moment(new Date()).format('YYYY-MM-DD'),
    toDate: moment(new Date()).format('YYYY-MM-DD'),
    vendorInfo: 'All'
  };

  componentDidMount() {
    const { fromDate, toDate, vendorInfo } = this.state;
    this.props.initialize({ vendorInfo: 'All', fromDate, toDate });
    const {
      fetchInvoiceRecord, fetchAccountInfoData, fetchPurchaseRecord, resetCart
    } = this.props;
    const data = { fromDate, toDate, accountInfo: vendorInfo };
    fetchInvoiceRecord(data);
    fetchAccountInfoData();
    fetchPurchaseRecord(data);
    resetCart();
  }

  handleFromDate = (fromDate) => {
    const { fetchInvoiceRecord, fetchPurchaseRecord } = this.props;
    const { toDate, vendorInfo } = this.state;
    this.setState({ fromDate });
    const data = { fromDate, toDate, accountInfo: vendorInfo };
    fetchInvoiceRecord(data);
    fetchPurchaseRecord(data);
  }

  handleToDate = (toDate) => {
    const { fetchInvoiceRecord, fetchPurchaseRecord } = this.props;
    const { fromDate, vendorInfo } = this.state;
    this.setState({ toDate });
    const data = { fromDate, toDate, accountInfo: vendorInfo };
    fetchInvoiceRecord(data);
    fetchPurchaseRecord(data);
  }

  handleVendorInfoData = (e, vendorInfo) => {
    this.setState({ vendorInfo });
    const { fetchInvoiceRecord, fetchPurchaseRecord } = this.props;
    const { fromDate, toDate } = this.state;
    const data = { fromDate, toDate, accountInfo: vendorInfo };
    fetchInvoiceRecord(data);
    fetchPurchaseRecord(data);
  }

  editPurchaseData = (data) => {
    const { editPurchaseData } = this.props;
    editPurchaseData(data);
    history.push('/app/shoping/purchase/edit');
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
    const { accountInfoData, classes, purchaseData } = this.props;
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
          SELECT FIELD
          </div>
        <div style={{ display: 'flex', marginTop: '-8px' }}>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Select Vendor</InputLabel>
              <Field
                name="vendorInfo"
                component={SelectRedux}
                required
                placeholder="Select Vendor"
                onChange={this.handleVendorInfoData}
              >
                <MenuItem value="All">All</MenuItem>
                {accountInfoData && accountInfoData.map((item, index) => <MenuItem value={item._id} key={index + Math.random()}>{`${item.name}||${item.contact}||${item.state}`}</MenuItem>)}
              </Field>
            </FormControl>
          </div>
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

        {(purchaseData && purchaseData.length >= 1)
          ? (
            <>
              <AdvTable
                order={order}
                orderBy={orderBy}
                selected={selected}
                data={purchaseData}
                editPurchaseData={this.editPurchaseData}
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
                  minHeight: '400px', display: 'flex', color: '#2196F3', alignItems: 'center'
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


const mapStateToProps = (state) => ({
  accountInfoData: state.get('accountInfo').accountInfoList,
  purchaseData: state.get('purchase').purchaseList
});

const mapDispatchToProps = (dispatch) => ({
  fetchAccountInfoData: () => dispatch(getAccountInfoData()),
  fetchInvoiceRecord: (data) => dispatch(getInvoiceInData(data)),
  fetchPurchaseRecord: (data) => dispatch(getPurchaseData(data)),
  editPurchaseData: (data) => dispatch(editPurchaseData(data)),
  resetCart: () => dispatch(resetCart())
});

const PurchaseReportRedux = reduxForm({
  form: 'purchaseReportForm'
})(Purchase);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PurchaseReportRedux));
