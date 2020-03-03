/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import AddMemberForm from './AddMemberForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from '../Common/style';

class AddMember extends React.Component {
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

  handleDeleteImage = () => {
    const { img, files } = this.state;
    this.setState({ files: [], img: null });
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
      addMember,
      purposeData,
      packageData,
      addMemberData,
      occupationData,
      paymentMethodData,
      itemSelected,
      enquiryData,
      edit,
      gymInfoData,
      isLoading,
    } = this.props;
    const { img } = this.state;
    const branch = '';
    return (
      <div>
        <Tooltip title="Add New Member">
          <Fab color="secondary" onClick={() => addMember()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm} edit={edit}>
          <AddMemberForm
            onSubmit={this.sendValues}
            onDrop={this.onDrop}
            purposeData={purposeData}
            packageData={packageData}
            occupationData={occupationData}
            paymentMethodData={paymentMethodData}
            gymInfoData={gymInfoData}
            itemSelected={itemSelected}
            onDeleteImage={this.handleDeleteImage}
            enquiryData={enquiryData}
            edit={edit}
            addMemberData={addMemberData}
            imgAvatar={img === null ? avatarInit : img}
            isLoading={isLoading}
          />
        </FloatingPanel>
      </div>
    );
  }
}

export default withStyles(styles)(AddMember);
