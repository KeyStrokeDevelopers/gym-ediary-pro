/* eslint-disable */
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import css from 'dan-styles/Form.scss';
import Paper from '@material-ui/core/Paper';
import FitnessCenter from '@material-ui/icons/FitnessCenter';
import Restaurant from '@material-ui/icons/Restaurant';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './email-jss';
import EditorField from './Editor/editorField';
import { TextFieldRedux } from '../Forms/ReduxFormMUI';

class AddPurposeForm extends React.Component {
  state = {
    nutritionValue: 0,
    workOutValue: 0,
    workOutIndex: 7,
    value: 0,
    editorValue: []
  };

  handleNutritionChange = (event, nutritionValue) => {
    this.setState({ nutritionValue });
  };

  handleWorkOutChange = (event, workOutValue) => {
    const index = workOutValue + 7;
    this.setState({ workOutValue, workOutIndex: index });
  }

  handleChange = (e, value) => {
    this.setState({ value });
  }

  handleEditorChange = (data, index) => {
    if (data && !(encodeURIComponent(data) === '%3Cp%3E%3C%2Fp%3E%0A')
      && !((encodeURIComponent(data) === '%3Cp%3Eundefined%3C%2Fp%3E%0A'))) {
      this.setState({ editorValue: { index, data } });
      const editValueArray = Object.assign({}, this.state);
      editValueArray.editorValue[index] = data;
      this.setState(editValueArray);
    }
  }

  editor = (type, index) => {
    const { editorValue } = this.state;
    let initialValue;
    if (editorValue[index]) {
      initialValue = editorValue[index];
    } else if (this.props.initFormValue[type]) {
      initialValue = this.props.initFormValue[type];
    }
    return (
      <EditorField
        name={type}
        disabled={false}
        key={type}
        placeholder="Type here"
        initValue={initialValue}
        onChange={(data) => this.handleEditorChange(data, index)}
      />
    );
  }

  handleSubmitData = (data) => {
    const { onSubmit, reset } = this.props
    onSubmit(data);
    reset();
  }

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      handleSubmit
    } = this.props;
    const {
      nutritionValue, workOutValue, workOutIndex, value
    } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmitData)}>
          <section className={css.bodyForm}>
            <div>
              <Field
                name="purposeName"
                component={TextFieldRedux}
                autoComplete="off"
                placeholder="Purpose Name"
                label="Purpose Name"
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
            <Fragment>
              <Paper>
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab icon={<Restaurant />} label="NUTRITION" />
                  <Tab icon={<FitnessCenter />} label="WORKOUT" />
                </Tabs>
              </Paper>
              {value === 0
                && (
                  <Fragment>
                    <div className={classes.tabRoot}>
                      <AppBar position="static" color="default">
                        <Tabs
                          value={nutritionValue}
                          onChange={this.handleNutritionChange}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="scrollable"
                          scrollButtons="on"
                        >
                          <Tab label="SUNDAY NUTRITION" />
                          <Tab label="MONDAY NUTRITION" />
                          <Tab label="TUESDAY NUTRITION" />
                          <Tab label="WEDNESDAY NUTRITION" />
                          <Tab label="THURSDAY NUTRITION" />
                          <Tab label="FRIDAY NUTRITION" />
                          <Tab label="SATURDAY NUTRITION" />
                        </Tabs>
                      </AppBar>
                      {nutritionValue === 0 && this.editor('nSunday', nutritionValue)}
                      {nutritionValue === 1 && this.editor('nMonday', nutritionValue)}
                      {nutritionValue === 2 && this.editor('nTuesday', nutritionValue)}
                      {nutritionValue === 3 && this.editor('nWednesday', nutritionValue)}
                      {nutritionValue === 4 && this.editor('nThursday', nutritionValue)}
                      {nutritionValue === 5 && this.editor('nFriday', nutritionValue)}
                      {nutritionValue === 6 && this.editor('nSaturday', nutritionValue)}
                    </div>
                  </Fragment>
                )
              }
              {value === 1
                && (
                  <Fragment>
                    <div className={classes.tabRoot}>
                      <AppBar position="static" color="default">
                        <Tabs
                          value={workOutValue}
                          onChange={this.handleWorkOutChange}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="scrollable"
                          scrollButtons="on"
                        >
                          <Tab label="SUNDAY WORKOUT" />
                          <Tab label="MONDAY WORKOUT" />
                          <Tab label="TUESDAY WORKOUT" />
                          <Tab label="WEDNESDAY WORKOUT" />
                          <Tab label="THURSDAY WORKOUT" />
                          <Tab label="FRIDAY WORKOUT" />
                          <Tab label="SATURDAY WORKOUT" />
                        </Tabs>
                      </AppBar>
                      {workOutValue === 0 && this.editor('wSunday', workOutIndex)}
                      {workOutValue === 1 && this.editor('wMonday', workOutIndex)}
                      {workOutValue === 2 && this.editor('wTuesday', workOutIndex)}
                      {workOutValue === 3 && this.editor('wWednesday', workOutIndex)}
                      {workOutValue === 4 && this.editor('wThursday', workOutIndex)}
                      {workOutValue === 5 && this.editor('wFriday', workOutIndex)}
                      {workOutValue === 6 && this.editor('wSaturday', workOutIndex)}
                    </div>
                  </Fragment>
                )
              }
            </Fragment>
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


const AddPurposeFormRedux = reduxForm({
  form: 'addPurposeForm',
  // validate,
  enableReinitialize: true
})(AddPurposeForm);


const AddPurposeInit = connect(
  state => ({
    initialValues: state.get('purpose').formValues
  })
)(AddPurposeFormRedux);


export default withStyles(styles)(AddPurposeInit);
