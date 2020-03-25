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
import styles from './productType-jss';
import { validate } from '../Forms/helpers/formValidation';
import { TextFieldRedux, SelectRedux } from '../Forms/ReduxFormMUI';

class ProductTypeForm extends React.Component {

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
      handleSubmit,
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmitData)}>
          <section className={css.bodyForm}>
            <div>
              <Field
                name="productType"
                placeholder="Product Type"
                label="Product Type"
                autoComplete="off"
                component={TextFieldRedux}
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
                name="hsnCode"
                placeholder="Product Type HSN Code"
                label="Product Type HSN Code"
                component={TextFieldRedux}
                autoComplete="off"
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
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">GST %</InputLabel>
                <Field
                  name="gst"
                  component={SelectRedux}
                  placeholder="GST %"
                  onChange={this.selectedValue}
                >
                  <MenuItem value={0}>0.00</MenuItem>
                  <MenuItem value={5}>5.00</MenuItem>
                  <MenuItem value={12}>12.00</MenuItem>
                  <MenuItem value={18}>18.00</MenuItem>
                  <MenuItem value={28}>28.00</MenuItem>
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


const ProductTypeFormRedux = reduxForm({
  form: 'productTypeForm',
  validate,
  enableReinitialize: true
})(ProductTypeForm);


const ProductTypeInit = connect(
  state => ({
    initialValues: state.get('productType').formValues
  })
)(ProductTypeFormRedux);


export default withStyles(styles)(ProductTypeInit);
