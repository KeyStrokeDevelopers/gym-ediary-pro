/* eslint-disable */
import React, { Fragment } from 'react';
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
import styles from './productType-jss';
import { SERVER_URL } from '../Common/constant';

class ProductTypeDataList extends React.Component {
  render() {
    const {
      classes,
      itemSelected,
      showDetail,
      search,
      keyword,
      clippedRight,
      addFn,
    } = this.props;


    const getItem = dataArray => dataArray.map((data, ind) => {
      const index = productTypeViewData.indexOf(data);
      if (data.name.toLowerCase().indexOf(keyword) === -1) {
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
            {data.profileImage
              ? <Avatar alt="" src={`${SERVER_URL}${data.profileImage}`} className={classes.avatar} />
              : (
                <Avatar className={`${classes.blueIcon} ${classes.avatar}`}>
                  <PermIdentityIcon />
                </Avatar>
              )
            }
          </ListItemAvatar>
          <ListItemText primary={data.regNo} secondary={data.name} />
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
                    <IconButton className={classes.buttonAdd} onClick={() => productTypeViewData()} color="secondary" aria-label="Delete">
                      <Add />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.total}>
              {productTypeViewData ? productTypeViewData.length : '0'}
              &nbsp;
              Members
            </div>
            <List>
              {productTypeViewData && productTypeViewData.length >= 1 && getItem(productTypeViewData)}
            </List>
          </div>
        </Drawer>
        <BottomNavigation value={filter} onChange={this.handleChange} className={classes.bottomFilter}>
          <BottomNavigationAction label="All" value={1} icon={<PermContactCalendar />} />
          <BottomNavigationAction label="Today Registered" value={0} icon={<TodayIcon />} />
        </BottomNavigation>
      </Fragment>
    );
  }
}

ProductTypeDataList.defaultProps = {
  clippedRight: false,
  addContact: () => { },
  addFn: false,
};


export default withStyles(styles)(ProductTypeDataList);
