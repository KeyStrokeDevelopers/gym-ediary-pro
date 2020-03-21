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
import { SelectRedux, DatePickerInput, TextFieldRedux } from '../Forms/ReduxFormMUI';
import { validate, number } from '../Forms/helpers/formValidation';
import styles from './contact-jss';


class ClassSubscriptionForm extends React.Component {
  state = {
    durationIn: '',
    selectedClassPrice: 0,
    classDisc: 0,
    paidAmount: 0,
    classActivationDate: null,
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

  handleClassActivation = (e, date) => {
    this.setState({ classActivationDate: date });
  }

  handleClassSelected = (e, classId) => {
    const { availableClassData } = this.props;
    const selectedClass = availableClassData.filter((selectedClass) => selectedClass._id === classId);
    if (selectedClass) {
      this.setState({ selectedClassPrice: selectedClass[0].classPrice });
    }
  }

  handleClassDiscount = (e, classDisc) => {
    this.setState({ classDisc });
  }

  handlePaidAmount = (e, paidAmount) => {
    this.setState({ paidAmount });
  }

  selectedGstPer = (e, gstPer) => {
    this.setState({ gstPer });
  }

  handleSubmitData = (data) => {
    const { onSubmit, reset } = this.props;
    const { selectedClassPrice, classDisc, gstPer } = this.state;
    const total = selectedClassPrice - classDisc;
    const gstValue = Math.round(total * gstPer / 100);
    let submitData = data.set('classPrice', selectedClassPrice);
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
      availableClassData,
      paymentMethodData,
      handleSubmit
    } = this.props;
    const {
      selectedClassPrice, classDisc, paidAmount, classActivationDate, gstPer
    } = this.state;
    const total = selectedClassPrice - classDisc;
    const totalPayable = total + Math.round(total * gstPer / 100);
    const balAmount = totalPayable - paidAmount;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmitData)}>
          <section className={css.bodyForm}>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Class</InputLabel>
                <Field
                  name="classInfo"
                  component={SelectRedux}
                  placeholder="Class"
                  onChange={this.handleClassSelected}
                >
                  <MenuItem value="">None</MenuItem>
                  {
                    availableClassData && availableClassData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.className}</MenuItem>)
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
                name="classDisc"
                component={TextFieldRedux}
                placeholder="Class Discount"
                label="Class Discount"
                autoComplete="off"
                onChange={this.handleClassDiscount}
                validate={number}
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
                component={TextFieldRedux}
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
                component={TextFieldRedux}
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
                className={classes.field}
                validate={number}
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
                  placeholder="Add-On-Class - If Any"
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
                name="classActivation"
                label="Membership Activation"
                disablePast
                component={DatePickerInput}
                onChange={this.handleClassActivation}
                dateValue={classActivationDate}
              />
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


const ClassSubscriptionFormRedux = reduxForm({
  form: 'classSubscriptionForm',
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(ClassSubscriptionForm);


const ClassSubscription = connect(
  state => ({
    initialValues: state.get('classSubscription').formValues
  })
)(ClassSubscriptionFormRedux);


export default withStyles(styles)(ClassSubscription);
