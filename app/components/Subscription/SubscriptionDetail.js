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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Bookmark from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AccountBalance from '@material-ui/icons/AccountBalance';


import styles from './contact-jss';

const optionsOpt = [
  'Block Contact',
  'Delete Contact',
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;

class SubscriptionDetail extends React.Component {
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
    const { deleteSubscriptionData } = this.props;
    const { deletedId } = this.state;
    deleteSubscriptionData(deletedId);
    this.setState({ open: false });
  }

  sortByPrice = (a, b) => {
    if (a.packPrice < b.packPrice) {
      return -1;
    }
    if (a.packPrice > b.packPrice) {
      return 1;
    }
    return 0;
  }

  render() {
    const {
      classes,
      activePackage,
      itemSelected,
      showMobileDetail,
      isActive,
      hideDetail,
    } = this.props;
    const { anchorElOpt, open } = this.state;
    let viewSubscriptionData;
    if (activePackage && activePackage.length >= 1) {
      viewSubscriptionData = isActive ? activePackage.filter(item => item.status === 1) : activePackage.filter(item => item.status === 2);
    }
    if (viewSubscriptionData && viewSubscriptionData.length >= 1) {
      viewSubscriptionData.sort(this.sortByPrice);
    }

    return (
      <>
        {viewSubscriptionData && (viewSubscriptionData.length >= 1)
          ? (
            <main className={classNames(classes.content, showMobileDetail ? classes.detailPopup : '')}>

              <section className={classes.cover}>
                <div className={classes.opt}>
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
                          <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteContact(viewSubscriptionData[itemSelected])}>
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
                    {viewSubscriptionData[itemSelected].packageName}
                    <Typography display="block" variant="caption">
                      {viewSubscriptionData[itemSelected].packPrice}
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
                      {viewSubscriptionData[itemSelected].packageName}
                      <Typography display="block" variant="caption">
                        {viewSubscriptionData[itemSelected].packPrice}
                      </Typography>
                    </Typography>
                  </div>
                </Hidden>
                <List style={{ height: '500px', overflow: 'scroll' }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewSubscriptionData[itemSelected].packageName} secondary="PACK NAME" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewSubscriptionData[itemSelected].packPrice} secondary="PACK PRICE" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={viewSubscriptionData[itemSelected].packDisc} secondary="PACK DISCOUNT" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${viewSubscriptionData[itemSelected].packDuration} Days`} secondary="PACK DURATION" />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueIcon}>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${viewSubscriptionData[itemSelected].packDetail} Days`} secondary="PACK DETAIL" />
                  </ListItem>
                  <Divider variant="inset" />
                  {viewSubscriptionData[itemSelected].purchaseDate &&
                    <>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classes.blueIcon}>
                            <Bookmark />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={new Date(viewSubscriptionData[itemSelected].purchaseDate).toLocaleDateString()} secondary="PACK PURCHASE DATE" />
                      </ListItem>
                      <Divider variant="inset" />
                    </>
                  }
                  {viewSubscriptionData[itemSelected].packActivation &&
                    <>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classes.blueIcon}>
                            <Bookmark />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={new Date(viewSubscriptionData[itemSelected].packActivation).toLocaleDateString()} secondary="PACK ACTIVATION DATE" />
                      </ListItem>
                      <Divider variant="inset" />
                    </>
                  }
                  {viewSubscriptionData[itemSelected].renewalDate &&
                    <>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classes.blueIcon}>
                            <Bookmark />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={new Date(viewSubscriptionData[itemSelected].renewalDate).toLocaleDateString()} secondary="PACK RENEWAL DATE" />
                      </ListItem>
                      <Divider variant="inset" />
                    </>
                  }
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

export default withStyles(styles)(SubscriptionDetail);
