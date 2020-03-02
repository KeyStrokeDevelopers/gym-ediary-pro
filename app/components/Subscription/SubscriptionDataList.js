/* eslint-disable */
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import styles from './contact-jss';

class SubscriptionDataList extends React.Component {
  state = {
    filter: 1,
  };

  handleChange = (event, value) => {
    this.setState({ filter: value });
    const is_active = value === 1;
    const { isActive } = this.props;
    isActive(is_active);
  };

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
      itemSelected,
      activePackage,
      showDetail,
      search,
      keyword,
      clippedRight,
      addSubscriptionData,
      is_active,
      addFn
    } = this.props;
    const { filter } = this.state;
    let subscriptionData;
    if (activePackage && activePackage.length >= 1) {
      subscriptionData = is_active ? activePackage.filter(item => item.status === 1) : activePackage.filter(item => item.status === 2);
    }

    if (subscriptionData && subscriptionData.length >= 1) {
      subscriptionData.sort(this.sortByPrice);
    }

    const getItem = dataArray => dataArray.map((data, ind) => {
      const index = subscriptionData.indexOf(data);
      if (data.packageName.toLowerCase().indexOf(keyword) === -1) {
        return false;
      }
      return (
        <ListItem
          button
          key={ind}
          className={index === itemSelected ? classes.selected : ''}
          onClick={() => showDetail(index)}
        >
          <ListItemAvatar>
            <Avatar alt="Vfgf" src="" className={classes.avatar} />
          </ListItemAvatar>
          <ListItemText primary={data.packageName} secondary={data.packPrice} />
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
                  <Tooltip title="Add New Subscription">
                    <IconButton className={classes.buttonAdd} onClick={() => addSubscriptionData()} color="secondary" aria-label="Delete">
                      <Add />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.total}>
              {subscriptionData ? subscriptionData.length : '0'}
              &nbsp;
              Subscriptions
            </div>
            <List>
              {subscriptionData && subscriptionData.length >= 1 && getItem(subscriptionData)}
            </List>
          </div>
        </Drawer>
        <BottomNavigation value={filter} onChange={this.handleChange} className={classes.bottomFilter}>
          <BottomNavigationAction label="Active" value={1} icon={<PermContactCalendar />} />
          <BottomNavigationAction label="Pending" value={0} icon={<AutorenewIcon />} />
        </BottomNavigation>
      </Fragment>
    );
  }
}

SubscriptionDataList.defaultProps = {
  clippedRight: false,
  addContact: () => { },
  addFn: false,
};

export default withStyles(styles)(SubscriptionDataList);
