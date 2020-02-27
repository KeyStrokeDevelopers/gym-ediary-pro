/* eslint-disable */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import TodayIcon from '@material-ui/icons/Today';
import styles from './brandUnit-jss';

class BrandUnitDataList extends React.Component {
  state = {
    filter: 1,
    filterValue: 'All'
  };

  handleChange = (event, value) => {
    this.setState({ filter: value });
    const is_active = value === 1;
    const { isActive } = this.props;
    isActive(is_active);
  };

  handleSelected = (e, data) => {
    this.props.filterValue(data);
    this.setState({ filterValue: data });
  }

  getFilterData = (value, memberData) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength <= 0 ? [] : memberData.filter(data => (data.name) && data.name.toLowerCase().slice(0, inputLength) === inputValue);
  }

  render() {
    const {
      classes,
      itemSelected,
      addBrandUnitData,
      showDetail,
      search,
      keyword,
      clippedRight,
      brandUnitData,
      addFn,
    } = this.props;
    const { filter } = this.state;
    const getItem = dataArray => dataArray.map((data, ind) => {
      const index = brandUnitData.indexOf(data);
      if (data.value.toLowerCase().indexOf(keyword) === -1) {
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
            <Avatar className={`${classes.blueIcon} ${classes.avatar}`}>
              <PermIdentityIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={data.value} secondary={data.entryType} />
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
                  <Tooltip title="Add New Contact">
                    <IconButton className={classes.buttonAdd} onClick={() => addBrandUnitData()} color="secondary" aria-label="Delete">
                      <Add />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.total}>
              {brandUnitData ? brandUnitData.length : '0'}
              &nbsp;
              Brand Unit
              </div>
            <List>
              {brandUnitData && brandUnitData.length >= 1 && getItem(brandUnitData)}
            </List>
          </div>
        </Drawer>
        <BottomNavigation value={filter} onChange={this.handleChange} className={classes.bottomFilter}>
          <BottomNavigationAction label="All" value={1} icon={<PermContactCalendar />} />
          <BottomNavigationAction label="Delete" value={0} icon={<TodayIcon />} />
        </BottomNavigation>
      </Fragment>
    );
  }
}

BrandUnitDataList.defaultProps = {
  clippedRight: false,
  addContact: () => { },
  addFn: false,
};


export default withStyles(styles)(BrandUnitDataList);
