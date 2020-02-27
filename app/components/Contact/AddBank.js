/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import AddBankForm from './AddBankForm';
import AddCategoryForm from './AddCategoryForm';
import AddPackageForm from './AddPackageForm';
import AddPaymentMethodForm from './AddPaymentMethodForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './contact-jss';

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      files: []
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
      avatarInit,
      addContact,
      formType
    } = this.props;
    const { img } = this.state;
    const branch = '';
    return (
      <div>
        <Tooltip title="Add New Contact">
          <Fab color="secondary" onClick={() => addContact()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm}>
          {(formType === 'bank')
            && (
              <AddBankForm
                onSubmit={this.sendValues}
                onDrop={this.onDrop}
                imgAvatar={img === null ? avatarInit : img}
              />
            )
          }
          {(formType === 'package')
            && (
              <AddPackageForm
                onSubmit={this.sendValues}
                onDrop={this.onDrop}
                imgAvatar={img === null ? avatarInit : img}
              />
            )
          }
          {(formType === 'category')
            && (
              <AddCategoryForm
                onSubmit={this.sendValues}
                onDrop={this.onDrop}
                imgAvatar={img === null ? avatarInit : img}
              />
            )
          }
          {(formType === 'paymentMethod')
            && (
              <AddPaymentMethodForm
                onSubmit={this.sendValues}
                onDrop={this.onDrop}
                imgAvatar={img === null ? avatarInit : img}
              />
            )
          }
        </FloatingPanel>
      </div>
    );
  }
}

export default withStyles(styles)(AddContact);
