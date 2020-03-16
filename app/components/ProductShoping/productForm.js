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
import styles from './product-jss';
import { validate } from '../Forms/helpers/formValidation';
import { RegularTextFieldRedux, SelectRedux } from '../Forms/ReduxFormMUI';

class ProductForm extends React.Component {
  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      productTypeData,
      brandUnitData,
      handleSubmit,
    } = this.props;
    const brandData = (brandUnitData && brandUnitData.length >= 1) ? brandUnitData.filter((item) => item.entryType === 'Brand' && item.status === 1) : '';
    const measuringUnit = (brandUnitData && brandUnitData.length >= 1) ? brandUnitData.filter((item) => item.entryType === 'Unit' && item.status === 1) : '';

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Select Product Type</InputLabel>
                <Field
                  name="product"
                  component={SelectRedux}
                  required
                  autoComplete="off"
                  placeholder="Select Product Type"
                  onChange={this.selectedValue}
                >
                  {
                    (productTypeData && productTypeData.length >= 1) && productTypeData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.productType}</MenuItem>)
                  }
                </Field>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Select Brand Name</InputLabel>
                <Field
                  name="brand"
                  component={SelectRedux}
                  required
                  placeholder="Select Brand Name"
                  autoComplete="off"
                  onChange={this.selectedValue}
                >
                  {
                    brandData && brandData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.value}</MenuItem>)
                  }
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="model"
                placeholder="Product Name"
                label="Product Name"
                component={RegularTextFieldRedux}
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
              <Field
                name="modelNo"
                placeholder='Product Code e.g. "SM-N950, 1701MT"'
                label='Product Code e.g. "SM-N950, 1701MT"'
                autoComplete="off"
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
                name="minimumQty"
                placeholder='MINIMUM QTY (Notify) e.g. "10"'
                label='MINIMUM QTY (Notify) e.g. "10"'
                autoComplete="off"
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
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Select Measuring Unit</InputLabel>
                <Field
                  name="measuringUnit"
                  component={SelectRedux}
                  required
                  placeholder="Select Measuring Unit"
                  autoComplete="off"
                  onChange={this.selectedValue}
                >
                  {
                    measuringUnit && measuringUnit.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.value}</MenuItem>)
                  }
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="costPrice"
                placeholder='COST PRICE e.g. "23500"'
                label='COST PRICE e.g. "23500"'
                autoComplete="off"
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
                name="sellingPrice"
                placeholder='MINIMUM SELLING PRICE e.g. "23700"'
                label='MINIMUM SELLING PRICE e.g. "23700"'
                component={RegularTextFieldRedux}
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


const ProductFormRedux = reduxForm({
  form: 'productForm',
  validate,
  enableReinitialize: true
})(ProductForm);


const ProductInit = connect(
  state => ({
    initialValues: state.get('product').formValues
  })
)(ProductFormRedux);


export default withStyles(styles)(ProductInit);
