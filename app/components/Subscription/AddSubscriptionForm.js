/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Bookmark from '@material-ui/icons/Bookmark';
import css from 'dan-styles/Form.scss';
import { TextFieldRedux, SelectRedux } from '../Forms/ReduxFormMUI';
import { validate } from '../Forms/helpers/formValidation';
import styles from './contact-jss';


class AddSubscriptionForm extends React.Component {
  state = {
    age: '',
    // name: 'hai',
  };

  handleChange = event => {
    this.setState({ age: event.target.value });
  };

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
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div>
              <FormControl className={classes.field} style={{ width: '100%' }}>
                <InputLabel htmlFor="selection">Select Category Type</InputLabel>
                <Field
                  name="categoryType"
                  component={SelectRedux}
                  placeholder="Select Category Type"
                >
                  <MenuItem value="">
                    {' '}
                    <em>None</em>
                    {' '}
                  </MenuItem>
                  <MenuItem value="Expenditure">EXPENDITURE CATEGORY</MenuItem>
                  <MenuItem value="Income">EXTRA INCOME CATEGORY</MenuItem>

                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="category"
                component={TextFieldRedux}
                autoComplete="off"
                placeholder="Category e.g Commission"
                label="Category e.g Commission"
                className={classes.field}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Bookmark />
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

const AddSubscriptionRedux = reduxForm({
  form: 'addSubscriptionForm',
  validate,
  enableReinitialize: true
})(AddSubscriptionForm);


const AddSubscriptionInit = connect(
  state => ({
    initialValues: state.get('category').formValues
  })
)(AddSubscriptionRedux);


export default withStyles(styles)(AddSubscriptionInit);
