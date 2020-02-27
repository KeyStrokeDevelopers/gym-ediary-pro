/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { AdvTable } from 'dan-components';
import { connect } from 'react-redux';
import styles from 'dan-components/Email/email-jss';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { reduxForm, Field } from 'redux-form/immutable';
import { getPackageData } from 'dan-actions/vendorPackageActions';
import { getClassData } from 'dan-actions/ClassActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { getReportsData } from '../../../actions/reportActions';
import { sendWish } from '../../../actions/addMemberActions';
import { SelectRedux } from '../../../components/Forms/ReduxFormMUI';

class Wishes extends Component {
  state = {
    order: 'asc',
    orderBy: 'date',
    selected: [],
    columnData: [
      {
        id: 'form',
        //  numeric: true,
        disablePadding: false,
        label: 'Form'
      }, {
        id: 'member',
        numeric: true,
        disablePadding: false,
        label: 'Member'
      }, {
        id: 'contact',
        numeric: true,
        disablePadding: false,
        label: 'Contact'
      }, {
        id: 'age',
        numeric: true,
        disablePadding: false,
        label: 'Age'
      }, {
        id: 'fingerCode',
        // numeric: true,
        disablePadding: false,
        label: 'Finger Code'
      },
    ],
    page: 0,
    rowsPerPage: 5,
    defaultPerPage: 5,
    filterText: '',
    title: 'Wishes',
    reportType: 'All',
    subscriptionType: 'All',
    packageClass: 'All',
    wishType: 'Birthday',
    expiringIn: 5,
    open: false,
    reportData: [],
    wisheData: null,
    memberData: null,
  };

  componentDidMount() {
    this.props.initialize({
      wishType: 'Birthday', reportType: 'All', subscriptionType: 'All', packageClass: 'All', expiringIn: '5'
    });
    const {
      fetchPackageData, fetchClassData, fetchReportsData, reportData, memberData
    } = this.props;
    const {
      reportType, subscriptionType, packageClass, expiringIn
    } = this.state;
    const dataForFetchReport = {
      reportType, subscriptionType, packageClass, expiringIn
    };
    fetchPackageData();
    fetchClassData();
    fetchReportsData(dataForFetchReport);
    this.setState({ reportData, memberData });
  }

  componentDidUpdate() {
    const { fetchReportsData, memberData, reportData } = this.props;
    const {
      reportType, subscriptionType, packageClass, expiringIn
    } = this.state;
    const dataForFetchReport = {
      reportType, subscriptionType, packageClass, expiringIn
    };
    if (memberData !== this.state.memberData) {
      fetchReportsData(dataForFetchReport);
    }
    if (reportData !== this.state.reportData) {
      this.setState({ reportData });
    }
  }

  handleWishType = (e, wishType) => {
    this.setState({ wishType });
  }

  handleReportType = (e, reportType) => {
    this.setState({ reportType });
    const { fetchReportsData } = this.props;
    const { subscriptionType, packageClass, expiringIn } = this.state;
    const dataForFetchReport = {
      reportType, subscriptionType, packageClass, expiringIn
    };
    fetchReportsData(dataForFetchReport);
  }

  handleSubscriptionType = (e, subscriptionType) => {
    this.setState({ subscriptionType });
    const { fetchReportsData } = this.props;
    const { reportType, packageClass, expiringIn } = this.state;
    const dataForFetchReport = {
      reportType, subscriptionType, packageClass, expiringIn
    };
    fetchReportsData(dataForFetchReport);
  }

  handlePackageClassData = (e, packageClass) => {
    this.setState({ packageClass });
    const { fetchReportsData } = this.props;
    const { reportType, subscriptionType, expiringIn } = this.state;
    const dataForFetchReport = {
      reportType, subscriptionType, packageClass, expiringIn
    };
    fetchReportsData(dataForFetchReport);
  }

  handleWish = (data) => {
    this.setState({ open: true, wisheData: data });
  }

  handleDisagree = () => {
    this.setState({ open: false, deletedId: null });
  }

  handleAgree = () => {
    const { send_Wish } = this.props;
    const { wisheData, wishType } = this.state;
    const wishes = { memberId: wisheData.memberId, wishType };
    this.setState({ open: false });
    send_Wish(wishes);
  }


