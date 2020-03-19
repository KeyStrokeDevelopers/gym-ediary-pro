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
import Divider from '@material-ui/core/Divider';
import AccountBalance from '@material-ui/icons/AccountBalance';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ReactHtmlParser from 'react-html-parser';
import styles from './contact-jss';

const optionsOpt = [
  'Block Name',
  'Delete Name',
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;

class PurposeDetail extends React.Component {
  state = {
    anchorElOpt: null,
    open: false,
    deletedId: null,
  };

  handleClickOpt = event => {
    this.setState({ anchorElOpt: event.currentTarget });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  deleteName = (item) => {
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
    const { activePurposeData } = this.props;
    const { activeId } = this.state;
    activePurposeData(activeId);
    this.setState({ openActive: false });
  }

  handleAgree = () => {
    const { deletePurposeData } = this.props;
    const { deletedId } = this.state;
    deletePurposeData(deletedId);
    this.setState({ open: false });
  }


  render() {
    const {
      classes,
      purposeData,
      itemSelected,
      edit,
      favorite,
      showMobileDetail,
      isActive,
      hideDetail,
    } = this.props;
    const { anchorElOpt, open, openActive } = this.state;

    let viewPurposeData;
    if (purposeData && purposeData.length >= 1) {
      viewPurposeData = isActive ? purposeData.filter(item => item.status === 1) : purposeData.filter(item => item.status === 0);
    }

    return (
      <>
        {viewPurposeData && viewPurposeData.length >= 1
          ? (
            <main className={classNames(classes.content, showMobileDetail ? classes.detailPopup : '')}>
              <div>
                <Dialog
                  open={open}
                  onClose={this.handleDisagree}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {'Delete Purpose Data'}
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
                    {'Active Purpose Data'}
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

              </div>
              <section className={classes.cover}>
                <div className={classes.opt}>
                  {isActive ? (
                    <>
                      <Tooltip title="Delete Purpose Data">
                        <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleDelete(viewPurposeData[itemSelected]._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Purpose Data">
                        <IconButton aria-label="Edit" onClick={() => edit(viewPurposeData[itemSelected])}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                      <Tooltip title="Active Package Data">
                        <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleActive(viewPurposeData[itemSelected]._id)}>
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
                      if (option === 'Delete Name') {
                        return (
                          <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteName(viewPurposeData[itemSelected])}>
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
                    <Avatar className={`${classes.blueIcon} ${classes.avatar}`}>
                      <AccountBalance />
                    </Avatar>
                  </ListItemAvatar>
                  <Typography className={classes.userName} variant="h6">
                    {viewPurposeData[itemSelected].purposeName}
                    <Typography display="block" variant="caption">
                      {viewPurposeData[itemSelected].purposeName}
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
                      {viewPurposeData[itemSelected].purposeName}
                      <Typography display="block" variant="caption">
                        {viewPurposeData[itemSelected].purposeName}
                      </Typography>
                    </Typography>
                  </div>
                </Hidden>
                <List style={{ maxHeight: '500px', overflow: 'scroll' }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].nSunday)} secondary="SUNDAY NUTRITION" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].nMonday)} secondary="MONDAY NUTRITION" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].nTuesday)} secondary="TUESDAY NUTRITION" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].nWednesday)} secondary="WEDNESDAY NUTRITION" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].nThursday)} secondary="THURSDAY NUTRITION" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].nFriday)} secondary="FRIDAY NUTRITION" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].nSaturday)} secondary="SATURDAY NUTRITION" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].wSunday)} secondary="SUNDAY WORKOUT" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].wMonday)} secondary="MONDAY WORKOUT" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].wTuesday)} secondary="TUESDAY WORKOUT" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].wWednesday)} secondary="WEDNESDAY WORKOUT" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].wThursday)} secondary="THURSDAY WORKOUT" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].wFriday)} secondary="FRIDAY WORKOUT" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ReactHtmlParser(viewPurposeData[itemSelected].wSaturday)} secondary="SATURDAY WORKOUT" />
                  </ListItem>
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

// PurposeDetail.propTypes = {
//     classes: PropTypes.object.isRequired,
//     showMobileDetail: PropTypes.bool.isRequired,
//     purposeData: PropTypes.object.isRequired,
//     itemSelected: PropTypes.number.isRequired,
//     edit: PropTypes.func.isRequired,
//     remove: PropTypes.func.isRequired,
//     favorite: PropTypes.func.isRequired,
//     hideDetail: PropTypes.func.isRequired,
// };

export default withStyles(styles)(PurposeDetail);
