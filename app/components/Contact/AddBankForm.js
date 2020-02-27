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
import Language from '@material-ui/icons/Language';
import css from 'dan-styles/Form.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextFieldRedux, renderToggleInput, RegularTextFieldRedux } from '../Forms/ReduxFormMUI';
import { validate } from '../Forms/helpers/formValidation';
import styles from './contact-jss';


class AddBankForm extends React.Component {
  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      handleSubmit,
      isLoading,
    } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div>
              <Field
                name="accountNumber"
                component={TextFieldRedux}
                placeholder="Account Number"
                label="Account Number"
                autoComplete="off"
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
                name="bankName"
                component={TextFieldRedux}
                placeholder="Bank Name"
                autoComplete="off"
                label="Bank Name"
                required
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
                name="ifsc"
                component={TextFieldRedux}
                placeholder="IFSC e.g HDFC001"
                label="IFSC e.g HDFC001"
                autoComplete="off"
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
            <div>
              <Field
                name="upi"
                component={RegularTextFieldRedux}
                placeholder="UPI e.g. 000121"
                label="UPI e.g. 000121"
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
            <div>
              <Field
                name="accountHolder"
                component={TextFieldRedux}
                placeholder="Account Holder"
                label="Account Holder"
                autoComplete="off"
                required
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Language />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <Field
                name="swipe"
                component={renderToggleInput}
              />
            </div>
          </section>
          <div className={css.buttonArea}>
            <Button variant="contained" color="secondary" type="submit" disabled={submitting} style={{ minWidth: '50%' }}>
              {isLoading ? <CircularProgress className={classes.progress} style={{ color: 'red' }} size={30} /> : 'Submit'}
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

const AddBankFormRedux = reduxForm({
  form: 'addBankForm',
  validate,
  enableReinitialize: true
})(AddBankForm);


const AddBankInit = connect(
  state => ({
    initialValues: state.get('bank').formValues
  })
)(AddBankFormRedux);


export default withStyles(styles)(AddBankInit);
