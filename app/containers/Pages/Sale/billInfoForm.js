/* eslint-disable */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import css from 'dan-styles/Form.scss';
import FormControl from '@material-ui/core/FormControl';
import { getPaymentMethodData } from 'dan-actions/paymentMethodActions';
import { setBillInfoData, setPaidAmount } from 'dan-actions/saleActions.js';
import styles from './sale-jss';
// import NumberSuggest from '../../../components/Common/helpers/autoCompleteNumber';
// import NameSuggest from '../../../components/Common/helpers/autoCompleteName';
import { validate } from '../../../components/Forms/helpers/formValidation';
import { RegularTextFieldRedux, DatePickerInput } from '../../../components/Forms/ReduxFormMUI';


class BillInfoForm extends Component {
  state = {
    date: null,
    temp: null
  }

  componentDidMount = () => {
    const { fetchPaymentMethodData } = this.props;
    fetchPaymentMethodData();
    //     const { accountInfo, initObj } = this.props
    //     if (Object.keys(accountInfo).length >= 1) {
    //         this.props.initialize(accountInfo);
    //         let dob = accountInfo.get('dobWish');
    //         let anniversary = accountInfo.get('anniversaryWish');
    //         this.setState({ dob, anniversary });
    //     } else if (Object.keys(initObj).length >= 1) {
    //         this.props.initialize(initObj);
    //         let dob = initObj.dobWish;
    //         let anniversary = initObj.anniversaryWish;
    //         let date = initObj.date;
    //         this.setState({ dob, anniversary, date });
    //     }
  }

  handleDate = (e, date) => {
    this.setState({ date, temp: e });
  }

  handleAccountInfoData = (data) => {
    this.props.initialize(data);
    if (data.dobWish) {
      this.setState({ dob: data.dobWish });
    }
    if (data.anniversaryWish) {
      this.setState({ anniversary: data.anniversaryWish });
    }
  }

  handlePaidAmount = (e, paidAmount) => {
    const { set_Paid_Amount } = this.props;
    set_Paid_Amount(paidAmount);
    this.setState({ temp: e });
  }

  checkPaidAmount = (value) => {
    const { cartData } = this.props;
    let totalAmount = 0;
    (cartData && cartData.length >= 1) && cartData.map((data) => {
      totalAmount += data.costPrice;
    });
    totalAmount = parseFloat(totalAmount.toFixed(2));
    const netPayableAmount = Math.round(totalAmount);
    const error = value > netPayableAmount ? 'Paid Amount > Payable Amount' : undefined;
    return error;
  }

  render() {
    const {
      classes,
      handleSubmit,
      paymentMethodData
    } = this.props;
    const { date } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div className={classes.row}>
              <div className={classes.firstCol}>
                <Field
                  name="date"
                  label="Date"
                  disableFuture
                  component={DatePickerInput}
                  autoComplete="off"
                  onChange={this.handleDate}
                  dateValue={date}
                />
              </div>
              <div className={classes.secondCol}>
                <Field
                  name="paidAmount"
                  placeholder="Paid Amount"
                  label="Paid Amount"
                  autoComplete="off"
                  component={RegularTextFieldRedux}
                  onChange={this.handlePaidAmount}
                  validate={this.checkPaidAmount}
                  className={classes.field}
                // InputProps={{
                //     startAdornment: (
                //         <InputAdornment position="start">
                //             <PermContactCalendar />
                //         </InputAdornment>
                //     )
                // }}
                />
              </div>
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Select Payment Mode</InputLabel>
                <Field
                  name="paymentMode"
                  component={SelectRedux}
                  required
                  placeholder="Select Payment Mode"
                >
                  {
                    (paymentMethodData && paymentMethodData.length >= 1) &&
                    paymentMethodData.map((item, index) => <MenuItem value={item._id} key={index + Math.random()}>{item.paymentMethod}</MenuItem>)
                  }
                </Field>
              </FormControl>
            </div>
          </section>
        </form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const sale = state.get('sale');
  const paymentMethodReducer = state.get('paymentMethod');
  let initObj = {};
  if (Object.keys(sale.formValues).length >= 1) {
    initObj = sale.formValues.accountData;
    initObj.date = sale.formValues.date;
    initObj.invoiceNumber = sale.formValues.invoice;
    initObj.invoiceId = sale.formValues.invoiceId;
    initObj.name = sale.formValues.distributor;
    initObj.transactionId = sale.formValues.transactionId;
  }
  return ({
    initObj,
    paymentMethodData: paymentMethodReducer.paymentMethodList,
    cartData: sale.cartList,
  });
};

const mapDispatchToProps = dispatch => ({
  onSubmit: (data) => {
    return dispatch(setBillInfoData(data));
  },
  fetchPaymentMethodData: () => dispatch(getPaymentMethodData()),
  set_Paid_Amount: (paidAmount) => dispatch(setPaidAmount(paidAmount))
});

const BillInfoFormRedux = reduxForm({
  form: 'billInfoForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(BillInfoForm);

const BillInfoInit = connect(
  mapStateToProps,
  mapDispatchToProps
)(BillInfoFormRedux);


export default withStyles(styles)(BillInfoInit);
