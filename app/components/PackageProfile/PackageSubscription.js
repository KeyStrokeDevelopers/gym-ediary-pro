/* eslint-disable */
import React from 'react';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import PackageSubscriptionForm from './PackageSubscriptionForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './email-jss';

class PackageSubscription extends React.Component {
  render() {
    const {
      classes,
      open,
      closeForm,
      availablePackageData,
      paymentMethodData,
      inputChange,
      memberData,
      submitData,
      add
    } = this.props;
    const branch = '';
    return (
      <div>
        <Tooltip title="Subscription Package">
          <Fab color="secondary" onClick={() => add()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel
          openForm={open}
          branch={branch}
          closeForm={closeForm}
          title="Subscription Package"
          extraSize
        >
          <PackageSubscriptionForm
            availablePackageData={availablePackageData}
            paymentMethodData={paymentMethodData}
            open={open}
            onSubmit={submitData}
            memberData={memberData}
            closeForm={closeForm}
            inputChange={inputChange}
          />
        </FloatingPanel>
      </div>
    );
  }
}


export default withStyles(styles)(PackageSubscription);
