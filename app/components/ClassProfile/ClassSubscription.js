/* eslint-disable */
import React from 'react';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import ClassSubscriptionForm from './ClassSubscriptionForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './email-jss';

class ClassSubscription extends React.Component {
  render() {
    const {
      classes,
      open,
      closeForm,
      submitData,
      availableClassData,
      paymentMethodData,
      memberData,
      inputChange,
      add
    } = this.props;
    const branch = '';
    return (
      <div>
        <Tooltip title="Subscription Class">
          <Fab color="secondary" onClick={() => add()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel
          openForm={open}
          branch={branch}
          closeForm={closeForm}
          title="Subscription Class"
          extraSize
        >
          <ClassSubscriptionForm
            onSubmit={submitData}
            availableClassData={availableClassData}
            paymentMethodData={paymentMethodData}
            memberData={memberData}
            closeForm={closeForm}
            inputChange={inputChange}
          />
        </FloatingPanel>
      </div>
    );
  }
}

export default withStyles(styles)(ClassSubscription);
