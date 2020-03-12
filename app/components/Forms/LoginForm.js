/* eslint-disable */
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.png';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';
import { validate, phoneNumber } from './helpers/formValidation';
import { signIn, closeNotifAction } from '../../actions/signIn';
import { closeRegistrationNotifAction } from '../../actions/register';
import StyledNotif from '../../components/Notification/StyledNotif';


const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
class LoginForm extends React.Component {
  state = {
    showPassword: false
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleSignIn = (signInData) => {
    this.props.signIn(signInData);
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
      closeNotif,
      openSignNoti,
      closeRegiNotif
    } = this.props;
    const { showPassword } = this.state;
    return (
      <Fragment>
        <StyledNotif close={() => openSignNoti ? closeNotif() : closeRegiNotif()} openNoti={openNoti} message={messageNotif} notifType={notifType} />
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
              {/* <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/register">
                <Icon className={classes.icon}>arrow_forward</Icon>
                Create new account
              </Button> */}
            </div>
          </Hidden>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Sign In
          </Typography>
          <section className={classes.formWrap}>
            <form onSubmit={handleSubmit((formData) => this.handleSignIn(formData))}>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="branchContact"
                    component={TextFieldRedux}
                    placeholder="Registered Contact Number"
                    label="Registered Contact Number"
                    required
                    autoComplete="off"
                    validate={phoneNumber}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="staffContact"
                    component={TextFieldRedux}
                    autoComplete="off"
                    placeholder="Staff/User Contact Number"
                    label="Staff/User Contact Number"
                    required
                    validate={phoneNumber}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="staffPassword"
                    component={TextFieldRedux}
                    autoComplete="off"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div className={classes.optArea} style={{ justifyContent: 'flex-end' }}>
                <Button size="small" component={LinkBtn} to="/reset-password" className={classes.buttonLink}>Forgot Password</Button>
              </div>
              <div className={classes.optArea} style={{ justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="primary" size="large" type="submit" style={{ width: '80%' }}>
                  Continue
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                </Button>
              </div>
              <div className={classes.optArea} style={{ justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" size="large" type="button" style={{ backgroundColor: '#e57373', color: 'white', width: '80%' }}>
                  Click Here For Demo
                </Button>
              </div>
              <div className={classes.optArea} style={{ justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" size="large" type="button" component={LinkBtn} to="/register" style={{ backgroundColor: 'green', color: 'white', width: '80%' }}>
                  Create New Account
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
  const signInReducer = state.get('signIn');
  const registerReducer = state.get('register');
  return ({
    messageNotif: signInReducer.openNoti ? signInReducer.notifMsg : registerReducer.notifMsg,
    notifType: signInReducer.openNoti ? signInReducer.notifType : registerReducer.notifType,
    openNoti: signInReducer.openNoti ? signInReducer.openNoti : registerReducer.openNoti,
    openSignNoti: signInReducer.openNoti
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    signIn: (userData) => dispatch(signIn(userData)),
    closeNotif: () => dispatch(closeNotifAction()),
    closeRegiNotif: () => dispatch(closeRegistrationNotifAction())
  });
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'signIn',
  validate,
  enableReinitialize: true
})(LoginForm)));
