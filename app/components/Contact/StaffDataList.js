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
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import styles from './contact-jss';
import { SERVER_URL } from '../Common/constant';

class StaffDataList extends React.Component {
  state = {
    filter: 1,
  };

  handleChange = (event, value) => {
    this.setState({ filter: value });
    const is_active = value === 1;
    const { isActiveData } = this.props;
    isActiveData(is_active);
  };

  sortByName = (a, b) => {
    if (a.staffName < a.staffName) {
      return -1;
    }
    if (a.staffName > a.staffName) {
      return 1;
    }
    return 0;
  }

  render() {
    const {
      classes,
      itemSelected,
      staffDataList,
      showDetail,
      search,
      keyword,
      clippedRight,
      addStaffData,
      isActive,
      addFn, total
    } = this.props;
    const { filter } = this.state;
    let staffData;
    if (staffDataList && staffDataList.length >= 1) {
      staffData = isActive ? staffDataList.filter(item => item.status === 1) : staffDataList.filter(item => item.status === 0);
    }

    if (staffData && staffData.length >= 1) {
      staffData.sort(this.sortByName);
    }

    const getItem = dataArray => dataArray.map((data, ind) => {
      const index = staffData.indexOf(data);
      if (data.staffName.toLowerCase().indexOf(keyword) === -1) {
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
            {data.staffImage
              ? <Avatar alt="" src={`${SERVER_URL}${data.staffImage}`} className={classes.avatar} />
              : (
                <Avatar className={`${classes.blueIcon} ${classes.avatar}`}>
                  <PermIdentityIcon />
                </Avatar>
              )
            }
          </ListItemAvatar>
          <ListItemText primary={data.staffContact} secondary={data.staffName} />
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
                  <Tooltip title="Add New Staff">
                    <IconButton className={classes.buttonAdd} onClick={() => addStaffData()} color="secondary" aria-label="Delete">
                      <Add />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.total}>
              {staffData ? staffData.length : 0}
              &nbsp;
              Staffs
            </div>
            <List>
              {staffData && getItem(staffData)}
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

StaffDataList.defaultProps = {
  clippedRight: false,
  addContact: () => { },
  addFn: false,
};

export default withStyles(styles)(StaffDataList);
