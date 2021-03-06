/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import AddSmsForm from './AddSmsForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './contact-jss';

class AddSms extends React.Component {

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
      isFormReset,
      formType,
      smsData,
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
          <AddSmsForm
            onSubmit={this.sendValues}
            isFormReset={isFormReset}
            smsData={smsData}
          />
        </FloatingPanel>
      </div>
    );
  }
}


export default withStyles(styles)(AddSms);
