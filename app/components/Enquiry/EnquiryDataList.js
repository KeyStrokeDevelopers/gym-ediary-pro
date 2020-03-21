/* eslint-disable */
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { reduxForm, Field } from 'redux-form/immutable';
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
import { DatePickerInput } from '../Forms/ReduxFormMUI';
import styles from './enquiry-jss';
import moment from 'moment';

class EnquiryDataList extends React.Component {
  state = {
    filter: 1,
    dateFrom: moment(new Date()).format('YYYY-MM-DD'),
    dateTo: moment(new Date()).format('YYYY-MM-DD')
  };

  componentDidMount = () => {
    const { isActive } = this.props;
    const { dateFrom, dateTo } = this.state;
    isActive({ is_active: true, dateFrom, dateTo });
  }

  handleChange = (event, value) => {
    this.setState({ filter: value });
    const is_active = value === 1;
    const { isActive } = this.props;
    const { dateFrom, dateTo } = this.state;
    isActive({ is_active, dateFrom, dateTo });
  };

  handleDateFrom = (e, date) => {
    const { isActive, is_active } = this.props;
    const { dateTo } = this.state;
    const dateFrom = moment(new Date(date)).format('YYYY-MM-DD');
    this.setState({ dateFrom });
    isActive({ is_active, dateFrom, dateTo });
  }

  handleDateTo = (e, date) => {
    const { isActive, is_active } = this.props;
    const { dateFrom } = this.state;
    const dateTo = moment(new Date(date)).format('YYYY-MM-DD');
    this.setState({ dateTo });
    isActive({ is_active, dateFrom, dateTo });
  }

  sortByFollowUpDate = (a, b) => {
    if (a.followUpDate > b.followUpDate) {
      return -1;
    }
    if (a.followUpDate < b.followUpDate) {
      return 1;
    }
    return 0;
  }

  sortByEnquiryDate = (a, b) => {
    if (a.enqDate > b.enqDate) {
      return -1;
    }
    if (a.enqDate < b.enqDate) {
      return 1;
    }
    return 0;
  }

  render() {
    const {
      classes,
      itemSelected,
      enquiryDataList,
      showDetail,
      search,
      keyword,
      clippedRight,
      addEnquiryData,
      is_active,
      addFn
    } = this.props;
    const { filter, dateFrom, dateTo } = this.state;
    let enquiryData;
    let enquiryDataView;
    if (enquiryDataList && enquiryDataList.length >= 1) {
      enquiryDataView = enquiryDataList.filter(item => item.enqDate <= dateTo && item.enqDate >= dateFrom);
    }

    if (enquiryDataView && enquiryDataView.length >= 1) {
      enquiryData = is_active ? enquiryDataView.filter(item => item.followUp) : enquiryDataView;
    }

    if (enquiryData && enquiryData.length >= 1) {
      is_active ? enquiryData.sort(this.sortByFollowUpDate) : enquiryData.sort(this.sortByEnquiryDate);
    }


    const getItem = dataArray => dataArray.map((data, ind) => {
      const index = enquiryData.indexOf(data);
      if (data.name.toLowerCase().indexOf(keyword) === -1) {
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
          <ListItemText primary={data.contact} secondary={data.name} />
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
            <div style={{ display: 'flex' }}>
              <div className={classes.picker} style={{ width: '50%', margin: '10px' }}>
                <Field
                  name="from"
                  label="From"
                  component={DatePickerInput}
                  onChange={this.handleDateFrom}
                  dateValue={dateFrom}
                />
              </div>

              <div className={classes.picker} style={{ width: '50%', margin: '10px' }}>
                <Field
                  name="to"
                  label="To"
                  component={DatePickerInput}
                  onChange={this.handleDateTo}
                  dateValue={dateTo}
                />
              </div>
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
                  <Tooltip title="Add New Enquiry">
                    <IconButton className={classes.buttonAdd} onClick={() => addEnquiryData()} color="secondary" aria-label="Delete">
                      <Add />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.total}>
              {enquiryData ? enquiryData.length : '0'}
              &nbsp;
              Enquirys
              </div>
            <List>
              {enquiryData && enquiryData.length >= 1 && getItem(enquiryData)}
            </List>
          </div>
        </Drawer>
        <BottomNavigation value={filter} onChange={this.handleChange} className={classes.bottomFilter}>
          <BottomNavigationAction label="Follow Up" value={1} icon={<PermContactCalendar />} />
          <BottomNavigationAction label="All Enquiry" value={0} icon={<DeleteIcon />} />
        </BottomNavigation>
      </Fragment>
    );
  }
}


EnquiryDataList.defaultProps = {
  clippedRight: false,
  addContact: () => { },
  addFn: false,
};

const EnquiryDataListFormRedux = reduxForm({
  form: 'enquiryDataListForm',
  enableReinitialize: true
})(EnquiryDataList);

export default withStyles(styles)(EnquiryDataListFormRedux);
