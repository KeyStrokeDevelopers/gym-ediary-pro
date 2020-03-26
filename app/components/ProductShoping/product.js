/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import ProductForm from './productForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './product-jss';

class Product extends React.Component {
  render() {
    const {
      classes,
      openForm,
      closeForm,
      product,
      productData,
      productTypeData,
      isFormReset,
      submit,
      brandUnitData,
      edit,
      isLoading,
    } = this.props;
    const branch = '';
    return (
      <div>
        <Tooltip title="Add Product Type">
          <Fab color="secondary" onClick={() => product()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm} edit={edit}>
          <ProductForm
            onSubmit={submit}
            edit={edit}
            productTypeData={productTypeData}
            isFormReset={isFormReset}
            brandUnitData={brandUnitData}
            productData={productData}
            isLoading={isLoading}
          />
        </FloatingPanel>
      </div>
    );
  }
}


export default withStyles(styles)(Product);
