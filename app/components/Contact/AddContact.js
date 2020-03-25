/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import AddCategoryForm from './AddCategoryForm';
import AddPackageForm from './AddPackageForm';
import AddPaymentMethodForm from './AddPaymentMethodForm';
import AddPurposeForm from './AddPurposeForm';
import FloatingPanel from '../Panel/FloatingPanel';
import AddStaffForm from './AddStaffForm';
import AddClassForm from './AddClassForm';
import styles from './contact-jss';

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      files: [],
      hitDelete: false
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(filesVal) {
    const { files } = this.state;
    let oldFiles = files;
    const filesLimit = 1;
    oldFiles = oldFiles.concat(filesVal);
    if (oldFiles.length > filesLimit) {
      console.log('Cannot upload more than ' + filesLimit + ' items.');
    } else {
      this.setState({ img: filesVal[0], hitDelete: false });
    }
  } s

  handleDeleteImdage = () => {
    this.setState({ files: [], img: null, hitDelete: true });
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
      avatarInit,
      addContact,
      formType,
      accessData,
      edit,
      copyData,
      itemSelected,
      initFormValue,
      isLoading,
      staffData,
      formTest
    } = this.props;
    const { img, hitDelete } = this.state;
    const branch = '';
    return (
      <div>
        <Tooltip title={`Add new ${formType}`}>
          <Fab color="secondary" onClick={() => addContact()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm} edit={edit}>
          {/* <AddContactForm
            onSubmit={this.sendValues}
            onDrop={this.onDrop}
            imgAvatar={img === null ? avatarInit : img}
            isLoading={isLoading}
          /> */}
          {(formType === 'package')
            && (
              <AddPackageForm
                onSubmit={this.sendValues}
                onDrop={this.onDrop}
                imgAvatar={img === null ? avatarInit : img}
                isLoading={isLoading}
              />
            )
          }
          {(formType === 'category')
            && (
              <AddCategoryForm
                onSubmit={this.sendValues}
                onDrop={this.onDrop}
                isLoading={isLoading}
              />
            )
          }
          {(formType === 'paymentMethod')
            && (
              <AddPaymentMethodForm
                onSubmit={this.sendValues}
                onDrop={this.onDrop}
                imgAvatar={img === null ? avatarInit : img}
                isLoading={isLoading}
              />
            )
          }
          {(formType === 'staff')
            && (
              <AddStaffForm
                onSubmit={this.sendValues}
                onDrop={this.onDrop}
                imgAvatar={img === null && !hitDelete ? avatarInit : img}
                isLoading={isLoading}
                staffData={staffData}
                itemSelected={itemSelected}
                onDeleteImage={this.handleDeleteImdage}
                formValues={initFormValue}
                accessData={accessData}
              />
            )
          }
          {(formType === 'class')
            && (
              <AddClassForm
                onSubmit={this.sendValues}
                onDrop={this.onDrop}
                imgAvatar={img === null ? avatarInit : img}
                isLoading={isLoading}
                staffData={staffData}
                onDeleteImage={this.handleDeleteImdage}
              />
            )
          }
          {(formType === 'purpose')
            && (
              <AddPurposeForm
                onSubmit={this.sendValues}
                onDrop={this.onDrop}
                formTest={formTest}
                initFormValue={initFormValue}
                copyData={copyData}
                imgAvatar={img === null ? avatarInit : img}
                isLoading={isLoading}
              />
            )
          }
        </FloatingPanel>
      </div>
    );
  }
}


export default withStyles(styles)(AddContact);
