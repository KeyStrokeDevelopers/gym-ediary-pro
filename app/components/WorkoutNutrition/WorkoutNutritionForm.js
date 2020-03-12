/* eslint-disable */
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import css from 'dan-styles/Form.scss';
import Paper from '@material-ui/core/Paper';
import FitnessCenter from '@material-ui/icons/FitnessCenter';
import Restaurant from '@material-ui/icons/Restaurant';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './email-jss';
import EditorField from '../Contact/Editor/editorField';
import { SelectRedux } from '../Forms/ReduxFormMUI';

class WorkoutNutritionForm extends React.Component {
  state = {
    nutritionValue: 0,
    workOutValue: 0,
    workOutIndex: 7,
    initFormValue: {},
    value: 0,
    selectedPurpose: {},
    editorValue: [],
    isPurposeSelected: false
  };

  componentDidMount = () => {
    const { memberData } = this.props;
    this.props.initialize({ member: memberData._id });
  }

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

  selectedPurpose = (e, data) => {
    const { purposeData } = this.props;
    const selected_value = purposeData.filter((item) => item._id === data);
    this.setState({ initFormValue: selected_value[0], isPurposeSelected: true });
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
    const { editorValue, initFormValue } = this.state;
    const { initFormValueForEdit } = this.props;
    let initialValue;
    if (editorValue[index]) {
      initialValue = editorValue[index];
    } else if (initFormValue[type]) {
      initialValue = initFormValue[type];
    } else if (initFormValueForEdit[type]) {
      initialValue = initFormValueForEdit[type];
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

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      purposeData,
      initFormValueForEdit,
      handleSubmit
    } = this.props;
    const {
      nutritionValue, workOutValue, workOutIndex, value, isPurposeSelected
    } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            {!(isPurposeSelected || Object.keys(initFormValueForEdit).length >= 1)
              && (
                <div>
                  <FormControl className={classes.field}>
                    <InputLabel htmlFor="selection">Purpose</InputLabel>
                    <Field
                      name="purpose"
                      component={SelectRedux}
                      onChange={this.selectedPurpose}
                      placeholder="Purpose"
                    >
                      <MenuItem value="">None</MenuItem>
                      {
                        purposeData && purposeData.map((data) => <MenuItem key={Math.random()} value={data._id}>{data.purposeName}</MenuItem>)
                      }
                    </Field>
                  </FormControl>
                </div>
              )
            }
            {(isPurposeSelected || Object.keys(initFormValueForEdit).length >= 1) && (
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
            )
            }
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


const WorkoutNutritionFormRedux = reduxForm({
  form: 'workoutNutritionForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(WorkoutNutritionForm);


const WorkoutNutritionInit = connect(
  state => ({
    initialValues: state.get('workoutNutrition').formValues
  })
)(WorkoutNutritionFormRedux);


export default withStyles(styles)(WorkoutNutritionInit);
