/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { AdvTable } from 'dan-components';
import styles from 'dan-components/Email/email-jss';
import FormControl from '@material-ui/core/FormControl';
import { reduxForm, Field } from 'redux-form/immutable';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { SelectRedux } from '../../../components/Forms/ReduxFormMUI';
import { getCurrentStockData } from '../../../actions/reportActions';
import { getProductTypeData } from 'dan-actions/productTypeActions';
import { getBrandUnitData } from 'dan-actions/brandUnitActions';

class CurrentStock extends Component {
    state = {
        order: 'asc',
        orderBy: 'date',
        selected: [],
        columnData: [
            {
                id: 'productType',
                disablePadding: true,
                label: 'Product Type'
            }, {
                id: 'brand',
                disablePadding: false,
                label: 'Brand'
            }, {
                id: 'productName',
                disablePadding: false,
                label: 'Product Name'
            }, {
                id: 'ProductCode',
                disablePadding: false,
                label: 'Product Code'
            }, {
                id: 'costPrice',
                numeric: true,
                disablePadding: false,
                label: 'Cost Price'
            }, {
                id: 'currentStock',
                disablePadding: false,
                numeric: true,
                label: 'Current Stock'
            }, {
                id: 'minimumQty',
                numeric: true,
                disablePadding: false,
                label: 'Minimum Qty'
            }, {
                id: 'stockValue',
                numeric: true,
                disablePadding: false,
                label: 'Stock Value'
            },
        ],
        page: 0,
        rowsPerPage: 5,
        defaultPerPage: 5,
        filterText: '',
        title: 'Current Stock',
        productType: 'All',
        brand: 'All',
        updated: false
    };

    componentDidMount() {
        this.props.initialize({ productType: 'All', brand: 'All' });
        const { fetchCurrentStockData, fetchProductTypeData, fetchBrandData } = this.props;
        const { productType, brand } = this.state;
        fetchCurrentStockData({ productType, brand });
        fetchProductTypeData();
        fetchBrandData();
    }

    handleProductType = (e, productType) => {
        const { fetchCurrentStockData } = this.props;
        const { brand } = this.state;
        fetchCurrentStockData({ productType, brand });
        this.setState({ productType });
    }

    handleBrandData = (e, brand) => {
        const { fetchCurrentStockData } = this.props;
        const { productType } = this.state;
        fetchCurrentStockData({ productType, brand });
        this.setState({ brand });
    }

    render() {
        const {
            classes, currentStockData, productTypeData,
            brandUnitData
        } = this.props;
        const description = brand.desc;
        const {
            order,
            orderBy,
            selected,
            page,
            rowsPerPage,
            defaultPerPage,
            filterText,
            title,
            columnData
        } = this.state;
        let brandData = brandUnitData.filter((item) => item.entryType === 'Brand' && item.status === 1);
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
                <div style={{ marginLeft: '10px', marginTop: '10px', width: '100%' }}>
                    SELECT
          </div>
                <div style={{ display: 'flex', marginTop: '-8px', width: '100%' }}>
                    <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
                        <FormControl className={classes.field}>
                            <InputLabel htmlFor="selection">Select Product Type</InputLabel>
                            <Field
                                name="productType"
                                component={SelectRedux}
                                required
                                placeholder="Product Type"
                                onChange={this.handleProductType}
                            >
                                <MenuItem value="All">All</MenuItem>
                                {
                                    productTypeData && productTypeData.length >= 1 &&
                                    productTypeData.map((item, index) => <MenuItem value={item._id} key={index + Math.random()}>{item.productType}</MenuItem>)
                                }
                            </Field>
                        </FormControl>
                    </div>
                    <div className={classes.picker} style={{ margin: '10px', width: '50%' }}>
                        <FormControl className={classes.field}>
                            <InputLabel htmlFor="selection">Select Brand</InputLabel>
                            <Field
                                name="brand"
                                component={SelectRedux}
                                required
                                placeholder="Brand"
                                onChange={this.handleBrandData}
                            >
                                <MenuItem value="All">All</MenuItem>
                                {
                                    brandData && brandData.map((item, index) => <MenuItem value={item._id} key={index + Math.random()}>{item.value}</MenuItem>)
                                }
                            </Field>
                        </FormControl>
                    </div>
                </div>
                {(currentStockData && currentStockData.length >= 1) ?
                    <AdvTable
                        order={order}
                        orderBy={orderBy}
                        selected={selected}
                        data={currentStockData}
                        page={page}
                        title={title}
                        rowsPerPage={rowsPerPage}
                        defaultPerPage={defaultPerPage}
                        filterText={filterText}
                        columnData={columnData}
                    /> :
                    <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        No Data to Show
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    brandUnitData: state.get('brandUnit').brandUnitList,
    productTypeData: state.get('productType').productTypeList,
    currentStockData: state.get('reports').currentStockList
});

const mapDispatchToProps = (dispatch) => ({
    fetchCurrentStockData: (data) => dispatch(getCurrentStockData(data)),
    fetchProductTypeData: () => dispatch(getProductTypeData()),
    fetchBrandData: () => dispatch(getBrandUnitData())
});

const CurrentStockRedux = reduxForm({
    form: 'currentStockForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(CurrentStock);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CurrentStockRedux));
