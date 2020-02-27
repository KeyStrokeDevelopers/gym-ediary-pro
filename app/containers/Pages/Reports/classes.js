/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { AdvTable } from 'dan-components';
import { connect } from 'react-redux';
import styles from 'dan-components/Email/email-jss';
import { getClassesData } from '../../../actions/reportActions';

class Classes extends Component {
  state = {
    fromDate: null,
    toDate: null,
    order: 'asc',
    orderBy: 'date',
    selected: [],
    tableData: [{ transactionDate: 'test', description: 'test', debit: 'debit' }],
    columnData: [
      {
        id: 'transactionDate',
        disablePadding: true,
        label: 'Date'
      }, {
        id: 'description',
        //  numeric: true,
        disablePadding: false,
        label: 'Description'
      }, {
        id: 'debit',
        numeric: true,
        disablePadding: false,
        label: '[+]DEBIT'
      }, {
        id: 'credit',
        numeric: true,
        disablePadding: false,
        label: '[-]CREDIT'
      }, {
        id: 'paymentMode',
        // numeric: true,
        disablePadding: false,
        label: 'MODE'
      },
    ],
    page: 0,
    rowsPerPage: 5,
    defaultPerPage: 5,
    filterText: '',
    title: 'Classes'
  };

  componentDidMount() {
    const { fetchClassData } = this.props;
    fetchClassData();
  }


  render() {
    const description = brand.desc;
    const docSrc = 'containers/Tables/demos/';
    const {
      order,
      orderBy,
      selected,
      page,
      rowsPerPage,
      defaultPerPage,
      filterText,
      columnData,
      tableData,
      fromDate,
      toDate,
      title
    } = this.state;
    const { classeData, classes } = this.props;
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

        {(tableData.length >= 1)
          && (
            <>
              <AdvTable
                order={order}
                orderBy={orderBy}
                selected={selected}
                data={classeData}
                page={page}
                title={title}
                rowsPerPage={rowsPerPage}
                defaultPerPage={defaultPerPage}
                filterText={filterText}
                columnData={columnData}
              />
            </>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  classeData: state.get('reports').classeList
});

const mapDispatchToProps = (dispatch) => ({
  fetchClassData: () => dispatch(getClassesData())
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Classes));
