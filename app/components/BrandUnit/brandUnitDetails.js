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
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import AccountBalance from '@material-ui/icons/AccountBalance';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import brandUnitDataField from './brandUnitField';
import styles from './brandUnit-jss';

const optionsOpt = [
  'Block Contact',
  'Delete Contact',
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;

class BrandUnitDetail extends React.Component {
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
    const { deleteBrandUnitData } = this.props;
    const { deletedId } = this.state;
    deleteBrandUnitData(deletedId);
    this.setState({ open: false });
  }

  handleActive = (dataId) => {
    this.setState({ openActive: true, activeId: dataId });
  }

  handleActiveDisagree = () => {
    this.setState({ openActive: false, activeId: null });
  }

  handleActiveAgree = () => {
    const { activeBrandUnitData } = this.props;
    const { activeId } = this.state;
    activeBrandUnitData(activeId);
    this.setState({ openActive: false });
  }

  getFilterData = (value, memberData) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength <= 0 ? [] : memberData.filter(data => (data.name) && data.name.toLowerCase().slice(0, inputLength) === inputValue);
  }


  render() {
    const {
      classes,
      brandUnitData,
      showDetails,
      itemSelected,
      filterValue,
      edit,
      favorite,
      showMobileDetail,
      entryType,
      is_active,
      hideDetail,
    } = this.props;
    const { anchorElOpt, open, openActive } = this.state;

    let brandUnitFilterData;
    if (brandUnitData && brandUnitData.length >= 1) {
      brandUnitFilterData = is_active ? brandUnitData.filter(item => item.status === 1 && item.entryType === entryType) : brandUnitData.filter(item => item.status === 0 && item.entryType === entryType)
    }


    const ListData = [];
    if (brandUnitFilterData && brandUnitFilterData.length >= 1) {
      brandUnitDataField.map(data => {
        if (brandUnitFilterData[itemSelected][data.primary]) {
          ListData.push({ primary: brandUnitFilterData[itemSelected][data.primary], secondary: data.secondary, key: data.primary });
        }
      });
    }

    return (
      <>
        {brandUnitFilterData && brandUnitFilterData.length >= 1
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
                    {'Delete BrandUnit Data'}
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
                    {'Active Brand Unit Data'}
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
                  {is_active ?
                    (<>
                      <Tooltip title="Delete Record">
                        <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleDelete(brandUnitFilterData[itemSelected]._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Record">
                        <IconButton aria-label="Edit" onClick={() => edit(brandUnitFilterData[itemSelected])}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </>) : (
                      <Tooltip title="Active Category Data">
                        <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleActive(brandUnitFilterData[itemSelected]._id)}>
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
                          <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteContact(brandUnitFilterData[itemSelected])}>
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
                      <PermIdentityIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Typography className={classes.userName} variant="h6">
                    {brandUnitFilterData[itemSelected].value}
                    <Typography display="block" variant="caption">
                      {brandUnitFilterData[itemSelected].entryType}
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
                      {brandUnitFilterData[itemSelected].value}
                      <Typography display="block" variant="caption">
                        {brandUnitFilterData[itemSelected].entryType}
                      </Typography>
                    </Typography>
                  </div>
                </Hidden>
                <List style={{ maxHeight: '500px', overflow: 'scroll' }}>
                  {ListData.map((data, index) => (
                    <ListItemView
                      primaryValue={data.primary}
                      secondaryValue={data.secondary}
                      key={index + Math.random()}
                      classes
                    />
                  ))}
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


export default withStyles(styles)(BrandUnitDetail);


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
