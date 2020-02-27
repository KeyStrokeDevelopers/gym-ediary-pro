/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import MeasurementForm from './MeasurementForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './email-jss';

class Measurement extends React.Component {
  render() {
    const {
      classes,
      open,
      closeForm,
      submitData,
      inputChange,
      memberData,
      add,
      compose
    } = this.props;
    const branch = '';
    return (
      <div>
        <Tooltip title="Add Measurement">
          <Fab color="secondary" onClick={() => add()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel
          openForm={open}
          branch={branch}
          closeForm={closeForm}
          title="Add Measurement"
          extraSize
        >
          <MeasurementForm
            onSubmit={submitData}
            closeForm={closeForm}
            memberData={memberData}
            inputChange={inputChange}
          />
        </FloatingPanel>
      </div>
    );
  }
}

Measurement.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Measurement);
