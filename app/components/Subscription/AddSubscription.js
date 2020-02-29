/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import FloatingPanel from '../Panel/FloatingPanel';
import AddSubscriptionForm from './AddSubscriptionForm';
import styles from './contact-jss';

class AddSubscription extends React.Component {
  sendValues = (values) => {
    const { submit } = this.props;
    submit(values);
  }

  render() {
    const {
      classes,
      openForm,
      closeForm,
      addContact,
      formType,
      edit
    } = this.props;
    const branch = '';
    return (
      <div>
        <Tooltip title={`Add new ${formType}`}>
          <Fab color="secondary" onClick={() => addContact()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm} edit={edit}>
          <AddSubscriptionForm
            onSubmit={this.sendValues}
          />
        </FloatingPanel>
      </div>
    );
  }
}


export default withStyles(styles)(AddSubscription);
