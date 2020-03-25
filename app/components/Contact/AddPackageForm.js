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
import { TextFieldRedux, RegularTextFieldRedux, SelectRedux } from '../Forms/ReduxFormMUI';
import { validate, number } from '../Forms/helpers/formValidation';
import styles from './contact-jss';

class AddPackageForm extends React.Component {
  state = {
    durationIn: '',
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
      handleSubmit
    } = this.props;
    const { durationIn } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmitData)}>
          <section className={css.bodyForm}>
            <div>
              <Field
                name="packName"
                component={TextFieldRedux}
                autoComplete="off"
                placeholder="Package Name e.g. Monthly, Yearly"
                label="Package Name e.g. Monthly, Yearly"
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
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Select Duration In</InputLabel>
                <Field
                  name="durationIn"
                  component={SelectRedux}
                  placeholder="Select Duration In"
                  onChange={this.selectedValue}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="days">Days</MenuItem>
                  <MenuItem value="months">Months</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="packDuration"
                component={TextFieldRedux}
                autoComplete="off"
                placeholder={`Duration In ${durationIn}`}
                label={`Duration In ${durationIn}`}
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
                name="packPrice"
                component={TextFieldRedux}
                autoComplete="off"
                placeholder="Package Price - 1000, 3000"
                label="Package Price - 1000, 3000"
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
                name="packDetails"
                component={RegularTextFieldRedux}
                autoComplete="off"
                placeholder="Package Details - If Any"
                label="Package Details - If Any"
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


const AddPackageFormRedux = reduxForm({
  form: 'addPackageForm',
  validate,
  enableReinitialize: true
})(AddPackageForm);


const AddPackageInit = connect(
  state => ({
    initialValues: state.get('packageInfo').formValues
  })
)(AddPackageFormRedux);


export default withStyles(styles)(AddPackageInit);
