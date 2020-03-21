/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import css from 'dan-styles/Form.scss';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { getAge } from '../Common/helpers';
import styles from './expenseIncome-jss';
import { validate } from '../Forms/helpers/formValidation';
import { TextFieldRedux, DatePickerInput, SelectRedux } from '../Forms/ReduxFormMUI';

class AddExpenseIncomeForm extends React.Component {
  state = {
    tab: 0,
    age: '0',
    categoryType: '',
    date: null
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleCategoryType = (e, data) => {
    this.setState({ categoryType: data });
  }

  handleAge = (date) => {
    const age = getAge(date);
    this.setState({ age });
  }

  handleDate = (e, date) => {
    this.setState({ date });
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
      categoryData,
      paymentMethodData,
      handleSubmit,
    } = this.props;
    const { categoryType, date } = this.state;

    let categoryName;
    if (categoryData && categoryData.length >= 1) {
      categoryName = categoryData && categoryData.filter((data) => data.categoryType === categoryType);
    }

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmitData)}>
          <section className={css.bodyForm}>
            <div>
              <FormControl className={classes.field} style={{ width: '100%' }}>
                <InputLabel htmlFor="selection">Select Category Type</InputLabel>
                <Field
                  name="paymentType"
                  component={SelectRedux}
                  placeholder="Select Category Type"
                  onChange={this.handleCategoryType}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Expenditure">EXPENDITURE CATEGORY</MenuItem>
                  <MenuItem value="Income">EXTRA INCOME CATEGORY</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="date"
                label="Date"
                component={DatePickerInput}
                onChange={this.handleDate}
                dateValue={date}
              />
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Select Category Name</InputLabel>
                <Field
                  name="catName"
                  component={SelectRedux}
                  placeholder="Select Category Name"
                >
                  <MenuItem value="">None</MenuItem>
                  {
                    categoryName && categoryName.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.category}</MenuItem>)
                  }
                </Field>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Select Payment Mode</InputLabel>
                <Field
                  name="paymentMethod"
                  component={SelectRedux}
                  placeholder="Add-On-Class - If Any"
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  {
                    paymentMethodData && paymentMethodData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.paymentMethod}</MenuItem>)
                  }
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="amount"
                component={TextFieldRedux}
                placeholder="Amount"
                autoComplete="off"
                label="Amount"
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
                name="description"
                component={TextFieldRedux}
                placeholder="Description"
                autoComplete="off"
                label="Description"
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


const AddExpenseIncomeFormRedux = reduxForm({
  form: 'addExpenseIncomeForm',
  validate,
  enableReinitialize: true
})(AddExpenseIncomeForm);


const AddExpenseIncomeInit = connect(
  state => ({
    initialValues: state.get('expenseIncome').formValues
  })
)(AddExpenseIncomeFormRedux);


export default withStyles(styles)(AddExpenseIncomeInit);
