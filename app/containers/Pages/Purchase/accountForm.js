/* eslint-disable */
import React, { Fragment, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import css from 'dan-styles/Form.scss';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { setBillInfoData } from 'dan-actions/purchaseActions.js';
import styles from './purchase-jss';
import NumberSuggest from '../../../components/Common/helpers/autoCompleteNumber';
import NameSuggest from '../../../components/Common/helpers/autoCompleteName';
import { validate, email, phoneNumber } from '../../../components/Forms/helpers/formValidation';
import {
  RegularTextFieldRedux, SelectRedux, DatePickerInput, renderToggleBirthDayWishes, renderToggleAnniversaryWishes, SearchableSelect
} from '../../../components/Forms/ReduxFormMUI';
import { ContentDivider } from '../../../components/Divider';
import { allIndianState } from '../../../components/Common/constant';

class AccountForm extends Component {
  state = {
    date: null,
    dob: null,
    anniversary: null
  }

  componentDidMount = () => {
    const { accountInfo, initObj } = this.props;
    if (Object.keys(accountInfo).length >= 1) {
      this.props.initialize(accountInfo);
      const dob = accountInfo.get('dobWish');
      const anniversary = accountInfo.get('anniversaryWish');
      this.setState({ dob, anniversary });
    } else if (Object.keys(initObj).length >= 1) {
      this.props.initialize(initObj);
      const dob = initObj.dobWish;
      const anniversary = initObj.anniversaryWish;
      const { date } = initObj;
      this.setState({ dob, anniversary, date });
    }
  }

  handleDate = (e, date) => {
    this.setState({ date });
  }

  handleDateOfBirth = (e, dob) => {
    this.setState({ dob });
  }

  handleAnniversary = (e, anniversary) => {
    this.setState({ anniversary });
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

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      handleSubmit,
      accountInfoData
    } = this.props;
    const { date, dob, anniversary } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%', marginRight: '10px' }}>
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

              <div style={{ width: '50%' }}>
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
            <Fragment>
              <ContentDivider content="Invoice Info" />
            </Fragment>
            <div style={{ display: 'flex' }}>
              <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
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
              <div style={{ width: '50%' }}>
                <Field
                  name="invoiceNumber"
                  placeholder="Invoice Number"
                  label="Invoice Number"
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
          </section>
        </form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const purchase = state.get('purchase');
  let initObj = {};
  if (Object.keys(purchase.formValues).length >= 1) {
    initObj = purchase.formValues.accountData;
    initObj.date = purchase.formValues.date;
    initObj.invoiceNumber = purchase.formValues.invoice;
    initObj.invoiceId = purchase.formValues.invoiceId;
    initObj.name = purchase.formValues.distributor;
    initObj.transactionId = purchase.formValues.transactionId;
  }
  return ({
    initObj
  });
};

const mapDispatchToProps = dispatch => ({
  onSubmit: (data) => dispatch(setBillInfoData(data))
});

const AccountFormRedux = reduxForm({
  form: 'accountForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AccountForm);

const AccountInit = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountFormRedux);


export default withStyles(styles)(AccountInit);
