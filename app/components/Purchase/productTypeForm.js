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
import { RegularTextFieldRedux, SelectRedux } from '../Forms/ReduxFormMUI';

class ProductTypeForm extends React.Component {
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
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Product Type</InputLabel>
                <Field
                  name="productType"
                  component={SelectRedux}
                  required
                  placeholder="Product Type"
                  onChange={this.selectedValue}
                >
                  <MenuItem value="headPhone">Head Phone</MenuItem>
                  <MenuItem value="camera">Camera</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="quantity"
                placeholder="Quantity"
                label="Quantity"
                component={RegularTextFieldRedux}
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
                name="price"
                placeholder="Price"
                label="Price"
                component={RegularTextFieldRedux}
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
            <Button variant="contained" color="secondary" size="large" type="submit" disabled={submitting}>
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