  render() {
    const description = brand.desc;
    const {
      order,
      orderBy,
      selected,
      page,
      rowsPerPage,
      defaultPerPage,
      subscriptionType,
      filterText,
      columnData,
      reportType,
      wishType,
      reportData,
      title,
      open
    } = this.state;
    const { classes, classData, packageData, } = this.props;
    let finalColumnData;
    let wisheData;
    const packageClassData = [];
    if (subscriptionType === 'Package') {
      packageData.map((item) => {
        packageClassData.push({ value: item._id, label: item.packName });
        return null;
      });
    }
    if (subscriptionType === 'Class') {
      classData.map((item) => {
        packageClassData.push({ value: item._id, label: item.className });
        return null;
      });
    }
    if (wishType === 'Birthday') {
      finalColumnData = [{
        id: 'birthWish',
        disablePadding: true,
        label: 'Birthday Wished'
      }, ...columnData];
      wisheData = reportData.filter((item) => {
        const dobM = new Date(item.dob).getMonth();
        const dobD = new Date(item.dob).getDate();
        const todayM = new Date().getMonth();
        const todayD = new Date().getDate();
        return (dobM === todayM && dobD === todayD);
      });
    } else {
      finalColumnData = [{
        id: 'anniversaryWish',
        disablePadding: true,
        label: 'Anniversary Wished'
      }, ...columnData];
      wisheData = reportData.filter((item) => {
        const anniversaryM = new Date(item.anniversary).getMonth();
        const anniversaryD = new Date(item.anniversary).getDate();
        const todayM = new Date().getMonth();
        const todayD = new Date().getDate();
        return (anniversaryM === todayM && anniversaryD === todayD);
      });
    }

    return (
      <div className={classes.root} style={{ display: 'block' }}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div>
          <Dialog
            open={open}
            onClose={this.handleDisagree}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Wishes'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure for wish ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDisagree} color="primary">
                Disagree
              </Button>
              <Button onClick={this.handleAgree} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>

        </div>
        <div style={{ marginLeft: '10px', marginTop: '10px', width: '100%' }}>
          SELECT FIELD
        </div>
        <div style={{ display: 'flex', marginTop: '-8px', width: '100%' }}>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Select Whish Type</InputLabel>
              <Field
                name="wishType"
                component={SelectRedux}
                required
                placeholder="Wishes Type"
                onChange={this.handleWishType}
              >
                <MenuItem value="Birthday">Birthday</MenuItem>
                <MenuItem value="Anniversary">Anniversary</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Report Type</InputLabel>
              <Field
                name="reportType"
                component={SelectRedux}
                required
                placeholder="Report Type"
                onChange={this.handleReportType}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Expiring">Expiring</MenuItem>
                <MenuItem value="Expired">Expired</MenuItem>
                <MenuItem value="Non-Active">Non-Active</MenuItem>
              </Field>
            </FormControl>
          </div>
          {reportType !== 'All' && (
            <>
              <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">Subscription Type</InputLabel>
                  <Field
                    name="subscriptionType"
                    component={SelectRedux}
                    required
                    placeholder="Subscription Type"
                    onChange={this.handleSubscriptionType}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Package">Package</MenuItem>
                    <MenuItem value="Class">Class</MenuItem>
                  </Field>
                </FormControl>
              </div>
              <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">Package/Class</InputLabel>
                  <Field
                    name="packageClass"
                    component={SelectRedux}
                    required
                    placeholder="Package Class"
                    onChange={this.handlePackageClassData}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {packageClassData && packageClassData.map((item) => <MenuItem value={item.value} key={Math.random()}>{item.label}</MenuItem>)}
                  </Field>
                </FormControl>
              </div>
            </>
          )}
        </div>
        {(reportData.length >= 1)
          && (
            <>
              <AdvTable
                order={order}
                orderBy={orderBy}
                selected={selected}
                data={wisheData}
                title={title}
                page={page}
                wished={this.handleWish}
                rowsPerPage={rowsPerPage}
                defaultPerPage={defaultPerPage}
                filterText={filterText}
                columnData={finalColumnData}
              />
            </>
          )
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  nonActiveMemberData: state.get('reports').nonActiveMemberList,
  classData: state.get('classInfo').classList,
  packageData: state.get('packageInfo').packageList,
  reportData: state.get('reports').reportList,
  memberData: state.get('addMember').addMemberList
});

const mapDispatchToProps = (dispatch) => ({
  fetchReportsData: (data) => dispatch(getReportsData(data)),
  fetchPackageData: () => dispatch(getClassData()),
  fetchClassData: () => dispatch(getPackageData()),
  send_Wish: (data) => dispatch(sendWish(data))
});

const WishesRedux = reduxForm({
  form: 'wishesForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Wishes);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(WishesRedux));
