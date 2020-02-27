/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { AdvTable } from 'dan-components';
import styles from 'dan-components/Email/email-jss';
import Typography from '@material-ui/core/Typography';
import { getPendingPaymentsData } from '../../../actions/reportActions';


class PendingPayments extends Component {
  state = {
    fromDate: null,
    toDate: null,
    order: 'asc',
    orderBy: 'date',
    selected: [],
    columnData: [
      {
        id: 'form',
        disablePadding: true,
        label: 'Form'
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
      },
      {
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
    title: 'Pending Payments'
  };

  componentDidMount() {
    const { fetchPendingPaymentData } = this.props;
    fetchPendingPaymentData();
  }


  render() {
    const { pendingPaymentData } = this.props;
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
      title
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>

        {(pendingPaymentData.length >= 1)
          ? (
            <AdvTable
              order={order}
              orderBy={orderBy}
              selected={selected}
              data={pendingPaymentData}
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
  pendingPaymentData: state.get('reports').pendingPaymentList
});

const mapDispatchToProps = (dispatch) => ({
  fetchPendingPaymentData: () => dispatch(getPendingPaymentsData())
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PendingPayments));
