/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import ProductTypeForm from './productTypeForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './productType-jss';

class ProductType extends React.Component {
  sendValues = (values) => {
    const { submit } = this.props;
    submit(values);
  }

  render() {
    const {
      classes,
      openForm,
      closeForm,
      productType,
      productTypeData,
      edit,
      isLoading,
    } = this.props;
    const branch = '';
    return (
      <div>
        <Tooltip title="Add Product Type">
          <Fab color="secondary" onClick={() => productType()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm} edit={edit}>
          <ProductTypeForm
            onSubmit={this.sendValues}
            edit={edit}
            productTypeData={productTypeData}
            isLoading={isLoading}
          />
        </FloatingPanel>
      </div>
    );
  }
}


export default withStyles(styles)(ProductType);
