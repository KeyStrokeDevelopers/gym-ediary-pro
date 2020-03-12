/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import css from 'dan-styles/Form.scss';
import { RegularTextFieldRedux, DatePickerInput } from '../Forms/ReduxFormMUI';
import formField from './measurementFormField';
import { validate } from '../Forms/helpers/formValidation';
import styles from './contact-jss';

class MeasurementForm extends React.Component {
  state = {
    measurementDate: null,
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

  handleMeasurementDate = (e, measurementDate) => {
    this.setState({ measurementDate });
  }

  componentDidMount = () => {
    const { memberData } = this.props;
    this.props.initialize({ member: memberData._id });
  }

  handleMeasurementSelected = (e, packId) => {
    const { availableMeasurementData } = this.props;
    const selectedMeasurement = availableMeasurementData.filter((selectedMeasurement) => selectedMeasurement._id === packId);
    if (selectedMeasurement) {
      this.setState({ selectedPackPrice: selectedMeasurement[0].packPrice });
    }
  }

  getFormField = (data, index) => {
    const { classes } = this.props;
    const { name, placeLabel } = data;
    const margin_right = index % 2 === 0 ? '4%' : '';
    return (
      <div className={classes.half} style={{ marginRight: margin_right }} key={index + Math.random()}>
        <Field
          name={name}
          component={RegularTextFieldRedux}
          placeholder={placeLabel}
          label={placeLabel}
          autoComplete="off"
          className={classes.field}
        />
      </div>
    );
  }

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      handleSubmit
    } = this.props;
    const { measurementDate } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div className={classes.picker}>
              <Field
                name="date"
                label="Measurement Date"
                component={DatePickerInput}
                onChange={this.handleMeasurementDate}
                dateValue={measurementDate}
              />
            </div>
            <div className={classes.flex}>
              {formField.map((data, index) => this.getFormField(data, index))}
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

const MeasurementFormRedux = reduxForm({
  form: 'MeasurementForm',
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(MeasurementForm);

const Measurement = connect(
  state => ({
    initialValues: state.get('measurement').formValues
  })
)(MeasurementFormRedux);


export default withStyles(styles)(Measurement);
