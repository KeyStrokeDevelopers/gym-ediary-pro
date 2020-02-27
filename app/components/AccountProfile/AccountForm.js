/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import css from 'dan-styles/Form.scss';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Work from '@material-ui/icons/Work';
import { validate } from '../Forms/helpers/formValidation';
import { RegularTextFieldRedux, DatePickerInput, SelectRedux } from '../Forms/ReduxFormMUI';
import styles from '../Common/style';


class AccountForm extends React.Component {
  state = {
    mediaDate: null,
    date: null
  };

  handleDate = (e, date) => {
    this.setState({ date });
  }

  componentDidMount = () => {
    const { memberData } = this.props;
    this.props.initialize({ member: memberData._id });
  }

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      paymentMethodData,
      handleSubmit
    } = this.props;
    const { date } = this.state;


    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div className={classes.picker}>
              <Field
                name="date"
                label="Date"
                component={DatePickerInput}
                onChange={this.handleDate}
                dateValue={date}
              />
            </div>
            <div>
              <Field
                name="amount"
                component={RegularTextFieldRedux}
                placeholder="Amount"
                autoComplete="off"
                label="Amount"
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
              {paymentMethodData
                && (
                  <FormControl className={classes.field}>
                    <InputLabel htmlFor="selection">Select Payment Mode</InputLabel>
                    <Field
                      name="paymentMethod"
                      component={SelectRedux}
                      required
                      placeholder="Select Payment Mode"
                    >
                      {paymentMethodData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.paymentMethod}</MenuItem>)
                      }
                    </Field>
                  </FormControl>
                )
              }
            </div>

            <div>
              <Field
                name="description"
                component={RegularTextFieldRedux}
                placeholder="Description Optional"
                autoComplete="off"
                label="Description Optional"
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

const AccountFormRedux = reduxForm({
  form: 'accountForm',
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AccountForm);

const Account = connect(
  state => ({
    initialValues: state.get('account').formValues
  })
)(AccountFormRedux);


export default withStyles(styles)(Account);
