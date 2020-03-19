/* eslint-disable */
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import styles from './contact-jss';

class PaymentMethodDataList extends React.Component {
  state = {
    filter: 1,
  };

  componentDidMount = () => {
    const { isActive } = this.props;
    isActive(1);
  }

  handleChange = (event, value) => {
    this.setState({ filter: value });
    const is_active = value === 1;
    const { isActive } = this.props;
    isActive(is_active);
  };

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
      itemSelected,
      paymentMethodDataList,
      showDetail,
      search,
      keyword,
      clippedRight,
      addPaymentMethodData,
      is_active,
      addFn, total
    } = this.props;
    const { filter } = this.state;
    let paymentMethodData;
    if (paymentMethodDataList && paymentMethodDataList.length >= 1) {
      paymentMethodData = is_active ? paymentMethodDataList.filter(item => item.status === 1) : paymentMethodDataList.filter(item => item.status === 0);
    }

    if (paymentMethodData && paymentMethodData.length >= 1) {
      paymentMethodData.sort(this.sortByName);
    }

    const getItem = dataArray => dataArray.map((data, ind) => {
      const index = paymentMethodData.indexOf(data);
      if (data.paymentMethod.toLowerCase().indexOf(keyword) === -1) {
        return false;
      }
      return (
        <ListItem
          button
          key={ind}
          className={index === itemSelected ? classes.selected : ''}
          onClick={() => showDetail(data)}
        >
          <ListItemAvatar>
            <Avatar alt="Vfgf" src="" className={classes.avatar} />
          </ListItemAvatar>
          <ListItemText primary={data.paymentMethod} secondary="PAYMENT METHOD" />
        </ListItem>
      );
    });

    return (
      <Fragment>
        <Drawer
          variant="permanent"
          anchor="left"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div>
            <div className={classNames(classes.toolbar, clippedRight && classes.clippedRight)}>
              <div className={classes.flex}>
                <div className={classes.searchWrapper}>
                  <div className={classes.search}>
                    <SearchIcon />
                  </div>
                  <input className={classes.input} onChange={(event) => search(event.target.value)} placeholder="Search" />
                </div>
                {addFn && (
                  <Tooltip title="Add Payment Method">
                    <IconButton className={classes.buttonAdd} onClick={() => addPaymentMethodData()} color="secondary" aria-label="Delete">
                      <Add />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.total}>
              {paymentMethodData ? paymentMethodData.length : 0}
              &nbsp;
              Payment Methods
            </div>
            <List>
              {paymentMethodData && getItem(paymentMethodData)}
            </List>
          </div>
        </Drawer>
        <BottomNavigation value={filter} onChange={this.handleChange} className={classes.bottomFilter}>
          <BottomNavigationAction label="Active" value={1} icon={<PermContactCalendar />} />
          <BottomNavigationAction label="Deleted" value={0} icon={<DeleteIcon />} />
        </BottomNavigation>
      </Fragment>
    );
  }
}


PaymentMethodDataList.defaultProps = {
  clippedRight: false,
  addContact: () => { },
  addFn: false,
};

export default withStyles(styles)(PaymentMethodDataList);
