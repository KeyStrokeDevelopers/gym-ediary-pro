/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getProductData,
  submitProductData,
  closeAction,
  showDetailAction,
  editProductData,
  searchProductData,
  updateProductData,
  deleteProductData,
  setDetailField,
  loadingAction,
  hideDetailAction,
  setFilterValue,
  addProductData,
  closeNotifAction
} from 'dan-actions/productActions';
import { getProductTypeData } from 'dan-actions/productTypeActions';
import { getBrandUnitData } from 'dan-actions/brandUnitActions';
import styles from 'dan-components/Contact/contact-jss';
import StyledNotif from '../../../components/Notification/StyledNotif';
import Product from '../../../components/ProductShoping/Product';
import ProductDataList from '../../../components/ProductShoping/ProductDataList';
import ProductDetail from '../../../components/ProductShoping/ProductDetails';

class Member extends React.Component {
  componentDidMount() {
    const { fetchData, fetchBrandUnitData, fetchProductTypeData } = this.props;
    fetchData();
    fetchBrandUnitData();
    fetchProductTypeData();
  }

  submitProductData = (data) => {
    const {
      submitData, formValue, updateData, loading
    } = this.props;
    if (Object.keys(formValue).length >= 1) {
      updateData(data);
    } else {
      loading();
      submitData(data);
    }
  }

  render() {
    const title = brand.name + ' - Contact';
    const description = brand.desc;
    const {
      classes,
      productData,
      productTypeData,
      brandUnitData,
      itemSelected,
      showDetail,
      hideDetail,
      avatarInit,
      open,
      showMobileDetail,
      add,
      edit,
      isActive,
      formValue,
      filterValue,
      filter_value,
      is_active,
      close,
      remove,
      favorite,
      showDetails,
      keyword,
      search,
      messageNotif,
      notifType,
      openNoti,
      closeNotif,
      deleteProductData,
      isLoading
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <StyledNotif close={() => closeNotif()} openNoti={openNoti} message={messageNotif} notifType={notifType} />
        <div className={classes.root}>
          <ProductDataList
            addFn
            total={productData && productData.length}
            addProductData={add}
            filterValue={filterValue}
            clippedRight
            itemSelected={itemSelected}
            productData={productData}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            is_active={is_active}
            keyword={keyword}
          />
          <ProductDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            productData={productData}
            deleteProductData={deleteProductData}
            itemSelected={itemSelected}
            showDetails={showDetails}
            filterValue={filter_value}
            edit={edit}
            isActive={is_active}
            remove={remove}
            favorite={favorite}
          />
        </div>
        <Product
          product={add}
          openForm={open}
          closeForm={close}
          productTypeData={productTypeData}
          brandUnitData={brandUnitData}
          productData={productData}
          submit={this.submitProductData}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const productReducer = state.get('product');
  const productTypeReducer = state.get('productType');
  const brandUnitReducer = state.get('brandUnit');
  return ({
    // force: state, // force state from reducer
    avatarInit: productReducer.avatarInit,
    productData: productReducer.productList,
    itemSelected: productReducer.selectedIndex,
    keyword: productReducer.keywordValue,
    open: productReducer.openFrm,
    showMobileDetail: productReducer.showMobileDetail,
    messageNotif: productReducer.notifMsg,
    notifType: productReducer.notifType,
    openNoti: productReducer.openNoti,
    formValue: productReducer.formValues,
    occupationData: productReducer.occupation,
    is_active: productReducer.isActive,
    isLoading: productReducer.isLoading,
    showDetails: productReducer.showDetails,
    filter_value: productReducer.filterValue,
    productTypeData: productTypeReducer.productTypeList,
    brandUnitData: brandUnitReducer.brandUnitList
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitProductData(data)),
  updateData: (data) => dispatch(updateProductData(data)),
  fetchData: () => dispatch(getProductData()),
  fetchBrandUnitData: () => dispatch(getBrandUnitData()),
  fetchProductTypeData: () => dispatch(getProductTypeData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editProductData(data)),
  add: () => dispatch(addProductData()),
  close: () => dispatch(closeAction()),
  deleteProductData: (data) => dispatch(deleteProductData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchProductData(data)),
  loading: () => dispatch(loadingAction()),
  filterValue: (value) => dispatch(setFilterValue(value)),
  closeNotif: () => dispatch(closeNotifAction()),
});

const ProductMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Member);

export default withStyles(styles)(ProductMapped);
