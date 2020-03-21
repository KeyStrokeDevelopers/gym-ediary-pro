/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import Work from '@material-ui/icons/Work';
import css from 'dan-styles/Form.scss';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { RegularTextFieldRedux, SelectRedux, DatePickerInput } from '../Forms/ReduxFormMUI';
import { validate, number } from '../Forms/helpers/formValidation';
import styles from './contact-jss';


class PackageSubscriptionForm extends React.Component {
  state = {
    durationIn: '',
    selectedPackPrice: 0,
    packDisc: 0,
    paidAmount: 0,
    packageActivationDate: null,
    gstPer: 0
  };

  selectedValue = (e, value) => {
    let duration;
    if (value === 'days') {
      duration = 'Days';
    } else if (value === 'months') {
      duration = 'Months';
    }
    this.setState({ durationIn: duration });
  }

  componentDidMount = () => {
    const { memberData } = this.props;
    this.props.initialize({ member: memberData._id });
  }

  handlePackageActivation = (e, packageActivationDate) => {
    this.setState({ packageActivationDate });
  }

  handlePackageSelected = (e, packId) => {
    const { availablePackageData } = this.props;
    const selectedPackage = availablePackageData.filter((selectedPackage) => selectedPackage._id === packId);
    if (selectedPackage) {
      this.setState({ selectedPackPrice: selectedPackage[0].packPrice });
    }
  }

  handlePackageDiscount = (e, packDisc) => {
    this.setState({ packDisc });
  }

  handlePaidAmount = (e, paidAmount) => {
    this.setState({ paidAmount });
  }

  selectedGstPer = (e, gstPer) => {
    this.setState({ gstPer })
  }

  handleSubmitData = (data) => {
    const { selectedPackPrice, packDisc, gstPer } = this.state;
    const { onSubmit, reset } = this.props;
    const total = selectedPackPrice - packDisc;
    const gstValue = Math.round(total * gstPer / 100);
    let submitData = data.set('packPrice', selectedPackPrice);
    submitData = submitData.set('gstValue', gstValue);
    submitData = submitData.set('gstPer', gstPer);
    onSubmit(submitData);
    reset();
  }

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      availablePackageData,
      paymentMethodData,
      handleSubmit
    } = this.props;
    const {
      selectedPackPrice, packDisc, paidAmount, packageActivationDate, gstPer
    } = this.state;
    const total = selectedPackPrice - packDisc;
    const totalPayable = total + Math.round(total * gstPer / 100);
    const balAmount = totalPayable - paidAmount;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmitData)}>
          <section className={css.bodyForm}>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Package</InputLabel>
                <Field
                  name="packageInfo"
                  component={SelectRedux}
                  placeholder="Package"
                  onChange={this.handlePackageSelected}
                >
                  <MenuItem value="">None</MenuItem>
                  {
                    availablePackageData && availablePackageData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.packName}</MenuItem>)
                  }
                </Field>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">GST %</InputLabel>
                <Field
                  name="gst"
                  component={SelectRedux}
                  required
                  placeholder="GST %"
                  onChange={this.selectedGstPer}
                >
                  <MenuItem value={0}>0.00</MenuItem>
                  <MenuItem value={5}>5.00</MenuItem>
                  <MenuItem value={12}>12.00</MenuItem>
                  <MenuItem value={18}>18.00</MenuItem>
                  <MenuItem value={28}>28.00</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="packDisc"
                component={RegularTextFieldRedux}
                placeholder="Package Discount"
                label="Package Discount"
                autoComplete="off"
                validate={number}
                onChange={this.handlePackageDiscount}
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Work />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <Field
                name="payable"
                component={RegularTextFieldRedux}
                placeholder={totalPayable}
                label="Payable"
                autoComplete="off"
                disabled
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Work />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <Field
                name="paidAmount"
                component={RegularTextFieldRedux}
                placeholder="Paid Amount"
                label={(balAmount !== 0)
                  ? (
                    <div>
                      <span style={{ color: '#000000' }}>Paid Amount / </span>
                      <span style={{ color: '#1565C0' }}>
                        {' '}
                        {`Balance ${balAmount}`}
                        {' '}
                      </span>
                    </div>
                  ) : 'Paid Amount'}
                autoComplete="off"
                onChange={this.handlePaidAmount}
                validate={number}
                className={classes.field}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Work />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Select Payment Mode</InputLabel>
                <Field
                  name="paymentMode"
                  component={SelectRedux}
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  {
                    paymentMethodData && paymentMethodData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.paymentMethod}</MenuItem>)
                  }
                </Field>
              </FormControl>
            </div>
            <div className={classes.picker}>
              <Field
                name="packActivation"
                label="Membership Activation"
                disablePast
                component={DatePickerInput}
                onChange={this.handlePackageActivation}
                dateValue={packageActivationDate}
              />
            </div>
            <div>
              Send Sms (Balance ) - Todo
            </div>
          </section>
          <div className={css.buttonArea}>
            <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
              Submit
            </Button>
            <Button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    );
  }
}


const PackageSubscriptionFormRedux = reduxForm({
  form: 'packageSubscriptionForm',
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(PackageSubscriptionForm);


const PackageSubscription = connect(
  state => ({
    initialValues: state.get('packageInfo').formValues
  })
)(PackageSubscriptionFormRedux);


export default withStyles(styles)(PackageSubscription);
