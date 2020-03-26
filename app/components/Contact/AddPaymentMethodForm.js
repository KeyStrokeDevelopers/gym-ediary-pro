/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import css from 'dan-styles/Form.scss';
import { TextFieldRedux } from '../Forms/ReduxFormMUI';
import { validate } from '../Forms/helpers/formValidation';
import styles from './contact-jss';

class AddPaymentMethodForm extends React.Component {

  componentDidUpdate = () => {
    const { isFormReset, reset } = this.props;
    if (isFormReset) {
      reset();
    }
  }

  handleSubmitData = (data) => {
    const { onSubmit } = this.props
    onSubmit(data);
  }

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      handleSubmit
    } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmitData)}>
          <section className={css.bodyForm}>
            <div>
              <Field
                name="paymentMethod"
                component={TextFieldRedux}
                autoComplete="off"
                placeholder="Payment Method"
                label="Payment Method"
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


const AddPaymentMethodFormRedux = reduxForm({
  form: 'addPaymentMethodForm',
  validate,
  enableReinitialize: true
})(AddPaymentMethodForm);


const AddPaymentMethodInit = connect(
  state => ({
    initialValues: state.get('paymentMethod').formValues
  })
)(AddPaymentMethodFormRedux);


export default withStyles(styles)(AddPaymentMethodInit);
