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
  hideDetailAction
} from 'dan-actions/CategoryActions';
import { Notification } from 'dan-components';
import styles from 'dan-components/Contact/contact-jss';
import CategoryDataList from '../../../components/Subscription/CategoryDataList';
import CategoryDetail from '../../../components/Subscription/CategoryDetail';
import AddSubscription from '../../../components/Subscription/AddSubscription';

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
    // const avatarBase64 = typeof avatar === 'object' ? URL.createObjectURL(avatar) : avatar;
    // const avatarPreview = avatar !== null ? avatarBase64 : dummy.user.avatar;
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
      closeNotif,
      messageNotif,
      deleteCategoryData,
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
            keyword={keyword}
          />
          <CategoryDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            categoryData={categoryData}
            deleteCategoryData={deleteCategoryData}
            itemSelected={itemSelected}
            edit={edit}
            isActive={is_active}
            remove={remove}
            favorite={favorite}
          />
        </div>
        <AddSubscription
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
    formValue: categoryReducer.formValues,
    is_active: categoryReducer.isActive,
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
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchCategoryData(data)),
  loading: () => dispatch(loadingAction())
  // closeNotif: () => dispatch(closeNotifAction),
});

const CategoryMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Category);

export default withStyles(styles)(CategoryMapped);
