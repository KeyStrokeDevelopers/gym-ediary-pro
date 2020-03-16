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
import { getProductTypeData } from 'dan-actions/productTypeActions';
import { getBrandUnitData } from 'dan-actions/brandUnitActions';
import { getProductData } from 'dan-actions/productActions.js';
import { setInCart } from 'dan-actions/purchaseActions.js';
import styles from './purchase-jss';
import { validate } from '../../../components/Forms/helpers/formValidation';
import { RegularTextFieldRedux, SelectRedux } from '../../../components/Forms/ReduxFormMUI';


class PurchaseForm extends React.Component {
  state = {
    selected_product_type_value: null,
    selectedProduct: null,
    selected_price_format: 'includingGST',
    quantity: 0,
    price: 0,
    discountP: 0
  }

  componentDidMount() {
    const { fetchProductTypeData, fetchProductData, fetchBrandUnitData } = this.props;
    fetchProductTypeData();
    fetchBrandUnitData();
    fetchProductData();
    this.props.initialize({ priceFormat: 'includingGST' });
  }

  selectedProductTypeValue = (e, selected_product_type_value) => {
    this.setState({ selected_product_type_value });
  }

  selectedBrand = (e, selectedProduct) => {
    this.setState({ selectedProduct });
  }

  handleQuantity = (e, quantity) => {
    this.setState({ quantity });
  }

  handlePrice = (e, price) => {
    this.setState({ price });
  }

  handleDiscount = (e, discountP) => {
    this.setState({ discountP });
  }

  selectedPriceFormat = (e, selected_price_format) => {
    this.setState({ selected_price_format });
  }

