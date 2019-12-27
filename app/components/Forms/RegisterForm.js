import React, { Fragment, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Type from 'dan-styles/Typography.scss';
import { GradientDivider } from '../../components/Divider';
import Hidden from '@material-ui/core/Hidden';
import brand from 'dan-api/dummy/brand';
import logo from '../../../public/images/logo.png';
import { TextFieldRedux, DatePickerInput } from './ReduxFormMUI';
import { validate, email, phoneNumber, pinNumber } from './helpers/formValidation'
import { registration } from '../../actions/register'
import styles from './user-jss';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
class RegisterForm extends React.Component {
  state = {
    selectedDate: new Date().getTime(),
    tab: 0,
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

  handleDateChange = (date) => {
    let dob = new Date(date).getTime();
    this.setState({ selectedDate: dob })
  }

  handleRegisteration = (registerationData) => {
    const { selectedDate } = this.state
    registerationData.empDob = selectedDate;
    this.props.register(registerationData);

  }

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco
    } = this.props;
    const { selectedDate } = this.state

    return (
      <Fragment>
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
                <FormControl className={classes.formControl}>
                  <Field
                    name="branchState"
                    component={TextFieldRedux}
                    autoComplete="off"
                    placeholder="State"
                    label="State"
                    required
                    className={classes.field}
                  />
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
                    component={TextFieldRedux}
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
                <Typography variant="button"  >Owner's Information</Typography>
                <GradientDivider />
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="empName"
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
                    name="empContact"
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
                    name="empEmail"
                    component={TextFieldRedux}
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
                  name='empDob'
                  label='Date Of Birth'
                  component={DatePickerInput}
                  change={this.handleDateChange}
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
      </Fragment >
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
    register: (userData) => dispatch(registration(userData)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'register',
  validate,
  enableReinitialize: true,
})(RegisterForm)))
