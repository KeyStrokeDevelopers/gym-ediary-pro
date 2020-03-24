/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import AddEnquiryForm from './AddEnquiryForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './enquiry-jss';

class AddEnquiry extends React.Component {
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
      avatarInit,
      addEnquiry,
      purposeData,
      packageData,
      classData,
      edit,
      isLoading,
      formValues
    } = this.props;
    const { img } = this.state;
    const branch = '';
    return (
      <div>
        <Tooltip title="Add New Enquiry">
          <Fab color="secondary" onClick={() => addEnquiry()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm} edit={edit}>
          <AddEnquiryForm
            onSubmit={this.sendValues}
            onDrop={this.onDrop}
            purposeData={purposeData}
            packageData={packageData}
            formValues={formValues}
            classData={classData}
            imgAvatar={img === null ? avatarInit : img}
            isLoading={isLoading}
          />
        </FloatingPanel>
      </div>
    );
  }
}


export default withStyles(styles)(AddEnquiry);
