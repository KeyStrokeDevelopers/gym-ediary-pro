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
// import BillInfoForm from './billInfoForm';
import {
  handleNextStep, handleBack, shopingAgain, submitPurchaseData, resetCart, deletePurchaseData
} from 'dan-actions/purchaseActions.js';
import { getAccountInfoData } from 'dan-actions/accountInfoActions';
import { getGymInfoData, setInCart } from 'dan-actions/purchaseActions';
import BillInfo from './billInfo';
import AccountForm from './accountForm';
import PurchaseForm from './purchaseForm';
import SideReview from './sideReview';
import history from '../../../utils/history';
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

const steps = ['Purchase', 'Account'];

class Checkout extends React.Component {
  state = {
    activeStep: 0,
    purchaseData: {}
  };

  componentDidMount = () => {
    const { fetchAccountInfo, fetchGymInfoData, resetCart } = this.props;
    fetchAccountInfo();
    fetchGymInfoData();
    if (this.props.match.params.type !== 'edit') {
      resetCart();
    }
  }

  componentDidUpdate() {
    const { purchaseData, setInCart } = this.props;
    if (purchaseData !== this.state.purchaseData) {
      this.setState({ purchaseData });
      Object.keys(purchaseData).length >= 1
        && purchaseData.orderSummary.map((item) => {
          setInCart(item);
        });
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleShopingAgain = () => {
    const { shopingAgain } = this.props;
    this.setState({ activeStep: 0 });
    shopingAgain();
    history.push('/app/shoping/purchase/new');
  }

  handleDeleteInvoice = (invoiceId) => {
    const { deletePurchaseData } = this.props;
    deletePurchaseData(invoiceId);
    history.push('/app/reports/purchase');
  }

  render() {
    const {
      classes, width, onSubmit, accountInfo, nextStep, activeStep, handleBack, shopingAgain, cartList, billInfoData, submitPurchaseData, accountInfoData, match, purchaseData
    } = this.props;
    const purchaseRecord = {};
    purchaseRecord.orderSummary = cartList;
    purchaseRecord.accountInfo = billInfoData;

    return (
      <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Fragment>

              {activeStep >= steps.length ? (
                <>
                  {submitPurchaseData(purchaseRecord)}
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
                        {(activeStep === 0) && <PurchaseForm />}
                        {(activeStep === 1)
                          && (
                            <AccountForm
                              accountInfo={accountInfo}
                              accountInfoData={accountInfoData}
                            />
                          )}
                        {/* {(activeStep === 2) && <BillInfoForm />} */}
                      </Grid>
                      <Grid item xs={12} md={5}>
                        {activeStep !== 1 ? <SideReview /> : <BillInfo />}
                      </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                      <div style={{ width: '75%' }}>
                        {/* <Button
                                                    color="primary"
                                                    variant="contained"
                                                    size="large"
                                                    type='button'
                                                    className={classes.button}
                                                    onClick={() => onSubmit()}
                                                >
                                                    Add To Cart
                                                    </Button> */}
                      </div>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          Back
                        </Button>
                      )}
                      <div style={{ width: '25%', display: 'flex' }}>
                        <div>
                          {(cartList && cartList.length >= 1)
                            && (
                              <Button
                                variant="contained"
                                color="primary"
                                type="button"
                                onClick={() => {
                                  if (activeStep === 1) {
                                    onSubmit();
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
                                <DeleteIcon onClick={() => this.handleDeleteInvoice(purchaseData.invoiceId)} style={{ color: '#f56049', cursor: 'pointer' }} />
                              </Tooltip>
                            )
                          }
                        </div>
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
  const purchaseReducer = state.get('purchase');
  const accountInfoReducer = state.get('accountInfo');
  return ({
    accountInfo: purchaseReducer.accountData,
    activeStep: purchaseReducer.activeStep,
    cartList: purchaseReducer.cartList,
    billInfoData: purchaseReducer.billInfoData,
    accountInfoData: accountInfoReducer.accountInfoList,
    purchaseData: purchaseReducer.formValues
  });
};

const mapDispatchToProps = dispatch => ({
  onSubmit: () => dispatch(submit('accountForm')),
  // onBillInfoSubmit: () => dispatch(submit('billInfoForm')),
  nextStep: () => dispatch(handleNextStep()),
  handleBack: () => dispatch(handleBack()),
  shopingAgain: () => dispatch(shopingAgain()),
  submitPurchaseData: (data) => dispatch(submitPurchaseData(data)),
  fetchAccountInfo: () => dispatch(getAccountInfoData()),
  fetchGymInfoData: () => dispatch(getGymInfoData()),
  setInCart: (data) => dispatch(setInCart(data)),
  resetCart: () => dispatch(resetCart()),
  deletePurchaseData: (invoiceId) => dispatch(deletePurchaseData(invoiceId))
});

const CheckoutMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);

export default withWidth()(withStyles(styles)(CheckoutMapped));
