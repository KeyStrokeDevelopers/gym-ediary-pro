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
// import NumberSuggest from '../../../components/Common/helpers/autoCompleteNumber';
// import NameSuggest from '../../../components/Common/helpers/autoCompleteName';
import { validate, email, phoneNumber } from '../../../components/Forms/helpers/formValidation';
import {
  RegularTextFieldRedux, SelectRedux, DatePickerInput, renderToggleAnniversaryWishes, renderToggleBirthDayWishes, SearchableSelect
} from '../../../components/Forms/ReduxFormMUI';
import { allIndianState } from '../../../components/Common/constant';

class CustomerForm extends Component {
  state = {
    date: null,
    dob: null,
    anniversary: null,
    temp: null
  }

  // componentDidMount = () => {
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
  // }

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
    } = this.props;
    const { dob, anniversary } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%', marginRight: '10px' }}>
                <Field
                  name="contact"
                  placeholder="Contact"
                  label="Contact"
                  autoComplete="off"
                  component={RegularTextFieldRedux}
                  validate={phoneNumber}
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

              <div style={{ width: '50%' }}>
                <Field
                  name="name"
                  placeholder="Add Name"
                  label="Add Name"
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
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%', marginRight: '10px' }}>
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
              <div style={{ width: '50%' }}>
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
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%', marginRight: '10px' }}>
                <Field
                  name="state"
                  component={SearchableSelect}
                  placeholder="State"
                  autoComplete="off"
                  label="State"
                  options={allIndianState}
                  labelKey="value"
                  valueKey="value"
                  required
                  className={classes.field}
                />
              </div>
              <div style={{ width: '50%' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
