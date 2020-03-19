/* eslint-disable */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { reduxForm, Field } from 'redux-form/immutable';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { SelectRedux } from '../Forms/ReduxFormMUI';
import TodayIcon from '@material-ui/icons/Today';
import styles from './brandUnit-jss';

class BrandUnitDataList extends React.Component {
  state = {
    filter: 1,
    filterValue: 'All',
    entryType: 'Brand'
  };

  componentDidMount = () => {
    const { isActive } = this.props;
    isActive(true);
  }

  componentDidMount = () => {
    const { isActive } = this.props;
    const { entryType } = this.state;
    isActive({ is_active: 1, entryType });
    this.props.initialize({ brandUnit: 'Brand' });
  }

  handleChange = (event, value) => {
    this.setState({ filter: value });
    const { entryType } = this.state;
    const is_active = value;
    const { isActive } = this.props;
    isActive({ is_active, entryType });
  };

  handleSelected = (e, data) => {
    this.props.filterValue(data);
    this.setState({ filterValue: data });
  }

  handleBrandUnit = (e, entryType) => {
    this.setState({ entryType });
    const { isActive, is_active } = this.props;
    isActive({ entryType, is_active });
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
      is_active,
      addFn,
    } = this.props;
    const { filter, entryType } = this.state;
    let brandUnitFilterData;
    if (brandUnitData && brandUnitData.length >= 1) {
      brandUnitFilterData = is_active ? brandUnitData.filter(item => item.status === 1 && item.entryType === entryType) : brandUnitData.filter(item => item.status === 0 && item.entryType === entryType)
    }

    const getItem = dataArray => dataArray.map((data, ind) => {
      const index = brandUnitFilterData.indexOf(data);
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
          <form>
            <div style={{ margin: '10px' }}>
              <FormControl className={classes.field} style={{ width: '100%' }}>
                <InputLabel htmlFor="selection">Select Brand or Unit</InputLabel>
                <Field
                  name="brandUnit"
                  component={SelectRedux}
                  placeholder="Select Category Type"
                  onChange={this.handleBrandUnit}
                >
                  <MenuItem value="Brand">Brand</MenuItem>
                  <MenuItem value="Unit">Unit</MenuItem>
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
                    <IconButton className={classes.buttonAdd} onClick={() => addBrandUnitData()} color="secondary" aria-label="Delete">
                      <Add />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.total}>
              {brandUnitFilterData ? brandUnitFilterData.length : '0'}
              &nbsp;
              {entryType}
            </div>
            <List>
              {brandUnitData && brandUnitData.length >= 1 && getItem(brandUnitFilterData)}
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

const BrandUnitDataListFormRedux = reduxForm({
  form: 'brandUnitDataListForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(BrandUnitDataList);

export default withStyles(styles)(BrandUnitDataListFormRedux);