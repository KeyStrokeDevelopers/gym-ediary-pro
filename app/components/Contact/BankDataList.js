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
import AccountBalance from '@material-ui/icons/AccountBalance';
import styles from './contact-jss';

class BankDataList extends React.Component {
  state = {
    filter: 1,
  };

  handleChange = (event, value) => {
    this.setState({ filter: value });
    const is_active = value === 1;
    const { isActive } = this.props;
    isActive(is_active);
  };

  render() {
    const {
      classes,
      itemSelected,
      bankDataList,
      showDetail,
      search,
      keyword,
      clippedRight,
      addBankData,
      is_active,
      addFn, total
    } = this.props;
    const { filter } = this.state;
    let bankData;
    if (bankDataList && bankDataList.length >= 1) {
      bankData = is_active ? bankDataList.filter(item => item.status === 1) : bankDataList.filter(item => item.status === 0);
    }
    const getItem = dataArray => dataArray.map((data, ind) => {
      const index = bankData.indexOf(data);
      if (data.accountHolder.toLowerCase().indexOf(keyword) === -1) {
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
            <Avatar className={classes.blueIcon}>
              <AccountBalance />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={data.accountNumber} secondary={data.accountHolder} />
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
                    <IconButton className={classes.buttonAdd} onClick={() => addBankData()} color="secondary" aria-label="Delete">
                      <Add />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.total}>
              {bankData && bankData.length >= 1 ? bankData.length : '0'}
              &nbsp;
              Banks
            </div>
            <List>
              {bankData && getItem(bankData)}
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

BankDataList.defaultProps = {
  clippedRight: false,
  addContact: () => { },
  addFn: false,
};

export default withStyles(styles)(BankDataList);
