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
  hideDetailAction,
  closeNotifAction
} from 'dan-actions/workoutNutritionActions';
import styles from 'dan-components/Contact/contact-jss';
import { getPurposeData } from '../../../actions/purposeActions';
import WorkoutNutritionList from '../../../components/WorkoutNutrition/WorkoutNutritionList';
import WorkoutNutritionHeader from '../../../components/WorkoutNutrition/WorkoutNutritionProfileHeader';
import WorkoutNutrition from '../../../components/WorkoutNutrition/WorkoutNutrition';
import StyledNotif from '../../../components/Notification/StyledNotif';

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
  }

  render() {
    const title = brand.name + ' - WorkoutNutrition';
    const description = brand.desc;
    const {
      classes,
      workoutNutritionData,
      toggleStar,
      currentPage,
      memberData,
      purposeData,
      open,
      add,
      edit,
      close,
      keyword,
      search,
      formValues,
      deleteWorkoutNutrition,
      messageNotif,
      notifType,
      openNoti,
      closeNotif
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
          <WorkoutNutritionHeader search={search} handleDrawerToggle={this.handleDrawerToggle} />
          <WorkoutNutritionList
            filterPage={currentPage}
            workoutNutritionData={workoutNutritionData}
            deleteWorkoutNutritionData={deleteWorkoutNutrition}
            edit={edit}
            keyword={keyword}
            toggleStar={toggleStar}
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
    workoutNutritionData: workoutNutritionReducer.workoutNutritionList,
    accessData: workoutNutritionReducer.accessList,
    itemSelected: workoutNutritionReducer.selectedIndex,
    keyword: workoutNutritionReducer.keywordValue,
    open: workoutNutritionReducer.openFrm,
    showMobileDetail: workoutNutritionReducer.showMobileDetail,
    messageNotif: workoutNutritionReducer.notifMsg,
    notifType: workoutNutritionReducer.notifType,
    openNoti: workoutNutritionReducer.openNoti,
    formValues: workoutNutritionReducer.formValues,
    is_active: workoutNutritionReducer.isActive,
    isLoading: workoutNutritionReducer.isLoading,
    messageNotif: workoutNutritionReducer.notifMsg,
    notifType: workoutNutritionReducer.notifType,
    openNoti: workoutNutritionReducer.openNoti,
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
  isActive: (data) => dispatch(setDetailField(data)),
  search: (data) => dispatch(searchWorkoutNutritionData(data)),
  loading: () => dispatch(loadingAction()),
  closeNotif: () => dispatch(closeNotifAction())
});

const WorkoutNutritionMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(WorkoutNutritionProfile);

export default withStyles(styles)(WorkoutNutritionMapped);
