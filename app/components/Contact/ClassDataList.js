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

class ClassDataList extends React.Component {
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

  sortByPrice = (a, b) => {
    if (a.classPrice < a.classPrice) {
      return -1;
    }
    if (a.classPrice > a.classPrice) {
      return 1;
    }
    return 0;
  }

  render() {
    const {
      classes,
      itemSelected,
      classDataList,
      showDetail,
      search,
      keyword,
      clippedRight,
      addClassData,
      is_active,
      addFn, total
    } = this.props;
    const { filter } = this.state;

    let classData;
    if (classDataList && classDataList.length >= 1) {
      classData = is_active ? classDataList.filter(item => item.status === 1) : classDataList.filter(item => item.status === 0);
    }

    if (classData && classData.length >= 1) {
      classData.sort(this.sortByPrice);
    }

    const getItem = dataArray => dataArray.map((data, ind) => {
      const index = classData.indexOf(data);
      if (data.className.toLowerCase().indexOf(keyword) === -1) {
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
          <ListItemText primary={data.classPrice} secondary={data.className} />
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
                  <Tooltip title="Add New Class">
                    <IconButton className={classes.buttonAdd} onClick={() => addClassData()} color="secondary" aria-label="Delete">
                      <Add />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.total}>
              {classData ? classData.length : '0'}
              &nbsp;
              Classs
            </div>
            <List>
              {classData && getItem(classData)}
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


ClassDataList.defaultProps = {
  clippedRight: false,
  addContact: () => { },
  addFn: false,
};

export default withStyles(styles)(ClassDataList);
