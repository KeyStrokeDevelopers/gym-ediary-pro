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
import { getProductData, fetchProductQuantity } from 'dan-actions/productActions.js';
import { setInCart } from 'dan-actions/saleActions.js';
import { RegularTextFieldRedux, SelectRedux } from '../../../components/Forms/ReduxFormMUI';
import { validate, number } from '../../../components/Forms/helpers/formValidation';
import styles from './sale-jss';


class SaleForm extends React.Component {
  state = {
    selected_Product_Type_Value: null,
    selectedProduct: null,
    selected_Price_Format: 'includingGST',
    quantity: 0,
    price: 0,
    discountP: 0,
    temp: null
  }

  componentDidMount() {
    const { fetch_Product_Type_Data, fetch_Product_Data, fetch_Brand_Unit_Data } = this.props;
    fetch_Product_Type_Data();
    fetch_Brand_Unit_Data();
    fetch_Product_Data();
    this.props.initialize({ priceFormat: 'includingGST' });
  }

  selectedProductTypeValue = (e, selected_Product_Type_Value) => {
    this.setState({ selected_Product_Type_Value });
  }

  selectedBrand = (e, selectedProduct) => {
    const { fetch_Product_Quantity } = this.props;
    this.setState({ selectedProduct, temp: e });
    fetch_Product_Quantity(selectedProduct);
  }

  handleQuantity = (e, quantity) => {
    this.setState({ quantity, temp: e });
  }

  handlePrice = (e, price) => {
    this.setState({ price, temp: e });
  }

  handleDiscount = (e, discountP) => {
    this.setState({ discountP, temp: e });
  }

  selectedPriceFormat = (e, selected_Price_Format) => {
    this.setState({ selected_Price_Format, temp: e });
  }

  checkProductQuantity = () => {
    const { productQuantity, cartList } = this.props;
    const { quantity, selectedProduct } = this.state;
    let cartQuantity = 0;
    cartList.map((item) => {
      if (item.product === selectedProduct) {
        cartQuantity += item.quantity;
      }
    });
    const availableStock = productQuantity - cartQuantity;
    if (quantity > availableStock) {
      return `Quantity > availableStock [Only ${availableStock} product in stock]`;
    }
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
      selected_Product_Type_Value, selectedProduct, selected_Price_Format, quantity, price, discountP
    } = this.state;
    let selectedData;
    let basic_Price = 0;
    let gst_Value = 0;
    let gst = 0;
    let discount = 0;
    let cost_Price = 0;
    let price_After_Discount = 0;

    if (productData && productData.length >= 1) {
      selectedData = productData.filter((item) => item.product._id === selected_Product_Type_Value);
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
      if (selected_Price_Format === 'excludingGST') {
        basic_Price = quantity * price;
        discount = parseFloat((basic_Price * discountP / 100).toFixed(3));
        price_After_Discount = parseFloat((basic_Price - discount).toFixed(3));
        gst_Value = gst * price_After_Discount / 100;
        cost_Price = gst_Value + basic_Price - discount;
      } else {
        cost_Price = quantity * price;
        gst_Value = parseFloat(((cost_Price * gst) / (100 + gst)).toFixed(3));
        basic_Price = parseFloat((cost_Price - gst_Value).toFixed(3));
        discount = parseFloat((basic_Price * discountP / 100).toFixed(3));
        price_After_Discount = parseFloat((basic_Price - discount).toFixed(3));
        gst_Value = parseFloat((gst * price_After_Discount / 100).toFixed(3));
        cost_Price = parseFloat((gst_Value + basic_Price - discount).toFixed(2));
      }
      priceDetails.gst = gst;
      priceDetails.costPrice = cost_Price;
      priceDetails.basicPrice = basic_Price;
      priceDetails.gstValue = gst_Value;
      priceDetails.priceAfterDiscount = price_After_Discount;
      priceDetails.discountP = discountP;
      priceDetails.discount = discount;
    }

    return (
      <div>
        <form onSubmit={handleSubmit((data) => this.handleAddToCart(data, priceDetails))}>
          <section >
            <div>
              {(productTypeData && productTypeData.length >= 1)
                && (
                  <FormControl className={classes.field}>
                    <InputLabel htmlFor="selection">Select Product Type</InputLabel>
                    <Field
                      name="productType"
                      component={SelectRedux}
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
                      autoComplete="off"
                      placeholder="Select Brand and Product"
                      onChange={this.selectedBrand}
                    >
                      {
                        selectedData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{`${data.brand.value}=>${data.model}=>${data.product.hsnCode}=>${data.quantity}`}</MenuItem>)
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
                  validate={this.checkProductQuantity}
                  validate={number}
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
                  validate={number}
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
                  validate={number}
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
                    {basic_Price}
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
                        {price_After_Discount}
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
                    {gst_Value}
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
                    {cost_Price}
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
      </div >
    );
  }
}

const mapStateToProps = state => {
  const productTypeReducer = state.get('productType');
  const brandUnitReducer = state.get('brandUnit');
  const productReducer = state.get('product');
  const saleReducer = state.get('sale');
  return ({
    productTypeData: productTypeReducer.productTypeList,
    initialValues: state.get('purchase').formValues,
    brandUnitData: brandUnitReducer.brandUnitList,
    productData: productReducer.productList,
    productQuantity: productReducer.productQuantity,
    cartList: saleReducer.cartList,
  });
};

const constDispatchToProps = dispatch => ({
  fetch_Product_Type_Data: () => dispatch(getProductTypeData()),
  fetch_Brand_Unit_Data: () => dispatch(getBrandUnitData()),
  fetch_Product_Data: () => dispatch(getProductData()),
  setInCart: (data) => dispatch(setInCart(data)),
  fetch_Product_Quantity: (productId) => dispatch(fetchProductQuantity(productId))
});


const SaleFormRedux = reduxForm({
  form: 'saleForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(SaleForm);

const PurchaseInit = connect(
  mapStateToProps,
  constDispatchToProps
)(SaleFormRedux);


export default withStyles(styles)(PurchaseInit);
