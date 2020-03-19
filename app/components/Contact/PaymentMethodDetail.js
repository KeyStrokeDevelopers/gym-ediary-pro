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
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Bookmark from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import styles from './contact-jss';

const optionsOpt = [
  'Block Contact',
  'Delete Contact',
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;

class PaymentMethodDetail extends React.Component {
  state = {
    anchorElOpt: null,
    open: false,
    deletedId: null,
    openActive: false,
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

  handleAgree = () => {
    const { deletePaymentMethodData } = this.props;
    const { deletedId } = this.state;
    deletePaymentMethodData(deletedId);
    this.setState({ open: false });
  }

  handleActive = (dataId) => {
    this.setState({ openActive: true, activeId: dataId });
  }

  handleActiveDisagree = () => {
    this.setState({ openActive: false, activeId: null });
  }

  handleActiveAgree = () => {
    const { activePaymentMethodData } = this.props;
    const { activeId } = this.state;
    activePaymentMethodData(activeId);
    this.setState({ openActive: false });
  }

  sortByName = (a, b) => {
    if (a.paymentMethod < a.paymentMethod) {
      return -1;
    }
    if (a.paymentMethod > a.paymentMethod) {
      return 1;
    }
    return 0;
  }

  render() {
    const {
      classes,
      paymentMethodData,
      itemSelected,
      edit,
      favorite,
      showMobileDetail,
      isActive,
      hideDetail
    } = this.props;
    const { anchorElOpt, open, openActive } = this.state;
    let viewPaymentMethodData;
    if (paymentMethodData && paymentMethodData.length >= 1) {
      viewPaymentMethodData = isActive ? paymentMethodData.filter(item => item.status === 1) : paymentMethodData.filter(item => item.status === 0);
    }

    if (viewPaymentMethodData && viewPaymentMethodData.length >= 1) {
      viewPaymentMethodData.sort(this.sortByName);
    }

    return (
      <>
        {viewPaymentMethodData && viewPaymentMethodData.length >= 1
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
                    {'Delete PaymentMethod Data'}
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
                    {'Active PaymentMethod Data'}
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
                      <Tooltip title="Delete Payment Method">
                        <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleDelete(viewPaymentMethodData[itemSelected]._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Payment Method">
                        <IconButton aria-label="Edit" onClick={() => edit(viewPaymentMethodData[itemSelected])}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                      <Tooltip title="Active Payment Method">
                        <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleActive(viewPaymentMethodData[itemSelected]._id)}>
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
                          <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteContact(viewPaymentMethodData[itemSelected])}>
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
                    {viewPaymentMethodData[itemSelected].paymentMethod}
                    <Typography display="block" variant="caption">
                      {'PAYMENT METHOD'}
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
                      {viewPaymentMethodData[itemSelected].paymentMethod}
                      <Typography display="block" variant="caption">
                        {'PAYMENT METHOD'}
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
                    <ListItemText primary={viewPaymentMethodData[itemSelected].paymentMethod} secondary="PAYMENT METHOD" />
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

export default withStyles(styles)(PaymentMethodDetail);