  handleAddToCart = (data, priceDetails) => {
    const {
      setInCart, productData, productTypeData, reset
    } = this.props;
    const cartItem = {};

    const selectedBrandProduct = (productData && productData.length >= 1) && productData.filter((item) => item._id === data.get('brandProduct'));
    const brandProduct = (selectedBrandProduct && selectedBrandProduct.length >= 1) && `${selectedBrandProduct[0].brand.value}=>${selectedBrandProduct[0].modelNo}`;

    const selectedProductType = (productTypeData && productTypeData.length >= 1) && productTypeData.filter((item) => item._id === data.get('productType'));

    const productType = (selectedProductType && selectedProductType.length >= 1) && `${selectedProductType[0].productType}`;

    cartItem.product = data.get('brandProduct');
    cartItem.productType = data.get('productType');
    cartItem.selectedProductType = productType;
    cartItem.brandProduct = brandProduct;
    cartItem.quantity = data.get('quantity');
    cartItem.priceFormat = data.get('priceFormat');
    cartItem.price = data.get('price');
    cartItem.gst = priceDetails.gst;
    cartItem.costPrice = priceDetails.costPrice;
    cartItem.basicPrice = priceDetails.basicPrice;
    cartItem.gstValue = priceDetails.gstValue;
    cartItem.priceAfterDiscount = priceDetails.priceAfterDiscount;
    cartItem.discountP = priceDetails.discountP;
    cartItem.discount = priceDetails.discount;
    setInCart(cartItem);
    reset();
  }

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      handleSubmit,
      productTypeData,
      productData,
    } = this.props;
    const {
      selected_product_type_value, selectedProduct, selected_price_format, quantity, price, discountP
    } = this.state;
    let selectedData;
    let basic_price = 0;
    let gst_value = 0;
    let gst = 0;
    let discount = 0;
    let cost_price = 0;
    let price_after_discount = 0;

    if (productData && productData.length >= 1) {
      selectedData = productData.filter((item) => item.product._id === selected_product_type_value);
    }
    let measuringUnit;
    if (selectedData && selectedData.length >= 1) {
      measuringUnit = selectedData.filter((item) => item._id === selectedProduct);
    }
    const mUnit = measuringUnit && measuringUnit.length >= 1 ? measuringUnit[0].measuringUnit.value : '';
    const gstLabel = selectedData && selectedData.length >= 1 ? `GST  @ ${selectedData[0].product.gst} %` : 'GST';
    const priceDetails = {};
    if (selectedData && selectedData.length >= 1) {
      gst = selectedData[0].product.gst;
      if (selected_price_format === 'excludingGST') {
        basic_price = quantity * price;
        discount = parseFloat((basic_price * discountP / 100).toFixed(3));
        price_after_discount = parseFloat((basic_price - discount).toFixed(3));
        gst_value = gst * price_after_discount / 100;
        cost_price = gst_value + basic_price - discount;
      } else {
        cost_price = quantity * price;
        gst_value = parseFloat(((cost_price * gst) / (100 + gst)).toFixed(3));
        basic_price = parseFloat((cost_price - gst_value).toFixed(3));
        discount = parseFloat((basic_price * discountP / 100).toFixed(3));
        price_after_discount = parseFloat((basic_price - discount).toFixed(3));
        gst_value = parseFloat((gst * price_after_discount / 100).toFixed(3));
        cost_price = parseFloat((gst_value + basic_price - discount).toFixed(2));
      }
      priceDetails.gst = gst;
      priceDetails.costPrice = cost_price;
      priceDetails.basicPrice = basic_price;
      priceDetails.gstValue = gst_value;
      priceDetails.priceAfterDiscount = price_after_discount;
      priceDetails.discountP = discountP;
      priceDetails.discount = discount;
    }
    return (
      <div>
        <form onSubmit={handleSubmit((data) => this.handleAddToCart(data, priceDetails))}>
          <section>
            <div>
              {(productTypeData && productTypeData.length >= 1)
                && (
                  <FormControl className={classes.field}>
                    <InputLabel htmlFor="selection">Select Product Type</InputLabel>
                    <Field
                      name="productType"
                      component={SelectRedux}
                      required
                      autoComplete="off"
                      placeholder="Select Product Type"
                      onChange={this.selectedProductTypeValue}
                    >
                      {
                        productTypeData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.productType}</MenuItem>)
                      }
                    </Field>
                  </FormControl>
                )
              }
            </div>
            <div>
              {(selectedData && selectedData.length >= 1)
                && (
                  <FormControl className={classes.field}>
                    <InputLabel htmlFor="selection">Select Brand and Product</InputLabel>
                    <Field
                      name="brandProduct"
                      component={SelectRedux}
                      required
                      autoComplete="off"
                      placeholder="Select Brand and Product"
                      onChange={this.selectedBrand}
                    >
                      {
                        selectedData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{`${data.brand.value}=>${data.product.productType}=>${data.product.hsnCode}`}</MenuItem>)
                      }
                    </Field>
                  </FormControl>
                )
              }
            </div>
            <div className={classes.row}>
              <div className={classes.firstCol}>
                <Field
                  name="quantity"
                  placeholder={mUnit ? `Quantity - ${mUnit}` : 'Quantity'}
                  label={mUnit ? `Quantity - ${mUnit}` : 'Quantity'}
                  autoComplete="off"
                  component={RegularTextFieldRedux}
                  onChange={this.handleQuantity}
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
              <div className={classes.secondCol}>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">Price Format</InputLabel>
                  <Field
                    name="priceFormat"
                    component={SelectRedux}
                    required
                    placeholder="Price Format"
                    autoComplete="off"
                    onChange={this.selectedPriceFormat}
                  >
                    <MenuItem value="includingGST">Including GST</MenuItem>
                    <MenuItem value="excludingGST">Excluding GST</MenuItem>
                  </Field>
                </FormControl>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.firstCol}>
                <Field
                  name="price"
                  placeholder="Price"
                  label="Price"
                  component={RegularTextFieldRedux}
                  autoComplete="off"
                  onChange={this.handlePrice}
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
              <div className={classes.secondCol}>
                <Field
                  name="discountFirst"
                  placeholder='Discount % - "If Any"'
                  label='Discount % - "If Any"'
                  autoComplete="off"
                  component={RegularTextFieldRedux}
                  onChange={this.handleDiscount}
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
            </div>
            <div style={{
              backgroundColor: '#2196F3', width: '100%', color: '#ffffff', border: '2px solid #2196F3'
            }}
            >
              <div style={{
                width: '100%', display: 'flex', padding: '10px 20px', backgroundColor: '#ffffff', color: '#000000',
              }}
              >
                <div style={{ width: '80%' }}>
                  Basic Price
                  </div>
                <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
                  <span style={{
                    borderRadius: '10px', padding: '2px 10px', backgroundColor: 'green', color: '#ffffff'
                  }}
                  >
                    {basic_price}
                  </span>
                </div>
              </div>
              {discount > 0
                && (
                  <div style={{
                    width: '100%', display: 'flex', padding: '10px 20px', backgroundColor: '#ffffff', color: '#000000',
                  }}
                  >
                    <div style={{ width: '80%' }}>
                      Discount (Amount:
                                      {' '}
                      {discount}
                      )
                                    </div>
                    <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
                      <span style={{
                        borderRadius: '10px', padding: '2px 10px', backgroundColor: 'green', color: '#ffffff'
                      }}
                      >
                        {price_after_discount}
                      </span>
                    </div>
                  </div>
                )
              }
              <div style={{
                width: '100%', display: 'flex', padding: '10px 20px', backgroundColor: '#ffffff', color: '#000000',
              }}
              >
                <div style={{ width: '80%' }}>
                  {gstLabel}
                </div>
                <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
                  <span style={{
                    borderRadius: '10px', padding: '2px 10px', backgroundColor: 'green', color: '#ffffff'
                  }}
                  >
                    {gst_value}
                  </span>
                </div>
              </div>
              <div style={{ width: '100%', display: 'flex', padding: '10px 20px' }}>
                <div style={{ width: '80%' }}>
                  Cost Price
                  </div>
                <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
                  <span style={{
                    borderRadius: '10px', padding: '2px 10px', backgroundColor: '#ffffff', color: '#2196F3'
                  }}
                  >
                    {cost_price}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <div style={{ display: 'flex', marginTop: '15px' }}>
            <div style={{ alignItems: 'end' }}>
              <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                Add To Cart
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
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const productTypeReducer = state.get('productType');
  const brandUnitReducer = state.get('brandUnit');
  const productReducer = state.get('product');
  return ({
    productTypeData: productTypeReducer.productTypeList,
    initialValues: state.get('purchase').formValues,
    brandUnitData: brandUnitReducer.brandUnitList,
    productData: productReducer.productList,
  });
};

const constDispatchToProps = dispatch => ({
  fetchProductTypeData: () => dispatch(getProductTypeData()),
  fetchBrandUnitData: () => dispatch(getBrandUnitData()),
  fetchProductData: () => dispatch(getProductData()),
  setInCart: (data) => dispatch(setInCart(data))
});


const PurchaseFormRedux = reduxForm({
  form: 'purchaseForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(PurchaseForm);

const PurchaseInit = connect(
  mapStateToProps,
  constDispatchToProps
)(PurchaseFormRedux);


export default withStyles(styles)(PurchaseInit);
