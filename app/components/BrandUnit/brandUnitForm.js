/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import css from 'dan-styles/Form.scss';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import styles from './brandUnit-jss';
import { validate } from '../Forms/helpers/formValidation';
import { RegularTextFieldRedux, SelectRedux } from '../Forms/ReduxFormMUI';

class BrandUnitForm extends React.Component {
  state = {
    entryType: 'Brand'
  }

  selectedValue = (e, entryType) => {
    this.setState({ entryType });
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
    } = this.props;
    const { entryType } = this.state;
    const placeValue = entryType === 'Brand' ? 'VALUE e.g. "Samsung, Philips, Nike"' : 'VALUE e.g. "kg, ltr"';
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmitData)}>
          <section className={css.bodyForm}>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Select Entry Type</InputLabel>
                <Field
                  name="entryType"
                  component={SelectRedux}
                  required
                  placeholder="Select Entry Type"
                  autoComplete="off"
                  onChange={this.selectedValue}
                >
                  <MenuItem value="Brand">Brand</MenuItem>
                  <MenuItem value="Unit">Unit</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="value"
                placeholder={placeValue}
                label={placeValue}
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


const BrandUnitFormRedux = reduxForm({
  form: 'brandUnitForm',
  validate,
  enableReinitialize: true
})(BrandUnitForm);


const BrandUnitInit = connect(
  state => ({
    initialValues: state.get('brandUnit').formValues
  })
)(BrandUnitFormRedux);


export default withStyles(styles)(BrandUnitInit);
