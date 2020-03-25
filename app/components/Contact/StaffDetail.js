/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Bookmark from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Work from '@material-ui/icons/Work';
import Divider from '@material-ui/core/Divider';
import AccountBalance from '@material-ui/icons/AccountBalance';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MoodIcon from '@material-ui/icons/Mood';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import InputAdornment from '@material-ui/core/InputAdornment';
import { reduxForm, Field } from 'redux-form/immutable';
import FormControl from '@material-ui/core/FormControl';
import { validate } from '../Forms/helpers/formValidation';
import { RegularTextFieldRedux } from '../Forms/ReduxFormMUI';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { connect } from 'react-redux';
import { SERVER_URL } from '../Common/constant';
import ViewStaffProfile from './ViewStaffProfile';
import styles from './contact-jss';

const optionsOpt = [
  'Block Contact',
  'Delete Contact',
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;

class StaffDetail extends React.Component {
  state = {
    anchorElOpt: null,
    open: null,
    deletedId: null,
    showPassword: false,
    openChangePassword: false,
    changePasswordId: null,
    openProfile: false,
    openActive: null,
    activeId: null

  };

  handleClickOpt = event => {
    this.setState({ anchorElOpt: event.currentTarget });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  deleteContact = (item) => {
    const { remove } = this.props;
    remove(item);
    this.setState({ anchorElOpt: null });
  }

  handleDelete = (dataId) => {
    this.setState({ open: true, deletedId: dataId });
  }

  handleDisagree = () => {
    this.setState({ open: false, deletedId: null });
  }

  handleActive = (dataId) => {
    this.setState({ openActive: true, activeId: dataId });
  }

  handleActiveDisagree = () => {
    this.setState({ openActive: false, activeId: null });
  }

  handleActiveAgree = () => {
    const { activeStaffData } = this.props;
    const { activeId } = this.state;
    activeStaffData(activeId);
    this.setState({ openActive: false });
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleChangePassword = (dataId) => {
    this.setState({ openChangePassword: true, changePasswordId: dataId });
  }

  closeChangePassword = () => {
    this.setState({ openChangePassword: false, changePasswordId: null });
  }

  handleAgree = () => {
    const { deleteStaffData } = this.props;
    const { deletedId } = this.state;
    deleteStaffData(deletedId);
    this.setState({ open: false });
  }

  handleResetPassword = (data) => {
    const { changePassword, reset } = this.props;
    const { changePasswordId } = this.state;
    changePassword(data, changePasswordId);
    this.setState({ openChangePassword: false, changePasswordId: null });
    reset();
  }

  handleViewProfile = () => {
    this.setState({ openProfile: true })
  }

  handleClose = () => {
    this.setState({ openProfile: false })
  }

  sortByName = (a, b) => {
    if (a.staffName < a.staffName) {
      return -1;
    }
    if (a.staffName > a.staffName) {
      return 1;
    }
    return 0;
  }

  render() {
    const {
      classes,
      staffData,
      itemSelected,
      handleSubmit,
      edit,
      showMobileDetail,
      isActive,
      hideDetail,
      logedUser
    } = this.props;
    const {
      anchorElOpt, open, openChangePassword, showPassword, openProfile, openActive
    } = this.state;
    let viewStaffData;
    if (staffData && staffData.length >= 1) {
      viewStaffData = isActive ? staffData.filter(item => item.status === 1) : staffData.filter(item => item.status === 0);
    }
    if (viewStaffData && viewStaffData.length >= 1) {
      viewStaffData.sort(this.sortByName);
    }

    return (
      <>
        {viewStaffData && viewStaffData.length >= 1 ? (
          <main className={classNames(classes.content, showMobileDetail ? classes.detailPopup : '')}>
            <ViewStaffProfile
              open={openProfile}
              close={this.handleClose}
              staffData={viewStaffData[itemSelected]}
            />
            <div>
              <Dialog
                open={open}
                onClose={this.handleDisagree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'Delete Staff Data'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure for deletion ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleDisagree} color="primary">
                    Disagree
                  </Button>
                  <Button onClick={this.handleAgree} color="primary" autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openActive}
                onClose={this.handleActiveDisagree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'Active Staff Data'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure for active ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleActiveDisagree} color="primary">
                    Disagree
                    </Button>
                  <Button onClick={this.handleActiveAgree} color="primary" autoFocus>
                    Agree
                    </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openChangePassword}
                onClose={this.handleDisagree}
                aria-labelledby="alert-dialog-title-password"
                aria-describedby="alert-dialog-description-password"
              >
                <form onSubmit={handleSubmit(this.handleResetPassword)}>
                  <DialogTitle id="alert-dialog-title-password">
                    {'Change Staff Password'}
                  </DialogTitle>
                  <DialogContent>
                    <FormControl className={classes.formControl} style={{ width: '100%' }}>
                      <Field
                        name="staffPassword"
                        component={RegularTextFieldRedux}
                        autoComplete="off"
                        autoComplete="off"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        required
                        className={classes.field}
                      />
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button type="submit" color="primary" autoFocus>
                      Submit
                    </Button>
                    <Button onClick={this.closeChangePassword} type="button" color="primary" autoFocus>
                      Cancel
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>

            </div>
            <section className={classes.cover}>
              <div className={classes.opt}>
                {isActive ? (
                  <>
                    <Tooltip title="View Profile">
                      <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleViewProfile()}>
                        <MoodIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Change Password">
                      <IconButton aria-label="Edit" onClick={() => this.handleChangePassword(viewStaffData[itemSelected]._id)}>
                        <VpnKeyIcon />
                      </IconButton>
                    </Tooltip>
                    {(logedUser._id !== viewStaffData[itemSelected]._id) &&
                      <Tooltip title="Delete">
                        <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleDelete(viewStaffData[itemSelected]._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    }
                    <Tooltip title="Edit Data">
                      <IconButton aria-label="Edit" onClick={() => edit(viewStaffData[itemSelected])}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                    <Tooltip title="Activate Staff Data">
                      <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleActive(viewStaffData[itemSelected]._id)}>
                        <PlaylistAddCheckIcon />
                      </IconButton>
                    </Tooltip>
                  )
                }
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
                  {optionsOpt.map(option => {
                    if (option === 'Delete Contact') {
                      return (
                        <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteContact(viewStaffData[itemSelected])}>
                          {option}
                        </MenuItem>
                      );
                    }
                    return (
                      <MenuItem key={option} selected={option === 'Edit Profile'} onClick={this.handleCloseOpt}>
                        {option}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </div>
              <IconButton
                onClick={hideDetail}
                className={classes.navIconHide}
                aria-label="Back"
              >
                <ArrowBack />
              </IconButton>
              <Hidden xsDown>
                <ListItemAvatar>
                  {viewStaffData[itemSelected].staffImage
                    ? <Avatar alt="" src={`${SERVER_URL}${viewStaffData[itemSelected].staffImage}`} className={classes.avatar} />
                    : (
                      <Avatar className={`${classes.blueIcon} ${classes.avatar}`}>
                        <PermIdentityIcon />
                      </Avatar>
                    )
                  }
                </ListItemAvatar>
                <Typography className={classes.userName} variant="h6">
                  {viewStaffData[itemSelected].staffContact}
                  <Typography display="block" variant="caption">
                    {viewStaffData[itemSelected].staffName}
                  </Typography>
                </Typography>
              </Hidden>
            </section>
            <div>
              <Hidden smUp>
                <div className={classes.avatarTop}>
                  <ListItemAvatar>
                    <Avatar className={`${classes.blueIcon} ${classes.avatar}`}>
                      <AccountBalance />
                    </Avatar>
                  </ListItemAvatar>
                  <Typography variant="h5">
                    {viewStaffData[itemSelected].staffContact}
                    <Typography display="block" variant="caption">
                      {viewStaffData[itemSelected].staffName}
                    </Typography>
                  </Typography>
                </div>
              </Hidden>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.blueIcon}>
                      <Bookmark />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={viewStaffData[itemSelected].staffName} secondary="STAFF NAME" />
                </ListItem>
                <Divider variant="inset" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.blueIcon}>
                      <Bookmark />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={viewStaffData[itemSelected].staffContact} secondary="STAFF CONTACT" />
                </ListItem>
                <Divider variant="inset" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.amberIcon}>
                      <Work />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={viewStaffData[itemSelected].staffEmail} secondary="STAFF EMAIL" />
                </ListItem>
                <Divider variant="inset" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.amberIcon}>
                      <Work />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={viewStaffData[itemSelected].accessLevel.accessLevel} secondary="ACCESS LEVEL" />
                </ListItem>
                <Divider variant="inset" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.amberIcon}>
                      <Work />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={viewStaffData[itemSelected].staffCode} secondary="STAFF CODE" />
                </ListItem>
                {viewStaffData[itemSelected].salaryDate &&
                  <>
                    <Divider variant="inset" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className={classes.amberIcon}>
                          <Work />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={new Date(viewStaffData[itemSelected].salaryDate).toLocaleDateString()} secondary="SALARY DATE" />
                    </ListItem>
                  </>
                }
                {viewStaffData[itemSelected].staffDob &&
                  <>
                    <Divider variant="inset" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className={classes.amberIcon}>
                          <Work />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={new Date(viewStaffData[itemSelected].staffDob).toLocaleDateString()} secondary="STAFF DATE OF BIRTH" />
                    </ListItem>
                  </>
                }
                {viewStaffData[itemSelected].deactiveDate &&
                  <>
                    <Divider variant="inset" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className={classes.amberIcon}>
                          <Work />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={new Date(viewStaffData[itemSelected].deactiveDate).toLocaleDateString()} secondary="DEACTIVE DATE" />
                    </ListItem>
                  </>
                }
                <Divider variant="inset" />

              </List>
            </div>
          </main>
        )
          : (
            <div
              className={classes.cover}
              style={{
                backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}
            >
              <div className={classes.bg}>
                <Typography variant="h3" component="h3">
                  No data to show
                </Typography>
              </div>
            </div>
          )
        }
      </>
    );
  }
}

const mapStateToProps = state => {
  const signInReducer = state.get('signIn');
  return ({
    logedUser: signInReducer.staffInfo,
  });
};

const StaffDetailFormRedux = reduxForm({
  form: 'staffDetailForm',
  validate,
  enableReinitialize: true
})(StaffDetail);

export default withStyles(styles)(connect(mapStateToProps, null)(StaffDetailFormRedux));
