/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import MediaForm from './MediaForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './email-jss';

class Media extends React.Component {
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
    const { submitData } = this.props;
    const { img } = this.state;
    const { avatarInit } = this.props;
    const avatar = img === null ? avatarInit : img;
    setTimeout(() => {
      submitData(values, avatar);
      this.setState({ img: null });
    }, 500);
  }

  render() {
    const {
      classes,
      open,
      closeForm,
      avatarInit,
      inputChange,
      memberData,
      add,
      compose
    } = this.props;
    const { img } = this.state;
    const branch = '';
    return (
      <div>
        <Tooltip title="Add Media">
          <Fab color="secondary" onClick={() => add()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel
          openForm={open}
          branch={branch}
          closeForm={closeForm}
          title="Add Media"
          extraSize
        >
          <MediaForm
            onSubmit={this.sendValues}
            onDrop={this.onDrop}
            closeForm={closeForm}
            memberData={memberData}
            onDeleteImage={this.handleDeleteImage}
            imgAvatar={img === null ? avatarInit : img}
            inputChange={inputChange}
          />
        </FloatingPanel>
      </div>
    );
  }
}

Media.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Media);
