/* eslint-disable */
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm, Field } from 'redux-form/immutable';
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
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { SelectRedux } from '../Forms/ReduxFormMUI';
import IconButton from '@material-ui/core/IconButton';
import styles from './contact-jss';

class CategoryDataList extends React.Component {
  state = {
    filter: 1,
    categoryType: 'Expenditure'
  };

  componentDidMount = () => {
    const { isActive } = this.props;
    isActive(1);
  }

  componentDidMount = () => {
    const { isActive } = this.props;
    const { categoryType } = this.state;
    isActive({ is_active: true, categoryType });
    this.props.initialize({ categoryType: 'Expenditure' });
  }

  handleChange = (event, value) => {
    this.setState({ filter: value });
    const { categoryType } = this.state;
    const is_active = value === 1;
    const { isActive } = this.props;
    isActive({ is_active, categoryType });
  };

  handleCategoryType = (e, categoryType) => {
    const { isActive, is_active } = this.props;
    isActive({ is_active, categoryType });
    this.setState({ is_active, categoryType })
  }

  sortByName = (a, b) => {
    if (a.category < a.category) {
      return -1;
    }
    if (a.category > a.category) {
      return 1;
    }
    return 0;
  }

  render() {
    const {
      classes,
      itemSelected,
      categoryDataList,
      showDetail,
      search,
      keyword,
      clippedRight,
      addCategoryData,
      is_active,
      categoryType,
      addFn
    } = this.props;
    const { filter } = this.state;
    let categoryData;
    if (categoryDataList && categoryDataList.length >= 1) {
      categoryData = is_active ? categoryDataList.filter(item => item.status === 1 && item.categoryType === categoryType) : categoryDataList.filter(item => item.status === 0 && item.categoryType === categoryType);
    }

    if (categoryData && categoryData.length >= 1) {
      categoryData.sort(this.sortByName);
    }

    const getItem = dataArray => dataArray.map((data, ind) => {
      const index = categoryData.indexOf(data);
      if (data.category.toLowerCase().indexOf(keyword) === -1) {
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
          <ListItemText primary={data.category} secondary={data.categoryType} />
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
            <div>
              <form>
                <div style={{ margin: '10px' }}>
                  <FormControl className={classes.field} style={{ width: '100%' }}>
                    <InputLabel htmlFor="selection">Select Expenditure or Income</InputLabel>
                    <Field
                      name="categoryType"
                      component={SelectRedux}
                      placeholder="Select Expenditure or Income"
                      onChange={this.handleCategoryType}
                    >
                      <MenuItem value="Expenditure">Expenditure</MenuItem>
                      <MenuItem value="Income">Income</MenuItem>
                    </Field>
                  </FormControl>
                </div>
              </form>
            </div>
            <div className={classNames(classes.toolbar, clippedRight && classes.clippedRight)}>
              <div className={classes.flex}>
                <div className={classes.searchWrapper}>
                  <div className={classes.search}>
                    <SearchIcon />
                  </div>
                  <input className={classes.input} onChange={(event) => search(event.target.value)} placeholder="Search" />
                </div>
                {addFn && (
                  <Tooltip title="Add New Category">
                    <IconButton className={classes.buttonAdd} onClick={() => addCategoryData()} color="secondary" aria-label="Delete">
                      <Add />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.total}>
              {categoryData ? categoryData.length : '0'}
              &nbsp;
              Categories
            </div>
            <List>
              {categoryData && categoryData.length >= 1 && getItem(categoryData)}
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


CategoryDataList.defaultProps = {
  clippedRight: false,
  addContact: () => { },
  addFn: false,
};

const CategoryDataListFormRedux = reduxForm({
  form: 'CategoryDataListForm',
  enableReinitialize: true
})(CategoryDataList);

export default withStyles(styles)(CategoryDataListFormRedux);