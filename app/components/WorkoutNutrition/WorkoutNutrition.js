/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import WorkoutNutritionForm from './WorkoutNutritionForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './email-jss';

class WorkoutNutrition extends React.Component {
  render() {
    const {
      classes,
      open,
      closeForm,
      submitData,
      inputChange,
      isFormReset,
      memberData,
      purposeData,
      initFormValueForEdit,
      workoutNutritionData,
      add
    } = this.props;
    const branch = '';
    return (
      <div>
        <Tooltip title="Add WorkoutNutrition">
          <Fab color="secondary" onClick={() => add()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel
          openForm={open}
          branch={branch}
          closeForm={closeForm}
          title="Add WorkoutNutrition"
          extraSize
        >
          <WorkoutNutritionForm
            onSubmit={submitData}
            closeForm={closeForm}
            purposeData={purposeData}
            isFormReset={isFormReset}
            initFormValueForEdit={initFormValueForEdit}
            workoutNutritionData={workoutNutritionData}
            memberData={memberData}
            inputChange={inputChange}
          />
        </FloatingPanel>
      </div>
    );
  }
}

WorkoutNutrition.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(WorkoutNutrition);
