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
import moment from 'moment';
import { getRegistrationData } from '../../../actions/reportActions';
import { DatePickerInput } from '../../../components/Forms/ReduxFormMUI';


class RegistrationReport extends Component {
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
    fromDate: moment(new Date()).format('YYYY-MM-DD'),
    toDate: moment(new Date()).format('YYYY-MM-DD'),
  };

  componentDidMount() {
    const { fetchRegistrationReport } = this.props;
    const { fromDate, toDate } = this.state;
    fetchRegistrationReport({ fromDate, toDate });
  }

  handleFromDate = (fromDate) => {
    const { fetchRegistrationReport } = this.props;
    const { toDate } = this.state;
    this.setState({ fromDate });
    fetchRegistrationReport({ fromDate, toDate });
  }

  handleToDate = (toDate) => {
    const { fetchRegistrationReport } = this.props;
    const { fromDate } = this.state;
    this.setState({ toDate });
    fetchRegistrationReport({ fromDate, toDate });
  }


  render() {
    const { registrationData } = this.props;
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
        </div>
        {(registrationData.length >= 1)
          ? (
            <AdvTable
              order={order}
              orderBy={orderBy}
              selected={selected}
              data={registrationData}
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
  registrationData: state.get('reports').registrationList
});

const mapDispatchToProps = (dispatch) => ({
  fetchRegistrationReport: (data) => dispatch(getRegistrationData(data))
});

const RegistrationReportRedux = reduxForm({
  form: 'registrationReportForm'
})(RegistrationReport);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RegistrationReportRedux));
