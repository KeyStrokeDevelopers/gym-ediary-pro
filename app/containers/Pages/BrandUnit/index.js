/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getBrandUnitData,
  submitBrandUnitData,
  closeAction,
  showDetailAction,
  editBrandUnitData,
  searchBrandUnitData,
  updateBrandUnitData,
  deleteBrandUnitData,
  addBrandUnitData,
  setDetailField,
  loadingAction,
  hideDetailAction,
  setFilterValue,
} from 'dan-actions/brandUnitActions';
import styles from 'dan-components/Contact/contact-jss';
import { Notification } from 'dan-components';
import BrandUnit from '../../../components/BrandUnit/brandUnit';
import BrandUnitDataList from '../../../components/BrandUnit/brandUnitDataList';
import BrandUnitDetail from '../../../components/BrandUnit/brandUnitDetails';

class BrandUnitMain extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  submitBrandUnitData = (data) => {
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
      closeNotif,
      messageNotif,
      deleteBrandUnitData,
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
        <Notification close={() => closeNotif()} message={messageNotif} />
        <div className={classes.root}>
          <BrandUnitDataList
            addFn
            total={brandUnitData && brandUnitData.length}
            addBrandUnitData={add}
            filterValue={filterValue}
            clippedRight
            itemSelected={itemSelected}
            brandUnitData={brandUnitData}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            is_active={is_active}
            keyword={keyword}
          />
          <BrandUnitDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            brandUnitData={brandUnitData}
            deleteBrandUnitData={deleteBrandUnitData}
            itemSelected={itemSelected}
            showDetails={showDetails}
            filterValue={filter_value}
            edit={edit}
            isActive={is_active}
            remove={remove}
            favorite={favorite}
          />
        </div>
        <BrandUnit
          brandUnit={add}
          openForm={open}
          closeForm={close}
          brandUnitData={brandUnitData}
          submit={this.submitBrandUnitData}
          isLoading={isLoading}
        />
      </div>
    );
  }
}


const mapStateToProps = state => {
  const brandUnitReducer = state.get('brandUnit');
  return ({
    // force: state, // force state from reducer
    avatarInit: brandUnitReducer.avatarInit,
    brandUnitData: brandUnitReducer.brandUnitList,
    itemSelected: brandUnitReducer.selectedIndex,
    keyword: brandUnitReducer.keywordValue,
    open: brandUnitReducer.openFrm,
    showMobileDetail: brandUnitReducer.showMobileDetail,
    messageNotif: brandUnitReducer.notifMsg,
    formValue: brandUnitReducer.formValues,
    is_active: brandUnitReducer.isActive,
    isLoading: brandUnitReducer.isLoading,
    showDetails: brandUnitReducer.showDetails,
    filter_value: brandUnitReducer.filterValue,
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitBrandUnitData(data)),
  updateData: (data) => dispatch(updateBrandUnitData(data)),
  fetchData: () => dispatch(getBrandUnitData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editBrandUnitData(data)),
  add: () => dispatch(addBrandUnitData()),
  close: () => dispatch(closeAction()),
  deleteBrandUnitData: (data) => dispatch(deleteBrandUnitData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchBrandUnitData(data)),
  loading: () => dispatch(loadingAction()),
  filterValue: (value) => dispatch(setFilterValue(value))
  // closeNotif: () => dispatch(closeNotifAction),
});

const BrandUnitMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(BrandUnitMain);

export default withStyles(styles)(BrandUnitMapped);