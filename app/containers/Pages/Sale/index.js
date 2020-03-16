/* eslint-disable */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import { submit } from 'redux-form/immutable';
import { connect } from 'react-redux';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Ionicon from 'react-ionicons';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import {
  handleNextStep, handleBack, shopingAgain, submitSaleData, resetCart, deleteSaleData, closeNotifAction
} from 'dan-actions/saleActions.js';
import { getCustomerData } from 'dan-actions/accountInfoActions';
import { getGymInfoData, setInCart } from 'dan-actions/saleActions';
import SideReview from './sideReview';
import SaleForm from './saleForm';
import BillInfoForm from './billInfoForm';
import CustomerForm from './customerForm';
import BillInfo from './billInfo';
import history from '../../../utils/history';
import StyledNotif from '../../../components/Notification/StyledNotif';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  stepper: {
    padding: `${theme.spacing(3)}px 0 ${theme.spacing(5)}px`,
  },
  finishMessage: {
    textAlign: 'center',
    maxWidth: 600,
    margin: '0 auto',
    '& h4': {
      color: theme.palette.primary.main,
      '& span': {
        textAlign: 'center',
        display: 'block',
        '& svg': {
          height: 'auto',
          width: 148
        }
      }
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

const steps = ['Sale', 'Customer Info', 'Bill Info'];

class Checkout extends React.Component {
  state = {
    saleData: {}
  };

  componentDidMount = () => {
    const { fetchCustomerInfo, fetchGymInfoData, reset_Cart } = this.props;
    fetchCustomerInfo();
    fetchGymInfoData();
    if (this.props.match.params.type !== 'edit') {
      reset_Cart();
    }
  }

  componentDidUpdate() {
    const { saleData, set_In_Cart } = this.props;
    if (saleData !== this.state.saleData) {
      this.setState({ saleData });
      Object.keys(saleData).length >= 1
        && saleData.orderSummary.map((item) => {
          set_In_Cart(item);
          return null;
        });
    }
  }

  handleShopingAgain = () => {
    const { shoping_Again } = this.props;
    shoping_Again();
  }

  handleDeleteInvoice = (invoiceId) => {
    const { delete_Sale_Data } = this.props;
    delete_Sale_Data(invoiceId);
    history.push('/app/reports/sale');
  }

  render() {
    const {
      classes, width, onSubmit, customerInfo, nextStep, activeStep, handle_Back, cartList, billInfoData, submit_Sale_Data, accountInfoData, match, saleData, onBillInfoSubmit, messageNotif,
      notifType,
      openNoti,
      closeNotif,
      isSaleSubmited
    } = this.props;
    const saleRecord = {};
    saleRecord.orderSummary = cartList;
    saleRecord.customerInfo = customerInfo;
    saleRecord.billInfo = billInfoData;
    return (
      <Fragment>
        <StyledNotif close={() => closeNotif()} openNoti={openNoti} message={messageNotif} notifType={notifType} />
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Fragment>

              {activeStep >= steps.length ? (
                <>
                  {!isSaleSubmited && submit_Sale_Data(saleRecord)}
                  <div className={classes.finishMessage}>
                    <Typography variant="h4" gutterBottom>
                      <span>
                        <Ionicon icon="ios-checkmark-circle-outline" />
                      </span>
                      {match.params.type !== 'edit'
                        ? 'Thank you for your order.' : 'Updated Bill Sucessfully'
                      }
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is&nbsp;
                      <strong>#2001539</strong>
                      .&nbsp;We have emailed your order confirmation, and will
                      send you an update when your order has shipped.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={this.handleShopingAgain} className={classes.button}>
                      Shoping Again
                    </Button>
                  </div>
                </>
              ) : (
                  <Fragment>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={7}>
                        <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel={isWidthDown('sm', width)}>
                          {steps.map(label => (
                            <Step key={label}>
                              <StepLabel>
                                {label}
                              </StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                        {(activeStep === 0) && <SaleForm />}
                        {(activeStep === 1)
                          && (
                            <CustomerForm
                              customerInfo={customerInfo}
                              accountInfoData={accountInfoData}
                            />
                          )}
                        {(activeStep === 2) && <BillInfoForm />}
                      </Grid>
                      <Grid item xs={12} md={5}>
                        {activeStep < steps.length - 1 ? <SideReview /> : <BillInfo />}
                      </Grid>
                    </Grid>
                    <div className={classes.buttons} style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                      {activeStep !== 0 && (
                        <Button onClick={handle_Back} className={classes.button}>
                          Back
                      </Button>
                      )}
                      <div>
                        {(cartList && cartList.length >= 1)
                          && (
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              onClick={() => {
                                if (activeStep === 1) {
                                  console.log('active step 1');
                                  onSubmit();
                                } else if (activeStep === 2) {
                                  console.log('active step 1');
                                  onBillInfoSubmit();
                                } else {
                                  nextStep();
                                }
                              }
                              }
                              className={classes.button}
                              size="large"
                            >
                              {activeStep === steps.length - 1 ? (match.params.type !== 'edit') ? 'Place order' : 'Update' : (match.params.type !== 'edit') ? 'Create Bill' : 'Update Bill'}
                            </Button>
                          )
                        }
                      </div>
                      <div style={{ marginTop: '27px', marginLeft: '20px' }}>
                        {((cartList && cartList.length >= 1) && (match.params.type === 'edit') && (activeStep === steps.length - 1))
                          && (
                            <Tooltip title="Delete Invoice">
                              <DeleteIcon onClick={() => this.handleDeleteInvoice(saleData.invoiceId)} style={{ color: '#f56049', cursor: 'pointer' }} />
                            </Tooltip>
                          )
                        }
                      </div>
                    </div>
                  </Fragment>
                )}
            </Fragment>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  const saleReducer = state.get('sale');
  const accountInfoReducer = state.get('accountInfo');
  return ({
    customerInfo: saleReducer.customerData,
    activeStep: saleReducer.activeStep,
    cartList: saleReducer.cartList,
    billInfoData: saleReducer.billInfoData,
    accountInfoData: accountInfoReducer.accountInfoList,
    saleData: saleReducer.formValues,
    isSaleSubmited: saleReducer.isSubmited,
    messageNotif: saleReducer.notifMsg,
    notifType: saleReducer.notifType,
    openNoti: saleReducer.openNoti,
  });
};

const mapDispatchToProps = dispatch => ({
  onSubmit: () => dispatch(submit('customerForm')),
  onBillInfoSubmit: () => dispatch(submit('billInfoForm')),
  nextStep: () => dispatch(handleNextStep()),
  handle_Back: () => dispatch(handleBack()),
  shoping_Again: () => dispatch(shopingAgain()),
  submit_Sale_Data: (data) => dispatch(submitSaleData(data)),
  fetchCustomerInfo: () => dispatch(getCustomerData()),
  fetchGymInfoData: () => dispatch(getGymInfoData()),
  set_In_Cart: (data) => dispatch(setInCart(data)),
  reset_Cart: () => dispatch(resetCart()),
  delete_Sale_Data: (invoiceId) => dispatch(deleteSaleData(invoiceId)),
  closeNotif: () => dispatch(closeNotifAction()),
});

const CheckoutMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);

export default withWidth()(withStyles(styles)(CheckoutMapped));
