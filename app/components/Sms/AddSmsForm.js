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

class AddSmsForm extends React.Component {
  state = {
    age: '',
    // name: 'hai',
  };

  componentDidUpdate = () => {
    const { isFormReset, reset } = this.props;
    if (isFormReset) {
      reset()
    }
  }

  handleChange = event => {
    this.setState({ age: event.target.value });
  };

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
      smsData,
      handleSubmit
    } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmitData)}>
          <section className={css.bodyForm}>
            <div>
              <FormControl className={classes.field} style={{ width: '100%' }}>
                <InputLabel htmlFor="selection">Select Sms Pack</InputLabel>
                <Field
                  name="smsPack"
                  component={SelectRedux}
                  placeholder="Select Sms Pack"
                >
                  {
                    (smsData && smsData.length >= 1) &&
                    smsData.map((item) => {
                      if (item.smsPackPrice > 0) {
                        return <MenuItem value={item} key={Math.random()}>{item.smsPackName}</MenuItem>
                      }
                    })
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

const AddSmsFormRedux = reduxForm({
  form: 'addSmsForm',
  validate,
  enableReinitialize: true
})(AddSmsForm);

export default withStyles(styles)(connect(null, null)(AddSmsFormRedux));
