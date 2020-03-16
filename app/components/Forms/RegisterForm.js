/* eslint-disable */
import React, { Fragment, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Type from 'dan-styles/Typography.scss';
import Hidden from '@material-ui/core/Hidden';
import brand from 'dan-api/dummy/brand';
import { GradientDivider } from '../Divider';
import logo from '../../../public/images/logo.png';
import InputLabel from '@material-ui/core/InputLabel';
import {
  TextFieldRedux, DatePickerInput, RegularTextFieldRedux, SelectRedux
} from './ReduxFormMUI';
import {
  validate, email, phoneNumber, pinNumber
} from './helpers/formValidation';
import { allIndianState } from '../Common/constant';
import { registration, closeNotifAction } from '../../actions/register';
import StyledNotif from '../../components/Notification/StyledNotif';
import styles from './user-jss';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
class RegisterForm extends React.Component {
  state = {
    tab: 0,
    dob: null
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  handleRegisteration = (registerationData) => {
    this.props.register(registerationData);
  }

  handleDateOfBirth = (e, date) => {
    this.setState({ dob: date });
  }

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco,
      messageNotif,
      notifType,
      openNoti,
      closeNotif
    } = this.props;
    const { dob } = this.state
    return (
      <Fragment>
        <StyledNotif close={() => closeNotif()} openNoti={openNoti} message={messageNotif} notifType={notifType} />
        <Hidden mdUp>
          <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
            <img src={logo} alt={brand.name} />
            {brand.name}
          </NavLink>
        </Hidden>
        <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
          <Hidden smDown>
            <div className={classes.topBar}>
              <NavLink to="/" className={classes.brand}>
                <img src={logo} alt={brand.name} />
                {brand.name}
              </NavLink>
              {/* <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
                <Icon className={classes.icon}>arrow_forward</Icon>
                Already have account ?
              </Button> */}
            </div>
          </Hidden>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Register
          </Typography>
          <section className={classes.formWrap}>
            <form onSubmit={handleSubmit((formData) => this.handleRegisteration(formData))}>
              <div style={{ marginTop: '20px' }}>
                <Typography variant="button" className={Type.textCenter}>GYM Information</Typography>
                <GradientDivider />
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="branchName"
                    component={TextFieldRedux}
                    placeholder="GYM Name "
                    label="GYM Name"
                    autoComplete="off"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="branchAddress"
                    component={TextFieldRedux}
                    placeholder="Postal Address - if Any"
                    autoComplete="off"
                    multiline
                    rowsMax="4"
                    label="Postal Address - if Any"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="branchCity"
                    component={TextFieldRedux}
                    autoComplete="off"
                    placeholder="City"
                    label="City"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">Select State</InputLabel>
                  <Field
                    name="branchState"
                    component={SelectRedux}
                    required
                    placeholder="Select State"
                  >
                    {
                      (allIndianState && allIndianState.length >= 1) &&
                      allIndianState.map((item, index) => <MenuItem value={item.value} key={index + Math.random()}>{item.value}</MenuItem>)
                    }
                  </Field>
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="branchPin"
                    component={TextFieldRedux}
                    autoComplete="off"
                    placeholder="Pin Code"
                    label="Pin Code"
                    required
                    validate={pinNumber}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="branchContact"
                    component={TextFieldRedux}
                    placeholder="GYM Contact Number"
                    autoComplete="off"
                    label="GYM Contact Number"
                    required
                    validate={phoneNumber}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="branchEmail"
                    component={RegularTextFieldRedux}
                    autoComplete="off"
                    placeholder="Your Email"
                    label="Your Email"
                    required
                    validate={email}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Typography variant="button">Owner's Information</Typography>
                <GradientDivider />
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="staffName"
                    component={TextFieldRedux}
                    autoComplete="off"
                    placeholder="Owner's Name"
                    label="Owner's Name"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="staffContact"
                    component={TextFieldRedux}
                    placeholder="Contact Number"
                    autoComplete="off"
                    label="Contact Number"
                    required
                    validate={phoneNumber}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="staffEmail"
                    component={RegularTextFieldRedux}
                    autoComplete="off"
                    placeholder="Email Id"
                    label="Email Id"
                    required
                    validate={email}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div className={classes.picker}>
                <Field
                  name="staffDob"
                  label="Date Of Birth"
                  disableFuture
                  onChange={this.handleDateOfBirth}
                  dateValue={dob}
                  component={DatePickerInput}
                />
              </div>
              <div className={classes.optArea} style={{ justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="primary" type="submit" style={{ width: '80%' }}>
                  Continue
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                </Button>
              </div>
              <div className={classes.optArea} style={{ justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" size="large" type="button" component={LinkBtn} to="/login" style={{ backgroundColor: '#e57373', color: 'white', width: '80%' }}>
                  SignIn
                </Button>
              </div>
            </form>
          </section>
        </Paper>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const registerReducer = state.get('register');
  return ({
    userInfo: state,
    messageNotif: registerReducer.notifMsg,
    notifType: registerReducer.notifType,
    openNoti: registerReducer.openNoti
  });
}

const mapDispatchToProps = (dispatch) => ({
  register: (userData) => dispatch(registration(userData)),
  closeNotif: () => dispatch(closeNotifAction())
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'register',
  validate,
  enableReinitialize: true,
})(RegisterForm)));
