/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getCategoryData,
  submitCategoryData,
  addCategoryData,
  closeAction,
  showDetailAction,
  editCategoryData,
  searchCategoryData,
  updateCategoryData,
  deleteCategoryData,
  setDetailField,
  loadingAction,
  hideDetailAction,
  activeCategoryData,
  closeNotifAction
} from 'dan-actions/CategoryActions';
import { AddContact } from 'dan-components';
import StyledNotif from '../../../components/Notification/StyledNotif';
import styles from 'dan-components/Contact/contact-jss';
import CategoryDataList from '../../../components/Contact/CategoryDataList';
import CategoryDetail from '../../../components/Contact/CategoryDetail';

class Category extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  submitCategoryData = (data, avatar) => {
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
      categoryData,
      itemSelected,
      showDetail,
      hideDetail,
      avatarInit,
      open,
      showMobileDetail,
      add,
      edit,
      formValue,
      isActive,
      is_active,
      close,
      remove,
      favorite,
      keyword,
      search,
      messageNotif,
      notifType,
      openNoti,
      closeNotif,
      deleteCategoryData,
      activeCategoryData,
      categoryType,
      isLoading
    } = this.props;
    const isCategoryData = categoryData.length >= 1;
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
          <CategoryDataList
            addFn
            total={categoryData && categoryData.length}
            addCategoryData={add}
            clippedRight
            itemSelected={itemSelected}
            categoryDataList={categoryData}
            isActive={isActive}
            showDetail={showDetail}
            search={search}
            is_active={is_active}
            categoryType={categoryType}
            keyword={keyword}
          />
          <CategoryDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            categoryData={categoryData}
            deleteCategoryData={deleteCategoryData}
            activeCategoryData={activeCategoryData}
            itemSelected={itemSelected}
            edit={edit}
            isActive={is_active}
            categoryType={categoryType}
            remove={remove}
            favorite={favorite}
          />
        </div>
        <AddContact
          addContact={add}
          openForm={open}
          formType="category"
          edit={(Object.keys(formValue).length >= 1)}
          closeForm={close}
          submit={this.submitCategoryData}
          avatarInit={avatarInit}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const categoryReducer = state.get('category');
  return ({

    // force: state, // force state from reducer
    avatarInit: categoryReducer.avatarInit,
    categoryData: categoryReducer.categoryList,
    itemSelected: categoryReducer.selectedIndex,
    keyword: categoryReducer.keywordValue,
    open: categoryReducer.openFrm,
    showMobileDetail: categoryReducer.showMobileDetail,
    messageNotif: categoryReducer.notifMsg,
    notifType: categoryReducer.notifType,
    openNoti: categoryReducer.openNoti,
    formValue: categoryReducer.formValues,
    is_active: categoryReducer.isActive,
    categoryType: categoryReducer.categoryType,
    isLoading: categoryReducer.isLoading
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitCategoryData(data)),
  updateData: (data) => dispatch(updateCategoryData(data)),
  fetchData: () => dispatch(getCategoryData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editCategoryData(data)),
  add: () => dispatch(addCategoryData()),
  close: () => dispatch(closeAction()),
  deleteCategoryData: (data) => dispatch(deleteCategoryData(data)),
  activeCategoryData: (data) => dispatch(activeCategoryData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchCategoryData(data)),
  loading: () => dispatch(loadingAction()),
  closeNotif: () => dispatch(closeNotifAction()),
});

const CategoryMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Category);

export default withStyles(styles)(CategoryMapped);
