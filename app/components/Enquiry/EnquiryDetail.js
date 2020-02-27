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
import _ from 'underscore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


import styles from './enquiry-jss';

const optionsOpt = [
  'Block Contact',
  'Delete Contact',
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;

class EnquiryDetail extends React.Component {
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
    const { deleteEnquiryData } = this.props;
    const { deletedId } = this.state;
    deleteEnquiryData(deletedId);
    this.setState({ open: false });
  }

  stringToDate = (_date, _format, _delimiter) => {
    const formatLowerCase = _format.toLowerCase();
    const formatItems = formatLowerCase.split(_delimiter);
    const dateItems = _date.split(_delimiter);
    const monthIndex = formatItems.indexOf('mm');
    const dayIndex = formatItems.indexOf('dd');
    const yearIndex = formatItems.indexOf('yyyy');
    let month = parseInt(dateItems[monthIndex]);
    month -= 1;
    const formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
  }

  sortByFollowUpDate = (a, b) => {
    const first = this.stringToDate(a.followUpDate, 'dd/MM/yyyy', '/');
    const second = this.stringToDate(b.followUpDate, 'dd/MM/yyyy', '/');
    const firstDate = Date.parse(first);
    const secondDate = Date.parse(second);
    if (firstDate > secondDate) {
      return -1;
    }
    if (firstDate < secondDate) {
      return 1;
    }
    return 0;
  }

  sortByEnquiryDate = (a, b) => {
    const first = this.stringToDate(a.enqDate, 'dd/MM/yyyy', '/');
    const second = this.stringToDate(b.enqDate, 'dd/MM/yyyy', '/');
    const firstDate = Date.parse(first);
    const secondDate = Date.parse(second);
    if (firstDate > secondDate) {
      return -1;
    }
    if (firstDate < secondDate) {
      return 1;
    }
    return 0;
  }

  render() {
    const {
      classes,
      enquiryData,
      itemSelected,
      edit,
      favorite,
      showMobileDetail,
      fromToDate,
      isFollowUp,
      hideDetail,
    } = this.props;
    const { anchorElOpt, open } = this.state;
    let viewEnquiryData;

    let enquiryDataView;

    if (fromToDate.dateFrom && fromToDate.dateTo && enquiryData && enquiryData.length >= 1) {
      enquiryDataView = enquiryData.filter(item => ((Date.parse(this.stringToDate(new Date(item.enqDate).toLocaleDateString(), 'dd/MM/yyyy', '/'))) <= fromToDate.dateTo)
        && ((Date.parse(this.stringToDate(new Date(item.enqDate).toLocaleDateString(), 'dd/MM/yyyy', '/'))) >= fromToDate.dateFrom));
    }

    if (!enquiryDataView && !fromToDate.dateTo) {
      enquiryDataView = enquiryData;
    }

    if (enquiryDataView && enquiryDataView.length >= 1) {
      viewEnquiryData = isFollowUp ? enquiryDataView.filter(item => item.followUp) : enquiryDataView;
    }

    if (viewEnquiryData && viewEnquiryData.length >= 1) {
      isFollowUp ? viewEnquiryData.sort(this.sortByFollowUpDate) : viewEnquiryData.sort(this.sortByEnquiryDate);
    }


    return (
      <>
        {viewEnquiryData && viewEnquiryData.length >= 1
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
                    {'Delete Enquiry Data'}
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

              </div>
              <section className={classes.cover}>
                <div className={classes.opt}>
                  <>
                    <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleDelete(viewEnquiryData[itemSelected]._id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="Edit" onClick={() => edit(viewEnquiryData[itemSelected])}>
                      <Edit />
                    </IconButton>
                  </>
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
                          <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteContact(viewEnquiryData[itemSelected])}>
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
                    {viewEnquiryData[itemSelected].contact}
                    <Typography display="block" variant="caption">
                      {viewEnquiryData[itemSelected].name}
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
                      {viewEnquiryData[itemSelected].contact}
                      <Typography display="block" variant="caption">
                        {viewEnquiryData[itemSelected].name}
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
                    <ListItemText primary={viewEnquiryData[itemSelected].name} secondary="NAME" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].contact} secondary="CONTACT" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.amberIcon}>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].favourOf} secondary="FAVOUR OF" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.amberIcon}>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].alternativeContact} secondary="ALTERNATIVE CONTACT" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.amberIcon}>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].email} secondary="Email" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.amberIcon}>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].dob} secondary="DATE OF BIRTH" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.amberIcon}>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].address} secondary="ADDRESS" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.amberIcon}>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].packageInfo && viewEnquiryData[itemSelected].packageInfo.packName} secondary="PACKAGE" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.amberIcon}>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].purpose && viewEnquiryData[itemSelected].purpose.purposeName} secondary="PURPOSE" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.amberIcon}>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].query} secondary="QUERY" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.amberIcon}>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].response} secondary="RESPONSE" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.amberIcon}>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].followUp} secondary="FOLLOW UP" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.amberIcon}>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].followUpDate} secondary="FOLLOW UP DATE" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.amberIcon}>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewEnquiryData[itemSelected].referredBy} secondary="REERRED BY" />
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

export default withStyles(styles)(EnquiryDetail);
