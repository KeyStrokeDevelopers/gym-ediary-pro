/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GymInfoForm from './gymInfoForm';
import styles from '../../../components/Common/style';

class GymInfoEdit extends React.Component {
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
      avatarInit,
      itemSelected,
      gymInfoData,
      isLoading,
    } = this.props;
    const { img } = this.state;
    console.log('avatarInit--***99****', avatarInit)
    return (
      <div>
        <GymInfoForm
          onSubmit={this.sendValues}
          onDrop={this.onDrop}
          gymInfoData={gymInfoData}
          itemSelected={itemSelected}
          onDeleteImage={this.handleDeleteImage}
          imgAvatar={img === null ? avatarInit : img}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

export default withStyles(styles)(GymInfoEdit);
