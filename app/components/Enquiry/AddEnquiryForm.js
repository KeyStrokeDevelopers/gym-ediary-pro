/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import Bookmark from '@material-ui/icons/Bookmark';
import Work from '@material-ui/icons/Work';
import css from 'dan-styles/Form.scss';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { getAge } from '../Common/helpers';
import styles from './enquiry-jss';
import { validate, phoneNumber, email } from '../Forms/helpers/formValidation';
import {
  TextFieldRedux, RegularTextFieldRedux, DatePickerInput, SelectRedux, renderFollowUpInput
} from '../Forms/ReduxFormMUI';


class AddEnquiryForm extends React.Component {
  state = {
    tab: 0,
    age: '0',
    dob: null,
    followUpDate: null,
    formValues: null
  };

  componentDidUpdate = () => {
    const { formValues } = this.props;
    if (formValues !== this.state.formValues) {
      this.setState({ formValues: formValues, dob: formValues.dob, followUpDate: formValues.followUpDate ? formValues.followUpDate : null })
    }
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleAge = (date) => {
    const age = getAge(date);
    this.setState({ age });
  }

  handleDateOfBirth = (e, date) => {
    this.setState({ dob: date });
  }

  handleFollowUpDate = (e, date) => {
    this.setState({ followUpDate: date });
  }

  handleSubmitData = (data) => {
    const { onSubmit, reset } = this.props
    onSubmit(data);
    reset();
  }

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      purposeData,
      packageData,
      classData,
      handleSubmit,
    } = this.props;
    const { age, dob, followUpDate } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmitData)}>
          <section className={css.bodyForm}>
            <div>
              <Field
                name="name"
                component={TextFieldRedux}
                placeholder="Member Name"
                autoComplete="off"
                label="Member Name"
                required
                ref={this.saveRef}
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
            <div>
              <Field
                name="contact"
                component={TextFieldRedux}
                autoComplete="off"
                placeholder="Contact Number"
                label="Contact Number"
                required
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
            <div style={{ display: 'flex' }}>
              <div style={{ width: '30%', marginRight: '10px' }}>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">Favour Of</InputLabel>
                  <Field
                    name="fTitle"
                    component={SelectRedux}
                    required
                    placeholder="Title"
                    onChange={this.selectedValue}
                  >
                    <MenuItem value="">
                      {' '}
                      <em>None</em>
                      {' '}
                    </MenuItem>
                    <MenuItem value="s/o">S/O</MenuItem>
                    <MenuItem value="d/o">D/O</MenuItem>
                    <MenuItem value="w/o">W/O</MenuItem>
                  </Field>
                </FormControl>
              </div>
              <div style={{ width: '70%' }}>
                <Field
                  name="favourOf"
                  component={TextFieldRedux}
                  autoComplete="off"
                  placeholder="Favour Of & Name"
                  label="Favour Of & Name"
                  required
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
              <Field
                name="alternativeContact"
                component={TextFieldRedux}
                placeholder="Alternative Contact Number"
                label="Alternative Contact Number"
                autoComplete="off"
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
            <div>
              <Field
                name="email"
                component={RegularTextFieldRedux}
                placeholder="Email"
                autoComplete="off"
                label="Email"
                validate={email}
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Bookmark />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div className={classes.picker}>
              <Field
                name="dob"
                label={(age !== '0')
                  ? (
                    <div>
                      <span style={{ color: '#000000' }}>Date of Birth : </span>
                      <span style={{ color: '#1565C0' }}>
                        {' '}
                        {`${age}`}
                        {' '}
                      </span>
                    </div>
                  ) : 'Date Of Birth'}
                disableFuture
                component={DatePickerInput}
                onChange={this.handleDateOfBirth}
                dateValue={dob}
              />
            </div>
            <div>
              <Field
                name="address"
                component={RegularTextFieldRedux}
                placeholder="Postal Address"
                label="Address"
                autoComplete="off"
                required
                multiline
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
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Purpose</InputLabel>
                <Field
                  name="purpose"
                  component={SelectRedux}
                  placeholder="Purpose"
                >
                  <MenuItem value="">None</MenuItem>
                  {
                    purposeData && purposeData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.purposeName}</MenuItem>)
                  }
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="query"
                component={RegularTextFieldRedux}
                placeholder="Query - If Any"
                autoComplete="off"
                multiline
                label="Query - If Any"
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
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Package</InputLabel>
                <Field
                  name="packageInfo"
                  component={SelectRedux}
                  placeholder="Package"
                >
                  <MenuItem value="">
                    {' '}
                    <em>None</em>
                    {' '}
                  </MenuItem>
                  {
                    packageData && packageData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.packName}</MenuItem>)
                  }
                </Field>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Add-On-Class - If Any</InputLabel>
                <Field
                  name="classInfo"
                  component={SelectRedux}
                  placeholder="Add-On-Class - If Any"
                  onChange={this.handleClassSelected}
                >
                  <MenuItem value="">None</MenuItem>
                  {
                    classData && classData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.className}</MenuItem>)
                  }
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="response"
                component={RegularTextFieldRedux}
                placeholder="Response e.g- Call Me Later, Not Interested"
                label="Response e.g- Call Me Later, Not Interested"
                autoComplete="off"
                className={classes.field}
                required
                multiline
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
              <div style={{ color: 'gray', width: '100%', fontSize: '13px' }}>
                FOLLOW UP e.g. -If YES Then Choose Date
                </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '20%', marginTop: '15px' }}>
                  <Field
                    name="followUp"
                    component={renderFollowUpInput}
                  />
                </div>
                <div className={classes.picker} style={{ textAlign: 'center', width: '80%' }}>
                  <Field
                    name="followUpDate"
                    label="Follow Up Date"
                    disablePast
                    component={DatePickerInput}
                    onChange={this.handleFollowUpDate}
                    dateValue={followUpDate}
                  />
                </div>
              </div>
            </div>
            <div>
              <Field
                name="referredBy"
                component={RegularTextFieldRedux}
                placeholder="Referred By Optional"
                label="Referred By Optional"
                autoComplete="off"
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
              {' '}
              Reset
              </Button>
          </div>
        </form>
      </div>
    );
  }
}


const AddEnquiryFormRedux = reduxForm({
  form: 'addEnquiryForm',
  validate,
  enableReinitialize: true
})(AddEnquiryForm);


const AddEnquiryInit = connect(
  state => ({
    initialValues: state.get('enquiry').formValues
  })
)(AddEnquiryFormRedux);


export default withStyles(styles)(AddEnquiryInit);
