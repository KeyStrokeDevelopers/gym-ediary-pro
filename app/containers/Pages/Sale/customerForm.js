/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import css from 'dan-styles/Form.scss';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { setCustomerInfo } from 'dan-actions/saleActions.js';
import { withStyles } from '@material-ui/core/styles';
import styles from './sale-jss';
import NumberSuggest from '../../../components/Common/helpers/autoCompleteNumber';
import NameSuggest from '../../../components/Common/helpers/autoCompleteName';
import { validate, email, phoneNumber } from '../../../components/Forms/helpers/formValidation';
import {
  RegularTextFieldRedux, SelectRedux, DatePickerInput, renderToggleAnniversaryWishes, renderToggleBirthDayWishes
} from '../../../components/Forms/ReduxFormMUI';
import { allIndianState } from '../../../components/Common/constant';

class CustomerForm extends Component {
  state = {
    date: null,
    dob: null,
    anniversary: null,
    temp: null
  }

  componentDidMount = () => {
    const { customerInfo, initObj } = this.props
    if (Object.keys(customerInfo).length >= 1) {
      this.props.initialize(customerInfo);
      let dob = customerInfo.get('dobWish');
      let anniversary = customerInfo.get('anniversaryWish');
      this.setState({ dob, anniversary });
    } else if (Object.keys(initObj).length >= 1) {
      this.props.initialize(initObj);
      let dob = initObj.dobWish;
      let anniversary = initObj.anniversaryWish;
      let date = initObj.date;
      this.setState({ dob, anniversary, date });
    }
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

  handleDate = (e, date) => {
    this.setState({ date, temp: e });
  }

  handleDateOfBirth = (e, dob) => {
    this.setState({ dob, temp: e });
  }

  handleAnniversary = (e, anniversary) => {
    this.setState({ anniversary, temp: e });
  }

  render() {
    const {
      classes,
      handleSubmit,
      accountInfoData
    } = this.props;
    const { dob, anniversary } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div className={classes.row}>
              <div className={classes.firstCol}>
                <Field
                  name="contact"
                  placeholder="Search/Add Contact"
                  label="Search/Add Contact"
                  autoComplete="off"
                  component={NumberSuggest}
                  validate={phoneNumber}
                  enquiryData={accountInfoData}
                  fillData={(data) => this.handleAccountInfoData(data)}
                  className={classes.field}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermContactCalendar />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div className={classes.secondCol}>
                <Field
                  name="name"
                  placeholder="Search/Add Name"
                  label="Search/Add Name"
                  autoComplete="off"
                  component={NameSuggest}
                  enquiryData={accountInfoData}
                  fillData={(data) => this.handleAccountInfoData(data)}
                  className={classes.field}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermContactCalendar />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.firstCol}>
                <Field
                  name="email"
                  placeholder="Email"
                  label="Email"
                  autoComplete="off"
                  component={RegularTextFieldRedux}
                  validate={email}
                  className={classes.field}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermContactCalendar />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div className={classes.secondCol}>
                <Field
                  name="gstNumber"
                  placeholder="GST Number"
                  label="GST Number"
                  autoComplete="off"
                  component={RegularTextFieldRedux}
                  className={classes.field}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermContactCalendar />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.firstCol}>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">Select State</InputLabel>
                  <Field
                    name="state"
                    component={SelectRedux}
                    required
                    placeholder="Select State"
                  >
                    {
                      (allIndianState && allIndianState.length >= 1) &&
                      allIndianState.map((item, index) => <MenuItem value={item.value} key={index + Math.random()}>{item.value}</MenuItem>)
                    }
                  </Field>
                </FormControl>
              </div>
              <div className={classes.secondCol}>
                <Field
                  name="address"
                  placeholder="Address"
                  label="Address"
                  autoComplete="off"
                  component={RegularTextFieldRedux}
                  className={classes.field}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermContactCalendar />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Blood Group</InputLabel>
                <Field
                  name="bloodGroup"
                  component={SelectRedux}
                  required
                  placeholder="Blood Group"
                  autoComplete="off"
                  onChange={this.selectedValue}
                >
                  <MenuItem value="">Not Known</MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div className={classes.row}>
              <div className={classes.picker}>
                <Field
                  name="birthdayWishes"
                  component={renderToggleBirthDayWishes}
                />
              </div>
              <div className={classes.picker}>
                <Field
                  name="dobWish"
                  label="Date Of Birth"
                  autoComplete="off"
                  disableFuture
                  component={DatePickerInput}
                  onChange={this.handleDateOfBirth}
                  dateValue={dob}
                />
              </div>
              <div className={classes.picker}>
                <Field
                  name="anniversaryWishes"
                  component={renderToggleAnniversaryWishes}
                />
              </div>
              <div className={classes.picker}>
                <Field
                  name="anniversaryWish"
                  label="ANNIVERSARY"
                  autoComplete="off"
                  component={DatePickerInput}
                  onChange={this.handleAnniversary}
                  dateValue={anniversary}
                />
              </div>
            </div>
          </section>
        </form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const sale = state.get('sale');
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
    initObj
  });
};

const mapDispatchToProps = dispatch => ({
  onSubmit: (data) => dispatch(setCustomerInfo(data))
});

const CustomerFormRedux = reduxForm({
  form: 'customerForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(CustomerForm);

const AccountInit = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerFormRedux);


export default withStyles(styles)(AccountInit);
