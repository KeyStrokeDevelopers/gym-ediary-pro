/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import AddExpenseIncomeForm from './AddExpenseIncomeForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './expenseIncome-jss';

class AddExpenseIncome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      files: []
    };
  }

  onDrop = (filesVal) => {
    const { files } = this.state;
    let oldFiles = files;
    const filesLimit = 1;
    oldFiles = oldFiles.concat(filesVal);
    if (oldFiles.length > filesLimit) {
      console.log('Cannot upload more than ' + filesLimit + ' items.');
    } else {
      this.setState({ img: filesVal[0] });
    }
  }

  sendValues = (values) => {
    const { submit } = this.props;
    const { img } = this.state;
    const { avatarInit } = this.props;
    const avatar = img === null ? avatarInit : img;
    setTimeout(() => {
      submit(values, avatar);
      this.setState({ img: null });
    }, 500);
  }

  render() {
    const {
      classes,
      openForm,
      closeForm,
      formValues,
      addExpenseIncome,
      purposeData,
      packageData,
      paymentMethodData,
      isFormReset,
      categoryData,
      edit,
      isLoading,
    } = this.props;
    const { img } = this.state;
    const branch = '';
    return (
      <div>
        <Tooltip title="Add New ExpenseIncome">
          <Fab color="secondary" onClick={() => addExpenseIncome()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm} edit={edit}>
          <AddExpenseIncomeForm
            onSubmit={this.sendValues}
            onDrop={this.onDrop}
            purposeData={purposeData}
            packageData={packageData}
            isFormReset={isFormReset}
            paymentMethodData={paymentMethodData}
            formValues={formValues}
            categoryData={categoryData}
            isLoading={isLoading}
          />
        </FloatingPanel>
      </div>
    );
  }
}

export default withStyles(styles)(AddExpenseIncome);
