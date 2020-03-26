/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import css from 'dan-styles/Form.scss';
import { SelectRedux, DatePickerInput } from '../Forms/ReduxFormMUI';
import { validate } from '../Forms/helpers/formValidation';
import styles from './contact-jss';


class AddSubscriptionForm extends React.Component {
  state = {
    age: '',
    date: new Date(),
    // name: 'hai',
  };

  componentDidUpdate = () => {
    const { isFormReset, reset } = this.props;
    if (isFormReset) {
      reset();
    }
  }

  handleChange = event => {
    this.setState({ age: event.target.value });
  };

  handleDate = date => {
    this.setState({ date })
  }

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      handleSubmit,
      masterPackageData
    } = this.props;
    const { date } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div>
              <FormControl className={classes.field} style={{ width: '100%' }}>
                <InputLabel htmlFor="selection">Select Package</InputLabel>
                <Field
                  name="package"
                  component={SelectRedux}
                  placeholder="Select Package"
                >
                  {(masterPackageData && masterPackageData.length >= 1) &&
                    masterPackageData.map((item) => {
                      if (item.packPrice > 0) {
                        return <MenuItem value={item} key={Math.random()}>{item.packName}</MenuItem>
                      }
                    })
                  }
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="activationDate"
                label="Package Activation Date"
                disablePast
                component={DatePickerInput}
                onChange={this.handleDate}
                dateValue={date}
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

const AddSubscriptionRedux = reduxForm({
  form: 'addSubscriptionForm',
  validate,
  enableReinitialize: true
})(AddSubscriptionForm);


const AddSubscriptionInit = connect(
  state => ({
    initialValues: state.get('subscription').formValues
  })
)(AddSubscriptionRedux);


export default withStyles(styles)(AddSubscriptionInit);
