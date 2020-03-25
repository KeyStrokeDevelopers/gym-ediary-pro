/* eslint-disable */
import React, { Fragment, Component } from 'react';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { connect } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import { resetCart, deleteCartValue } from 'dan-actions/saleActions.js';

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing(1)}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
  orderSummary: {
    [theme.breakpoints.up('md')]: {
      width: 600,
      margin: '0 auto'
    },
  },
  paper: {
    background: theme.palette.type === 'dark' ? darken(theme.palette.secondary.main, 0.5) : lighten(theme.palette.secondary.light, 0.5),
    padding: theme.spacing(2),
    height: 550,
    overflow: 'auto',
    '& h6': {
      textAlign: 'center',
    }
  },
  thumb: {
    width: 120,
    height: 70,
    marginRight: theme.spacing(2),
    overflow: 'hidden',
    borderRadius: theme.rounded.small,
    '& img': {
      maxWidth: '100%'
    }
  },
  statusMenu: {
    '& li': {
      width: 100
    }
  },
  totalPrice: {
    '& h6': {
      textAlign: 'right',
      width: '100%',
      '& span': {
        color: theme.palette.primary.main,
        fontSize: 28
      }
    },
  }
});

class SideReview extends Component {
  state = {
    openMenu: false,
    open: false,
    openDelete: false,
    deleteItemIndex: null,
  }

  resetCart = () => {
    const { resetCartValue } = this.props;
    resetCartValue();
  }

  deleteFromCart = (deleteItemIndex) => {
    this.setState({ openDelete: true, deleteItemIndex })
  }

  handleMenuOpen = () => {
    this.setState({ openMenu: true });
  }

  handleMenuClose = () => {
    this.setState({ openMenu: false });
  }

  handleReset = () => {
    this.setState({ open: true })
  }

  handleDisagree = () => {
    this.setState({ open: false });
  }

  handleAgree = () => {
    this.resetCart();
    this.setState({ open: false });
  }

  handleAgree = () => {
    this.resetCart();
    this.setState({ openDelete: false });
  }

  handleDisagreeDelete = () => {
    this.setState({ openDelete: false });
  }

  handleAgreeDelete = () => {
    const { delete_Cart_Value } = this.props;
    const { deleteItemIndex } = this.state;
    delete_Cart_Value(deleteItemIndex);
    this.setState({ openDelete: false, deleteItemIndex: null });
  }

  render() {
    const { classes, cartData } = this.props;
    const { open, openDelete } = this.state;
    // const { openMenu } = this.state;
    let totalPrice = 0;
    const getCartItem = dataArray => dataArray.map((item, index) => {
      totalPrice += (item.costPrice);
      return (
        <Fragment key={index.toString()}>
          <ListItem>
            {/* <figure className={classes.thumb}>
                        <img src={item.thumb} alt="thumb" />
                    </figure> */}

            <ListItemText
              primary={item.selectedProductType}
              secondary={`${item.brandProduct} , Qty - ${item.quantity}`}
              className={classes.itemText}
            />
            <ListItemSecondaryAction edge="end">
              {item.costPrice}
            </ListItemSecondaryAction>
          </ListItem>
          <li>
            <div style={{ width: '100%', textAlign: 'right', paddingBottom: '5px' }}>
              <DeleteIcon onClick={() => this.deleteFromCart(index)} style={{ color: '#f56049', cursor: 'pointer' }} />
            </div>
            <Divider />
          </li>
        </Fragment>
      );
    });
    return (
      <Paper className={classes.paper} elevation={0}>
        <div>
          <Dialog
            open={open}
            onClose={this.handleDisagree}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Reset Cart'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure for reset cart ?
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
            open={openDelete}
            onClose={this.handleDisagreeDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Delete Item'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure for delete item ?
                      </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDisagreeDelete} color="primary">
                Disagree
                      </Button>
              <Button onClick={this.handleAgreeDelete} color="primary" autoFocus>
                Agree
                      </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Typography variant="h6" gutterBottom>
          <ShoppingCart />
          <Button size="small" onClick={this.handleMenuOpen}>
            &nbsp; Order Summary

            {/* <Menu
                            open={openMenu}
                            onClose={this.handleMenuClose}
                        >
                            <MenuItem >
                                Online
                  </MenuItem>
                            <MenuItem >
                                Idle
                  </MenuItem>
                            <MenuItem>
                                Bussy
                  </MenuItem>
                            <MenuItem>
                                Offline
                  </MenuItem>
                        </Menu> */}
          </Button>
          {(cartData && cartData.length >= 1)
            && (
              <div style={{ width: '100%', textAlign: 'right' }}>
                <Button variant="contained" color="primary" type="button" onClick={this.handleReset}>
                  Reset
                </Button>
              </div>
            )
          }
        </Typography>
        <List component="ul">
          {(cartData && cartData.length >= 1) && getCartItem(cartData)}
          {/* {totalPrice !== 0 && <ListItem className={classes.totalPrice}>
                        <Typography variant="h6">
                            Total :&nbsp;
            <span>
                                <small>Rs</small>
                                <strong className={Type.bold}>{totalPrice}</strong>
                            </span>
                        </Typography>
                    </ListItem>
                    } */}
        </List>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  const saleReducer = state.get('sale');
  return ({
    cartData: saleReducer.cartList,
  });
};

const constDispatchToProps = dispatch => ({
  resetCartValue: () => dispatch(resetCart()),
  delete_Cart_Value: (index) => dispatch(deleteCartValue(index))
});

SideReview.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SideReviewInit = connect(
  mapStateToProps,
  constDispatchToProps
)(SideReview);


export default withStyles(styles)(SideReviewInit);
