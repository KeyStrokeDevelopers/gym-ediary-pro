import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.png';
import { TextFieldRedux } from './ReduxFormMUI';
import { validate, phoneNumber } from './helpers/formValidation';
import styles from './user-jss';
import { resetPassword } from '../../actions/resetPassword';

class ResetForm extends React.Component {

  handleResetPassword = (resetData) => {
    console.log('reset -----data', resetData);
    this.props.resetPassword(resetData);
  }

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco,
    } = this.props;
    return (
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <div className={classes.topBar}>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt={brand.name} />
            {brand.name}
          </NavLink>
        </div>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          Send New Password to Your Registered GYM Number
        </Typography>
        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit((formData) => this.handleResetPassword(formData))}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="registerNumber"
                  component={TextFieldRedux}
                  placeholder="Your Registered GYM Contact Number"
                  label="Your Registered GYM Contact Number"
                  required
                  validate={phoneNumber}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" color="primary" type="submit">
                Send New Password
                <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state
  }
  //return state
}
const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (userData) => dispatch(resetPassword(userData)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'reset',
  validate,
  enableReinitialize: true
})(ResetForm)));