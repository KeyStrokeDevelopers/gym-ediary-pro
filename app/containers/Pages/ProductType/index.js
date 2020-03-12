/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getProductTypeData,
  submitProductTypeData,
  closeAction,
  showDetailAction,
  editProductTypeData,
  searchProductTypeData,
  updateProductTypeData,
  deleteProductTypeData,
  addProductTypeData,
  setDetailField,
  loadingAction,
  hideDetailAction,
  setFilterValue,
  closeNotifAction
} from 'dan-actions/productTypeActions';
import styles from 'dan-components/Contact/contact-jss';
import StyledNotif from '../../../components/Notification/StyledNotif';
import ProductType from '../../../components/ProductType/ProductType';
import ProductTypeDataList from '../../../components/ProductType/ProductTypeDataList';
import ProductTypeDetail from '../../../components/ProductType/ProductTypeDetails';

class Member extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  submitProductTypeData = (data) => {
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
      productTypeData,
      itemSelected,
      showDetail,
      hideDetail,
      open,
      showMobileDetail,
      add,
      edit,
      isActive,
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
      deleteProductTypeData,
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
          <ProductTypeDataList
            addFn
            total={productTypeData && productTypeData.length}
            addProductTypeData={add}
            filterValue={filterValue}
            clippedRight
            itemSelected={itemSelected}
            productTypeData={productTypeData}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            is_active={is_active}
            keyword={keyword}
          />
          <ProductTypeDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            productTypeData={productTypeData}
            deleteProductTypeData={deleteProductTypeData}
            itemSelected={itemSelected}
            showDetails={showDetails}
            filterValue={filter_value}
            edit={edit}
            isActive={is_active}
            remove={remove}
            favorite={favorite}
          />
        </div>
        <ProductType
          productType={add}
          openForm={open}
          closeForm={close}
          productTypeData={productTypeData}
          submit={this.submitProductTypeData}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const productTypeReducer = state.get('productType');
  return ({
    // force: state, // force state from reducer
    avatarInit: productTypeReducer.avatarInit,
    productTypeData: productTypeReducer.productTypeList,
    itemSelected: productTypeReducer.selectedIndex,
    keyword: productTypeReducer.keywordValue,
    open: productTypeReducer.openFrm,
    showMobileDetail: productTypeReducer.showMobileDetail,
    messageNotif: productTypeReducer.notifMsg,
    notifType: productTypeReducer.notifType,
    openNoti: productTypeReducer.openNoti,
    formValue: productTypeReducer.formValues,
    is_active: productTypeReducer.isActive,
    isLoading: productTypeReducer.isLoading,
    showDetails: productTypeReducer.showDetails,
    filter_value: productTypeReducer.filterValue,
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitProductTypeData(data)),
  updateData: (data) => dispatch(updateProductTypeData(data)),
  fetchData: () => dispatch(getProductTypeData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editProductTypeData(data)),
  add: () => dispatch(addProductTypeData()),
  close: () => dispatch(closeAction()),
  deleteProductTypeData: (data) => dispatch(deleteProductTypeData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchProductTypeData(data)),
  loading: () => dispatch(loadingAction()),
  filterValue: (value) => dispatch(setFilterValue(value)),
  closeNotif: () => dispatch(closeNotifAction),
});

const ProductTypeMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Member);

export default withStyles(styles)(ProductTypeMapped);
