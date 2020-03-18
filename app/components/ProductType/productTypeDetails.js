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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import productTypeDataField from './productTypeField';
import { SERVER_URL } from '../Common/constant';
import styles from './productType-jss';

const optionsOpt = [
  'Block Contact',
  'Delete Contact',
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;

class ProductTypeDetail extends React.Component {
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
    const { deleteProductTypeData } = this.props;
    const { deletedId } = this.state;
    deleteProductTypeData(deletedId);
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
      productTypeData,
      itemSelected,
      edit,
      showMobileDetail,
      hideDetail,
      is_active
    } = this.props;
    const { anchorElOpt, open } = this.state;
    const ListData = [];


    let productTypeFilterData;
    if (productTypeData && productTypeData.length >= 1) {
      productTypeFilterData = is_active ? productTypeData.filter(item => item.status === 1) : productTypeData.filter(item => item.status === 0)
    }


    if (productTypeFilterData && productTypeFilterData.length >= 1) {
      productTypeDataField.map(data => {
        if (productTypeFilterData[itemSelected][data.primary]) {
          ListData.push({ primary: productTypeFilterData[itemSelected][data.primary], secondary: data.secondary, key: data.primary });
        }
      });
    }

    return (
      <>
        {productTypeFilterData && productTypeFilterData.length >= 1
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
                    {'Delete ProductType Data'}
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
                    {is_active &&
                      <Tooltip title="Delete Record">
                        <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleDelete(productTypeFilterData[itemSelected]._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    }
                    <Tooltip title="Edit Record">
                      <IconButton aria-label="Edit" onClick={() => edit(productTypeFilterData[itemSelected])}>
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
                          <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteContact(productTypeFilterData[itemSelected])}>
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
                    {productTypeFilterData[itemSelected].profileImage
                      ? <Avatar alt="" src={`${SERVER_URL}${productTypeFilterData[itemSelected].profileImage}`} className={classes.avatar} />
                      : (
                        <Avatar className={`${classes.blueIcon} ${classes.avatar}`}>
                          <PermIdentityIcon />
                        </Avatar>
                      )
                    }
                  </ListItemAvatar>
                  <Typography className={classes.userName} variant="h6">
                    {productTypeFilterData[itemSelected].contact}
                    <Typography display="block" variant="caption">
                      {productTypeFilterData[itemSelected].name}
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
                      {productTypeFilterData[itemSelected].contact}
                      <Typography display="block" variant="caption">
                        {productTypeFilterData[itemSelected].name}
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

export default withStyles(styles)(ProductTypeDetail);


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
