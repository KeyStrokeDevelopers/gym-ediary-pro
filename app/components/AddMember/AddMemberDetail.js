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
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import MoodIcon from '@material-ui/icons/Mood';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import addMemberDataField from './addMemberField';
import { SERVER_URL } from '../Common/constant';
import styles from './addMember-jss';
import MemberProfile from './MemberProfile';

const optionsOpt = [
  'Block Contact',
  'Delete Contact',
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;

class AddMemberDetail extends React.Component {
  state = {
    anchorElOpt: null,
    open: false,
    deletedId: null,
    openProfile: false
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

  handleViewProfile = () => {
    this.setState({ openProfile: true })
  }

  handleClose = () => {
    this.setState({ openProfile: false })
  }

  handleDisagree = () => {
    this.setState({ open: false, deletedId: null });
  }

  handleAgree = () => {
    const { deleteAddMemberData } = this.props;
    const { deletedId } = this.state;
    deleteAddMemberData(deletedId);
    this.setState({ open: false });
  }

  getFilterData = (value, memberData) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength <= 0 ? [] : memberData.filter(data => (data.name) && data.name.toLowerCase().slice(0, inputLength) === inputValue);
  }


  render() {
    const {
      classes,
      addMemberData,
      itemSelected,
      filterValue,
      edit,
      showMobileDetail,
      paymentMethodData,
      isActive,
      hideDetail,
    } = this.props;
    const { anchorElOpt, open, openProfile } = this.state;

    let addMemberFilterData;
    if (addMemberData && addMemberData.length >= 1) {
      addMemberFilterData = this.getFilterData(filterValue, addMemberData);
    }
    if (filterValue === 'All') {
      addMemberFilterData = addMemberData;
    }
    let viewAddMemberData = addMemberFilterData;
    if (addMemberFilterData && addMemberFilterData.length >= 1) {
      viewAddMemberData = isActive ? addMemberFilterData : addMemberFilterData.filter(item => new Date(item.registertionDate).toLocaleDateString() === new Date().toLocaleDateString());
    }

    const ListData = [];
    if (viewAddMemberData && viewAddMemberData.length >= 1) {
      addMemberDataField.map(data => {
        if (viewAddMemberData[itemSelected][data.primary]) {
          if (data.primary === 'dob' || data.primary === 'anniversary') {
            ListData.push({ primary: new Date(viewAddMemberData[itemSelected][data.primary]).toLocaleDateString(), secondary: data.secondary, key: data.primary });
          } else {
            ListData.push({ primary: viewAddMemberData[itemSelected][data.primary], secondary: data.secondary, key: data.primary });
          }
        }
      });
    }

    return (
      <>
        {viewAddMemberData && viewAddMemberData.length >= 1
          ? (
            <main className={classNames(classes.content, showMobileDetail ? classes.detailPopup : '')}>
              <MemberProfile
                open={openProfile}
                close={this.handleClose}
                memberData={viewAddMemberData[itemSelected]}
              />
              <div>
                <Dialog
                  open={open}
                  onClose={this.handleDisagree}
                  paymentMethodData={paymentMethodData}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {'Delete AddMember Data'}
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
                    <Tooltip title="View Profile">
                      <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleViewProfile()}>
                        <MoodIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Record">
                      <IconButton aria-label="Edit" onClick={() => edit(viewAddMemberData[itemSelected])}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
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
                          <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteContact(viewAddMemberData[itemSelected])}>
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
                    {viewAddMemberData[itemSelected].profileImage
                      ? <Avatar alt="" src={`${SERVER_URL}${viewAddMemberData[itemSelected].profileImage}`} className={classes.avatar} />
                      : (
                        <Avatar className={`${classes.blueIcon} ${classes.avatar}`}>
                          <PermIdentityIcon />
                        </Avatar>
                      )
                    }
                  </ListItemAvatar>
                  <Typography className={classes.userName} variant="h6">
                    {viewAddMemberData[itemSelected].contact}
                    <Typography display="block" variant="caption">
                      {viewAddMemberData[itemSelected].name}
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
                      {viewAddMemberData[itemSelected].contact}
                      <Typography display="block" variant="caption">
                        {viewAddMemberData[itemSelected].name}
                      </Typography>
                    </Typography>
                  </div>
                </Hidden>
                <List style={{ maxHeight: '500px', overflow: 'scroll' }}>
                  {ListData.map((data, index) => {
                    if (data.key === '_id') {
                      return null;
                    } else if (data.key === 'purpose') {

                    } else if (data.key == 'classInfo') {


                    } else if (data.key === 'packageInfo') {

                    } else {
                      return (
                        <ListItemView
                          primaryValue={data.primary}
                          secondaryValue={data.secondary}
                          key={index + Math.random()}
                          classes
                        />
                      );
                    }
                  })}
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

export default withStyles(styles)(AddMemberDetail);

const ListItemView = ({ primaryValue, secondaryValue, classes }) => (
  <>
    <ListItem>
      <ListItemAvatar>
        <Avatar className={classes.blueIcon}>
          <Bookmark />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={primaryValue} secondary={secondaryValue} />
    </ListItem>
    <Divider variant="inset" />
  </>
);
