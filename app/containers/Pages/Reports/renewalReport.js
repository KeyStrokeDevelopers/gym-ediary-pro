/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { AdvTable } from 'dan-components';
import styles from 'dan-components/Email/email-jss';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form/immutable';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import { DatePickerInput, SelectRedux } from '../../../components/Forms/ReduxFormMUI';
import { getRenewalData } from '../../../actions/reportActions';


class RenewalReport extends Component {
  state = {
    order: 'asc',
    orderBy: 'date',
    selected: [],
    columnData: [
      {
        id: 'form',
        disablePadding: true,
        label: 'Form'
      }, {
        id: 'regDate',
        disablePadding: true,
        label: 'REG Date'
      }, {
        id: 'member',
        disablePadding: false,
        label: 'Member'
      }, {
        id: 'contect',
        numeric: true,
        disablePadding: false,
        label: 'Contact'
      }, {
        id: 'age',
        numeric: true,
        disablePadding: false,
        label: 'Age'
      }, {
        id: 'balance',
        numeric: true,
        disablePadding: false,
        label: 'Balance'
      }, {
        id: 'bloodG',
        disablePadding: false,
        label: 'Blood G'
      },
      {
        id: 'fingercode',
        // numeric: true,
        disablePadding: false,
        label: 'Finger Code'
      },
    ],
    page: 0,
    rowsPerPage: 5,
    defaultPerPage: 5,
    filterText: '',
    title: 'Registration Report',
    subscriptionType: 'All',
    fromDate: moment(new Date()).format('YYYY-MM-DD'),
    toDate: moment(new Date()).format('YYYY-MM-DD')
  };

  componentDidMount() {
    this.props.initialize({ subscriptionType: 'All' });
    const { fetchRenewalReport } = this.props;
    const { fromDate, toDate, subscriptionType } = this.state;
    fetchRenewalReport({ fromDate, toDate, subscriptionType });
  }

  handleFromDate = (fromDate) => {
    const { fetchRenewalReport } = this.props;
    const { toDate, subscriptionType } = this.state;
    this.setState({ fromDate });
    fetchRenewalReport({ fromDate, toDate, subscriptionType });
  }

  handleToDate = (toDate) => {
    const { fetchRenewalReport } = this.props;
    const { fromDate, subscriptionType } = this.state;
    this.setState({ toDate });
    fetchRenewalReport({ fromDate, toDate, subscriptionType });
  }

  handleSubscriptionType = (e, subscriptionType) => {
    this.setState({ subscriptionType });
    const { fetchRenewalReport } = this.props;
    const { fromDate, toDate } = this.state;
    fetchRenewalReport({ fromDate, toDate, subscriptionType });
  }


  render() {
    const { renewalData } = this.props;
    const description = brand.desc;
    const {
      order,
      orderBy,
      selected,
      page,
      rowsPerPage,
      defaultPerPage,
      filterText,
      columnData,
      title,
      fromDate,
      subscriptionType,
      toDate
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root} style={{ width: '100%', display: 'block' }}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div style={{ marginLeft: '10px', marginTop: '10px', width: '100%' }}>
          SELECT DATE RANGE
          </div>
        <div style={{ display: 'flex', marginTop: '-8px' }}>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <Field
              name="fromDate"
              label="From"
              component={DatePickerInput}
              disableFuture
              onChange={this.handleFromDate}
              dateValue={fromDate}
            />
          </div>
          <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
            <Field
              name="toDate"
              label="To"
              component={DatePickerInput}
              onChange={this.handleToDate}
              dateValue={toDate}
            />
          </div>
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
        </div>
        {(renewalData.length >= 1)
          ? (
            <AdvTable
              order={order}
              orderBy={orderBy}
              selected={selected}
              data={renewalData}
              page={page}
              title={title}
              rowsPerPage={rowsPerPage}
              defaultPerPage={defaultPerPage}
              filterText={filterText}
              columnData={columnData}
            />
          )
          : (
            <div
              className={classes.cover}
              style={{
                backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'
              }}
            >
              <div
                className={classes.bg}
                style={{
                  minHeight: '400px', display: 'flex', color: '#2196F3', alignItems: 'center'
                }}
              >
                <Typography variant="h3" component="h3">
                  No data to show
                  </Typography>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  renewalData: state.get('reports').renewalMembershipList
});

const mapDispatchToProps = (dispatch) => ({
  fetchRenewalReport: (data) => dispatch(getRenewalData(data))
});

const RenewalReportRedux = reduxForm({
  form: 'renewalReportForm'
})(RenewalReport);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RenewalReportRedux));
