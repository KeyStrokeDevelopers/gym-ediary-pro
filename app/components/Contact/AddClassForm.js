/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import Bookmark from '@material-ui/icons/Bookmark';
import css from 'dan-styles/Form.scss';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {
  TextFieldRedux, TimePickerInput, SelectRedux, renderDaysToggleInput
} from '../Forms/ReduxFormMUI';
import { validate, number } from '../Forms/helpers/formValidation';
import styles from './contact-jss';


class AddClassForm extends React.Component {
  state = {
    tab: 0,
    durationIn: '',
    classFrom: null,
    classTo: null
  };

  componentDidMount() {
    this.props.initialize({
      isMon: true, isTue: true, isWed: true, isThu: true, isFri: true
    });
  }

  selectedValue = (e, value) => {
    let duration;
    if (value === 'days') {
      duration = 'Days';
    } else if (value === 'months') {
      duration = 'Months';
    }
    this.setState({ durationIn: duration });
  }

  handleClassFrom = (e, classFrom) => {
    this.setState({ classFrom });
  }

  handleClassTo = (e, classTo) => {
    this.setState({ classTo });
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
      handleSubmit,
      staffData
    } = this.props;
    const { durationIn, classTo, classFrom } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmitData)}>
          <section className={css.bodyForm}>
            <div>
              <Field
                name="className"
                component={TextFieldRedux}
                placeholder="Class e.g. Yoga, Dance etc."
                label="Class e.g. Yoga, Dance etc."
                required
                autoComplete="off"
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
                name="classDetail"
                autoComplete="off"
                component={TextFieldRedux}
                placeholder="Class Details - If Any"
                label="Class Details - If Any"
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
                name="classFrom"
                label="Class From"
                autoComplete="off"
                component={TimePickerInput}
                onChange={this.handleClassFrom}
                timeValue={classFrom}
              />
            </div>
            <div className={classes.picker}>
              <Field
                name="classTo"
                label="Class To"
                autoComplete="off"
                component={TimePickerInput}
                onChange={this.handleClassTo}
                timeValue={classTo}
              />
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Select Duration In</InputLabel>
                <Field
                  name="durationIn"
                  component={SelectRedux}
                  placeholder="Select Duration In"
                  onChange={this.selectedValue}
                >
                  <MenuItem value="">
                    {' '}
                    <em>None</em>
                    {' '}
                  </MenuItem>
                  <MenuItem value="days">Days</MenuItem>
                  <MenuItem value="months">Months</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="classDuration"
                component={TextFieldRedux}
                autoComplete="off"
                placeholder={`Duration In ${durationIn}`}
                label={`Duration In ${durationIn}`}
                required
                validate={number}
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
            <div>
              <Field
                name="classPrice"
                component={TextFieldRedux}
                autoComplete="off"
                placeholder="Class Price"
                label="Class Price"
                required
                validate={number}
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
            <div>
              <div style={{ color: 'gray' }}>
                Active Days
              </div>
              <div style={{
                display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around'
              }}
              >
                <Field
                  name="isMon"
                  component={renderDaysToggleInput}
                  label="MON"
                />
                <Field
                  name="isTue"
                  component={renderDaysToggleInput}
                  label="TUE"
                />
                <Field
                  name="isWed"
                  component={renderDaysToggleInput}
                  label="WED"
                />
                <Field
                  name="isThu"
                  component={renderDaysToggleInput}
                  label="THU"
                />
                <Field
                  name="isFri"
                  component={renderDaysToggleInput}
                  label="FRI"
                />
                <Field
                  name="isSat"
                  component={renderDaysToggleInput}
                  label="SAT"
                />
                <Field
                  name="isSun"
                  component={renderDaysToggleInput}
                  label="SUN"
                />
              </div>
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Staff Member Taking This Class</InputLabel>
                <Field
                  name="classTakingBy"
                  component={SelectRedux}
                  required
                  placeholder="Staff Member Taking This Class"
                >
                  <MenuItem value="">
                    {' '}
                    <em>None</em>
                    {' '}
                  </MenuItem>
                  {
                    staffData.length >= 1 && staffData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.staffName}</MenuItem>)
                  }
                </Field>
              </FormControl>
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


const AddClassFormRedux = reduxForm({
  form: 'addClassForm',
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AddClassForm);


const AddClassInit = connect(
  state => ({
    initialValues: state.get('classInfo').formValues
  })
)(AddClassFormRedux);


export default withStyles(styles)(AddClassInit);
