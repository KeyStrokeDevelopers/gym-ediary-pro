/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Info from '@material-ui/icons/Info';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddMemberFrom from '../AddMember/AddMemberForm';
import styles from './jss/cover-jss';

const optionsOpt = [
  'Edit Profile'
];

const ITEM_HEIGHT = 48;

class Cover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      files: [],
      anchorElOpt: null,
      open: null
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

  handleClickOpt = event => {
    this.setState({ anchorElOpt: event.currentTarget });
  };

  handleEditProfile = () => {
    this.setState({ open: true, anchorElOpt: null });
  }

  handleAgree = () => {
    this.setState({ anchorElOpt: null, open: null });
  }

  handleDisagree = () => {
    this.setState({ anchorElOpt: null, open: null });
  }

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  render() {
    const {
      classes,
      avatar,
      name,
      desc,
      coverImg,
    } = this.props;
    const { anchorElOpt, open } = this.state;
    return (
      <div className={classes.cover} style={{ backgroundImage: `url(${coverImg})` }}>
        {/* <div>
          <Dialog
            open={open}
            onClose={this.handleDisagree}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Edit Profile'}
            </DialogTitle>
            <DialogContent>
              <AddMemberFrom
                onSubmit={this.sendValues}
                onDrop={this.onDrop}
                openForm
                addMemberData={[{}]}
                itemSelected={0}
                occupationData={[{}]}
                edit
                type="addMember"
                submit={this.submitAddMemberData}
                avatarInit=""
                isLoading=""
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDisagree} color="primary">
                Submit
              </Button>
              <Button onClick={this.handleAgree} color="primary" autoFocus>
                Reset
              </Button>
            </DialogActions>
          </Dialog>
        </div> */}
        {/* <div className={classes.opt}>
          <IconButton className={classes.button} aria-label="Delete">
            <Info />
          </IconButton>
          <IconButton
            aria-label="More"
            aria-owns={anchorElOpt ? 'long-menu' : null}
            aria-haspopup="true"
            className={classes.button}
            onClick={this.handleClickOpt}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorElOpt}
            open={Boolean(anchorElOpt)}
            onClose={this.handleCloseOpt}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 200,
              },
            }}
          >
            {optionsOpt.map(option => (
              <MenuItem key={option} selected={option === 'Edit Profile'} onClick={this.handleEditProfile}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div> */}
        <div className={classes.content}>
          <Avatar alt={name} src={avatar} className={classes.avatar} />
          <Typography variant="h4" className={classes.name} gutterBottom>
            {name}
            <VerifiedUser className={classes.verified} />
          </Typography>
          <Typography className={classes.subheading} gutterBottom>
            {desc}
          </Typography>
          <Button className={classes.button} size="large" variant="contained" color="secondary">
            Add to Connection
          </Button>
        </div>
      </div>
    );
  }
}

Cover.propTypes = {
  classes: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
};

export default withStyles(styles)(Cover);
