/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  getWorkoutNutritionData,
  submitWorkoutNutritionData,
  addWorkoutNutritionData,
  closeAction,
  showDetailAction,
  editWorkoutNutritionData,
  searchWorkoutNutritionData,
  updateWorkoutNutritionData,
  deleteWorkoutNutritionData,
  setDetailField,
  loadingAction,
  hideDetailAction
} from 'dan-actions/workoutNutritionActions';
import { Notification } from 'dan-components';
import styles from 'dan-components/Contact/contact-jss';
import { getPurposeData } from '../../../actions/purposeActions';
import WorkoutNutritionList from '../../../components/WorkoutNutrition/WorkoutNutritionList';
import WorkoutNutritionHeader from '../../../components/WorkoutNutrition/WorkoutNutritionProfileHeader';
import WorkoutNutrition from '../../../components/WorkoutNutrition/WorkoutNutrition';

class WorkoutNutritionProfile extends React.Component {
  state = {
    mobileOpen: false,
  };

  componentDidMount() {
    const { fetchData, fetchPurposeData } = this.props;
    fetchData();
    fetchPurposeData();
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleReply = () => {
    const { compose } = this.props;
    compose();
  }

  submitWorkoutNutritionData = (data) => {
    const {
      submitData, formValues, updateData, loading
    } = this.props;
    if (Object.keys(formValues).length >= 1) {
      updateData(data);
    } else {
      loading();
      submitData(data);
    }
    // const avatarBase64 = typeof avatar === 'object' ? URL.createObjectURL(avatar) : avatar;
    // const avatarPreview = avatar !== null ? avatarBase64 : dummy.user.avatar;
  }

  render() {
    const title = brand.name + ' - WorkoutNutrition';
    const description = brand.desc;
    const {
      classes,
      workoutNutritionData,
      emailData,
      openMail,
      moveTo,
      toggleStar,
      currentPage,
      memberData,
      purposeData,
      open,
      add,
      edit,
      close,
      remove,
      keyword,
      search,
      formValues,
      closeNotif,
      messageNotif,
      deleteWorkoutNutrition
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
          <WorkoutNutritionHeader search={search} handleDrawerToggle={this.handleDrawerToggle} />
          <WorkoutNutritionList
            emailData={emailData}
            openMail={openMail}
            filterPage={currentPage}
            workoutNutritionData={workoutNutritionData}
            deleteWorkoutNutritionData={deleteWorkoutNutrition}
            edit={edit}
            keyword={keyword}
            moveTo={moveTo}
            remove={remove}
            toggleStar={toggleStar}
            reply={this.handleReply}
          />
          <WorkoutNutrition
            submitData={this.submitWorkoutNutritionData}
            workoutNutritionData={workoutNutritionData}
            memberData={memberData}
            purposeData={purposeData}
            initFormValueForEdit={formValues}
            open={open}
            add={add}
            closeForm={close}
          />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const workoutNutritionReducer = state.get('workoutNutrition');
  return ({

    // force: state, // force state from reducer
    avatarInit: workoutNutritionReducer.avatarInit,
    workoutNutritionData: workoutNutritionReducer.workoutNutritionList,
    accessData: workoutNutritionReducer.accessList,
    itemSelected: workoutNutritionReducer.selectedIndex,
    keyword: workoutNutritionReducer.keywordValue,
    open: workoutNutritionReducer.openFrm,
    showMobileDetail: workoutNutritionReducer.showMobileDetail,
    messageNotif: workoutNutritionReducer.notifMsg,
    formValues: workoutNutritionReducer.formValues,
    is_active: workoutNutritionReducer.isActive,
    isLoading: workoutNutritionReducer.isLoading,
    memberData: state.get('addMember').viewProfileData,
    purposeData: state.get('purpose').purposeList
  });
};

const constDispatchToProps = dispatch => ({
  submitData: (data) => dispatch(submitWorkoutNutritionData(data)),
  updateData: (data) => dispatch(updateWorkoutNutritionData(data)),
  fetchData: () => dispatch(getWorkoutNutritionData()),
  fetchPurposeData: () => dispatch(getPurposeData()),
  showDetail: (data) => dispatch(showDetailAction(data)),
  hideDetail: () => dispatch(hideDetailAction()),
  edit: (data) => dispatch(editWorkoutNutritionData(data)),
  add: () => dispatch(addWorkoutNutritionData()),
  close: () => dispatch(closeAction()),
  deleteWorkoutNutrition: (data) => dispatch(deleteWorkoutNutritionData(data)),
  // remove: bindActionCreators(removeAction, dispatch),
  // favorite: bindActionCreators(addToFavoriteAction, dispatch),
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchWorkoutNutritionData(data)),
  loading: () => dispatch(loadingAction())
  // closeNotif: () => dispatch(closeNotifAction),
});

const WorkoutNutritionMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(WorkoutNutritionProfile);

export default withStyles(styles)(WorkoutNutritionMapped);
