/* eslint-disable */
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { reduxForm } from 'redux-form/immutable';
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
import styles from './expenseIncome-jss';

class ExpenseIncomeDataList extends React.Component {
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
      expenseIncomeDataList,
      showDetail,
      search,
      keyword,
      clippedRight,
      addExpenseIncomeData,
      is_active,
      addFn, total
    } = this.props;
    const { filter } = this.state;
    let expenseIncomeData;

    if (expenseIncomeDataList && expenseIncomeDataList.length >= 1) {
      expenseIncomeData = is_active ? expenseIncomeDataList.filter(item => item.status === 1) : expenseIncomeDataList;
    }
    const getItem = dataArray => dataArray.map((data, ind) => {
      const index = expenseIncomeData.indexOf(data);
      if (data.paymentMethod['paymentMethod'].toLowerCase().indexOf(keyword) === -1) {
        return false;
      }
      return (
        <ListItem
          button
          key={ind}
          className={index === itemSelected ? classes.selected : ''}
          onClick={() => showDetail(ind)}
        >
          <ListItemAvatar>
            <Avatar alt="Vfgf" src="" className={classes.avatar} />
          </ListItemAvatar>
          <ListItemText primary={data.amount} secondary={data.paymentMethod['paymentMethod']} />
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
                  <Tooltip title="Add New ExpenseIncome">
                    <IconButton className={classes.buttonAdd} onClick={() => addExpenseIncomeData()} color="secondary" aria-label="Delete">
                      <Add />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.total}>
              {expenseIncomeData ? expenseIncomeData.length : '0'}
              &nbsp;
              ExpenseIncomes
              </div>
            <List>
              {expenseIncomeData && expenseIncomeData.length >= 1 && getItem(expenseIncomeData)}
            </List>
          </div>
        </Drawer>
        <BottomNavigation value={filter} onChange={this.handleChange} className={classes.bottomFilter}>
          <BottomNavigationAction label="Active" value={1} icon={<PermContactCalendar />} />
          <BottomNavigationAction label="All ExpenseIncome" value={0} icon={<DeleteIcon />} />
        </BottomNavigation>
      </Fragment>
    );
  }
}

ExpenseIncomeDataList.defaultProps = {
  clippedRight: false,
  addContact: () => { },
  addFn: false,
};

const ExpenseIncomeDataListFormRedux = reduxForm({
  form: 'expenseIncomeDataListForm',
  enableReinitialize: true
})(ExpenseIncomeDataList);

export default withStyles(styles)(ExpenseIncomeDataListFormRedux);
