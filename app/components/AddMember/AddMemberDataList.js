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
import { reduxForm, Field } from 'redux-form/immutable';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TodayIcon from '@material-ui/icons/Today';
import styles from './addMember-jss';
import { SelectRedux } from '../Forms/ReduxFormMUI';
import { SERVER_URL } from '../Common/constant';

const FILTER = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class AddMemberDataList extends React.Component {
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
      addMemberDataList,
      showDetail,
      search,
      keyword,
      clippedRight,
      is_active,
      addFn
    } = this.props;
    const { filter, filterValue } = this.state;

    let addMemberFilterData;
    if (addMemberDataList && addMemberDataList.length >= 1) {
      addMemberFilterData = this.getFilterData(filterValue, addMemberDataList);
    }
    if (filterValue === 'All') {
      addMemberFilterData = addMemberDataList;
    }
    let addMemberViewData = addMemberFilterData;
    if (addMemberFilterData && addMemberFilterData.length >= 1) {
      addMemberViewData = is_active ? addMemberFilterData : addMemberFilterData.filter(item => new Date(item.registertionDate).toLocaleDateString() === new Date().toLocaleDateString());
    }
    const getItem = dataArray => dataArray.map((data, ind) => {
      const index = addMemberViewData.indexOf(data);
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
          <form>
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Select</InputLabel>
                <Field
                  name="filter"
                  component={SelectRedux}
                  placeholder="Select"
                  onChange={this.handleSelected}
                >
                  {FILTER.map((data, index) => <MenuItem value={data} key={index + Math.random()}>{data}</MenuItem>)}
                </Field>
              </FormControl>
            </div>
          </form>
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
                    <IconButton className={classes.buttonAdd} onClick={() => addMemberViewData()} color="secondary" aria-label="Delete">
                      <Add />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.total}>
              {addMemberViewData ? addMemberViewData.length : '0'}
              &nbsp;
              Members
              </div>
            <List>
              {addMemberViewData && addMemberViewData.length >= 1 && getItem(addMemberViewData)}
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


AddMemberDataList.defaultProps = {
  clippedRight: false,
  addContact: () => { },
  addFn: false,
};


const AddMemberDataListFormRedux = reduxForm({
  form: 'AddMemberDataListForm',
  enableReinitialize: true
})(AddMemberDataList);

export default withStyles(styles)(AddMemberDataListFormRedux);
