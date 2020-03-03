/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import AccountForm from './AccountForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './email-jss';

class Account extends React.Component {
  render() {
    const {
      classes,
      open,
      closeForm,
      inputChange,
      staffData,
      paymentMethodData,
      submitData,
      add,
    } = this.props;
    const branch = '';
    return (
      <div>
        <Tooltip title="Pay Salary">
          <Fab color="secondary" onClick={() => add()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel
          openForm={open}
          branch={branch}
          closeForm={closeForm}
          title="Pay Salary"
          extraSize
        >
          <AccountForm
            onSubmit={submitData}
            onDrop={this.onDrop}
            closeForm={closeForm}
            staffData={staffData}
            paymentMethodData={paymentMethodData}
            inputChange={inputChange}
          />
        </FloatingPanel>
      </div>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Account);
