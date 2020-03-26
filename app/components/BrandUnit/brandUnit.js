/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import BrandUnitForm from './brandUnitForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './brandUnit-jss';

class BrandUnit extends React.Component {
  render() {
    const {
      classes,
      openForm,
      closeForm,
      submit,
      brandUnit,
      isFormReset,
      brandUnitData,
      edit,
      isLoading,
    } = this.props;
    const branch = '';
    return (
      <div>
        <Tooltip title="Add Product Type">
          <Fab color="secondary" onClick={() => brandUnit()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm} edit={edit}>
          <BrandUnitForm
            onSubmit={submit}
            edit={edit}
            isFormReset={isFormReset}
            brandUnitData={brandUnitData}
            isLoading={isLoading}
          />
        </FloatingPanel>
      </div>
    );
  }
}


export default withStyles(styles)(BrandUnit);
