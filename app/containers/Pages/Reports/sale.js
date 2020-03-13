/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { AdvTable } from 'dan-components';
import { connect } from 'react-redux';
import styles from 'dan-components/Email/email-jss';
import { reduxForm, Field } from 'redux-form/immutable';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import InvoiceDetail from './invoiceDetail';
import { DatePickerInput } from '../../../components/Forms/ReduxFormMUI';
import { getSaleData, cancelInvoice, resetCart } from '../../../actions/saleActions';
import { getInvoiceInData } from '../../../actions/invoiceInActions';
import { getAccountInfoData } from '../../../actions/accountInfoActions';

class Sale extends Component {
  state = {
    DialogOpen: false,
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
        id: 'customer',
        numeric: true,
        disablePadding: false,
        label: 'CUSTOMER'
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
    title: 'Sale',
    fromDate: moment(new Date()).format('YYYY-MM-DD'),
    toDate: moment(new Date()).format('YYYY-MM-DD'),
    open: false,
    invoiceData: null,
    cancelInvoiceData: null
  };

  componentDidMount() {
    const { fromDate, toDate } = this.state;
    this.props.initialize({ fromDate, toDate });
    const {
      fetchInvoiceRecord, fetchAccountInfoData, fetchSaleRecord, reset_Cart
    } = this.props;
    const data = { fromDate, toDate };
    fetchInvoiceRecord(data);
    fetchAccountInfoData();
    fetchSaleRecord(data);
    reset_Cart();
  }

  handleFromDate = (fromDate) => {
    const { fetchInvoiceRecord, fetchSaleRecord } = this.props;
    const { toDate } = this.state;
    this.setState({ fromDate });
    const data = { fromDate, toDate };
    fetchInvoiceRecord(data);
    fetchSaleRecord(data);
  }

  handleToDate = (toDate) => {
    const { fetchInvoiceRecord, fetchSaleRecord } = this.props;
    const { fromDate } = this.state;
    this.setState({ toDate });
    const data = { fromDate, toDate };
    fetchInvoiceRecord(data);
    fetchSaleRecord(data);
  }

  editSaleData = (invoiceData) => {
    console.log('invoice data ----**---', invoiceData)
    this.setState({ open: true, invoiceData });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleCancelInvoice = (cancelInvoiceData) => {
    this.setState({ DialogOpen: true, cancelInvoiceData });
  }

  handleAgree = () => {
    const {
      cancel_Invoice, fetchInvoiceRecord, fetchAccountInfoData, fetchSaleRecord
    } = this.props;
    const { cancelInvoiceData, fromDate, toDate } = this.state;
    cancel_Invoice(cancelInvoiceData);
    this.setState({ DialogOpen: false, open: false });
    const data = { fromDate, toDate };
    fetchInvoiceRecord(data);
    fetchAccountInfoData();
    fetchSaleRecord(data);
  }

  handleDisagree = () => {
    this.setState({ DialogOpen: false });
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
      invoiceData,
      toDate,
      title,
      DialogOpen,
      open
    } = this.state;
    const { classes, saleData } = this.props;
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
        <div>
          <Dialog
            open={DialogOpen}
            onClose={this.handleDisagree}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Cancel Invoice'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure for cancel invoice ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDisagree} color="primary">
                Disagree
              </Button>
              <Button onClick={this.handleAgree} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <InvoiceDetail
          open={open}
          close={this.handleClose}
          invoiceData={invoiceData}
          cancelInvoice={(cancelInvoiceData) => this.handleCancelInvoice(cancelInvoiceData)}
        />
        <div style={{ marginLeft: '10px', marginTop: '10px', width: '100%' }}>
          SELECT FIELD
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
        {(saleData && saleData.length >= 1)
          ? (
            <>
              <AdvTable
                order={order}
                orderBy={orderBy}
                selected={selected}
                data={saleData}
                editSaleData={(data) => this.editSaleData(data)}
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
  saleData: state.get('sale').saleList
});

const mapDispatchToProps = (dispatch) => ({
  fetchAccountInfoData: () => dispatch(getAccountInfoData()),
  fetchInvoiceRecord: (data) => dispatch(getInvoiceInData(data)),
  fetchSaleRecord: (data) => dispatch(getSaleData(data)),
  cancel_Invoice: (data) => dispatch(cancelInvoice(data)),
  reset_Cart: () => dispatch(resetCart())
});

const SaleRedux = reduxForm({
  form: 'saleReportForm'
})(Sale);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SaleRedux));
