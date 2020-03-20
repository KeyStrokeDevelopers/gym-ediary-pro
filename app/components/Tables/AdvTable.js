/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import styles from 'dan-components/Tables/tableStyle-jss';
import { green, grey } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import EnhancedTableToolbar from './tableParts/TableToolbar';
import EnhancedTableHead from './tableParts/TableHeader';
import PrintIcon from '@material-ui/icons/Print';
import Button from '@material-ui/core/Button';

const RadioButton = withStyles({
  root: {
    color: grey[600],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Radio color="default" defaultChecked {...props} />);

const Toggle = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => (
  <Switch
    focusVisibleClassName={classes.focusVisible}
    disableRipple
    classes={{
      root: classes.root,
      switchBase: classes.switchBase,
      thumb: classes.thumb,
      track: classes.track,
      checked: classes.checked,
    }}
    {...props}
  />
));


class AdvTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {
      order,
      orderBy,
      selected,
      data,
      page,
      rowsPerPage,
      defaultPerPage,
      filterText
    } = this.props;

    this.state = {
      order,
      orderBy,
      selected,
      data: data.sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page,
      rowsPerPage,
      defaultPerPage,
      filterText,
      isToggleOn: false
    };
  }

  componentDidUpdate() {
    const { data } = this.props;
    if (data !== this.state.data) {
      this.setState({ data });
    }
  }

  handleRequestSort = (event, property) => {
    const orderByAlias = property;
    let orderLet = 'desc';
    const { orderBy, order, data } = this.state;
    if (orderBy === property && order === 'desc') {
      orderLet = 'asc';
    }

    const dataAlias = orderLet === 'desc'
      ? data.sort((a, b) => (b[orderByAlias] < a[orderByAlias] ? -1 : 1))
      : data.sort((a, b) => (a[orderByAlias] < b[orderByAlias] ? -1 : 1));

    this.setState({ data: dataAlias, order: orderLet, orderBy: orderByAlias });
  };

  handleSelectAllClick = (event, checked) => {
    const { data } = this.state;
    if (checked) {
      this.setState({ selected: data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  // eslint-disable-next-line
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleUserInput(value) {
    const { data, defaultPerPage } = this.state;
    // Show all item first
    if (value !== '') {
      this.setState({ rowsPerPage: data.length });
    } else {
      this.setState({ rowsPerPage: defaultPerPage });
    }

    // Show result base on keyword
    this.setState({ filterText: value.toLowerCase() });
  }

  handleToggleChange = () => {
    this.setState((preState) => ({ isToggleOn: !preState.isToggleOn }));
  }

  render() {
    const { classes } = this.props;
    const {
      order,
      orderBy,
      rowsPerPage,
      data,
      page,
      filterText
    } = this.state;

    const {
      columnData, paymentMethodData, title, checkbox, attendance, wished, handleCall, toggleChange, editPurchaseData, editSaleData, handlePrint, editSalary
    } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));

    const renderCell = (dataArray, keyArray) => keyArray.map((itemCell, index) => {
      let cellValue = '';
      if (itemCell.id === 'transactionDate') {
        if (dataArray.description === 'Prev Balance' || dataArray.description === 'Later Balance') {
          cellValue = dataArray[itemCell.id];
        } else {
          cellValue = new Date(dataArray[itemCell.id]).toLocaleDateString();
        }
      } else if (itemCell.id === 'date') {
        cellValue = new Date(dataArray[itemCell.id]).toLocaleDateString();
      } else if (itemCell.id === 'debit') {
        if (dataArray.transactionStatus === 'Debit') {
          cellValue = dataArray.amount;
        } else {
          cellValue = '-';
        }
        if (dataArray.debit) {
          cellValue = dataArray.debit;
        }
      } else if (itemCell.id === 'credit') {
        if (dataArray.transactionStatus === 'Credit') {
          cellValue = dataArray.amount;
        } else {
          cellValue = '-';
        }
        if (dataArray.credit) {
          cellValue = dataArray.credit;
        }
      } else if (itemCell.id === 'paymentMode') {
        if (dataArray.paymentMode === 'Method') {
          const payment_method = paymentMethodData.filter((item) => item._id === dataArray.paymentModeDescription);
          cellValue = payment_method[0].paymentMethod;
        } else {
          cellValue = dataArray[itemCell.id];
        }
      } else if (itemCell.id === 'regDate') {
        cellValue = new Date(dataArray[itemCell.id]).toLocaleDateString();
      } else if (itemCell.id === 'birthWish' || itemCell.id === 'anniversaryWish') {
        if (parseInt(dataArray[itemCell.id]) === new Date().getFullYear()) {
          cellValue = (
            <p style={{
              borderRadius: '5px', backgroundColor: '#00e673', color: '#ffffff', margin: '5px', textAlign: 'center'
            }}
            >
              Wished
            </p>
          );
        } else {
          cellValue = (
            <p
              onClick={() => wished(dataArray)}
              style={{
                borderRadius: '5px', backgroundColor: '#ff5050', color: '#ffffff', paddingTop: '5px', marginBottom: '5px', textAlign: 'center', cursor: 'pointer'
              }}
            >
              Click For Wished
            </p>
          );
        }
      } else if (itemCell.id === 'callDate') {
        if (dataArray[itemCell.id]) {
          cellValue = (
            <p
              onClick={() => handleCall(dataArray)}
              style={{
                borderRadius: '5px', backgroundColor: '#00e673', color: '#ffffff', margin: '5px', textAlign: 'center', cursor: 'pointer'
              }}
            >
              {new Date(dataArray.callDate).toLocaleDateString()}
            </p>
          );
        } else {
          cellValue = (
            <p
              onClick={() => handleCall(dataArray)}
              style={{
                borderRadius: '5px', backgroundColor: '#ff5050', color: '#ffffff', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center', cursor: 'pointer'
              }}
            >
              no call
            </p>
          );
        }
      } else if (itemCell.id === 'dnd') {
        cellValue = (
          <Toggle
            defaultChecked={dataArray[itemCell.id] === 1}
            onChange={() => toggleChange(dataArray)}
            value="checkedB"
          />
        );
      } else if (itemCell.id === 'attendance') {
        const radioValue = !(dataArray[itemCell.id] === 'a' || !dataArray[itemCell.id]);
        const data_array = Object.assign({}, dataArray);
        data_array.attendance = radioValue ? 'a' : 'p';
        cellValue = (
          <RadioButton
            checked={radioValue}
            onClick={() => attendance(data_array)}
          />
        );
      } else if (itemCell.id === 'distributor') {
        return (
          <TableCell onClick={() => editPurchaseData(dataArray)} style={{ wordBreak: 'initial', whiteSpace: 'nowrap' }} padding="default" align={itemCell.numeric ? 'right' : 'left'} key={index.toString()}>
            <p style={{
              color: 'green', border: '1px solid green', cursor: 'pointer', paddingLeft: '5px', paddingRight: '5px'
            }}
            >
              {dataArray[itemCell.id]}
            </p>
          </TableCell>
        );
      } else if (itemCell.id === 'customer') {
        return (
          <TableCell onClick={() => editSaleData(dataArray)} style={{ wordBreak: 'initial', whiteSpace: 'nowrap' }} padding="default" align={itemCell.numeric ? 'right' : 'left'} key={index.toString()}>
            <p style={{
              color: 'green', border: '1px solid green', cursor: 'pointer', paddingLeft: '5px', paddingRight: '5px'
            }}
            >
              {dataArray[itemCell.id]}
            </p>
          </TableCell>
        );
      } else if (itemCell.id === 'invoice') {
        return (
          <TableCell onClick={() => editPurchaseData(dataArray)} style={{ wordBreak: 'initial', whiteSpace: 'nowrap' }} padding="default" align={itemCell.numeric ? 'right' : 'left'} key={index.toString()}>
            <p style={{
              color: 'green', border: '1px solid green', cursor: 'pointer', paddingLeft: '5px', paddingRight: '5px'
            }}
            >
              {dataArray[itemCell.id]}
            </p>
          </TableCell>
        );
      } else if (itemCell.id === 'print') {
        if (dataArray.transactionStatus === 'Credit' && dataArray.amount > 0) {
          const paymentMeth = paymentMethodData.filter((item) => item._id === dataArray['paymentModeDescription']);
          dataArray.paymentMethod = paymentMeth[0]['paymentMethod'];
          cellValue = (
            <PrintIcon onClick={() => handlePrint(dataArray)} color="secondary" style={{ cursor: 'pointer' }} />
          );
        }
      } else if (itemCell.id === 'editSalary') {
        cellValue = (
          <Button variant="contained" color="primary" type="button" onClick={() => editSalary(dataArray)}>
            Edit
          </Button>
        );
      } else {
        cellValue = dataArray[itemCell.id];
      }
      return (<TableCell style={{ wordBreak: 'initial', whiteSpace: 'nowrap' }} padding="default" align={itemCell.numeric ? 'right' : 'left'} key={index.toString()}>{cellValue}</TableCell>);
    });
    return (
      <div className={classes.rootTable}>
        <EnhancedTableToolbar
          // numSelected={selected.length}
          filterText={filterText}
          onUserInput={(event) => this.handleUserInput(event)}
          title={title || 'Table'}
          placeholder="Search Account"
        />
        <div className={classes.tableWrapper}>
          <Table className={classNames(classes.table, classes.stripped, classes.hover)}>
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              columnData={columnData}
            // checkcell={checkcell}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                // if (n.name.toLowerCase().indexOf(filterText) === -1) {
                //   return false;
                // }
                return (
                  <TableRow
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    {checkbox
                      && (
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                      )
                    }
                    {renderCell(n, columnData)}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={12} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

AdvTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  defaultPerPage: PropTypes.number.isRequired,
  filterText: PropTypes.string.isRequired,
  columnData: PropTypes.array.isRequired,
};

export default withStyles(styles)(AdvTable);
