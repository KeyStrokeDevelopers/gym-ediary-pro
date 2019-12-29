import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import data from 'dan-api/apps/contactData';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import dummy from 'dan-api/dummy/dummyContents';
import {
    getBankData,
    submitBankData,
    addBankData,
    closeAction,
    //     showDetailAction,
    //     hideDetailAction,
    //     submitAction,
    //     editAction,
    //     addAction,
    //     closeAction,
    //     removeAction,
    //     addToFavoriteAction,
    //     searchAction,
    //     closeNotifAction
} from 'dan-actions/BankActions';
import {
    ContactList,
    ContactDetail,
    // BankDataList,
    AddContact,
    AddBank,
    Notification
} from 'dan-components';
import BankDataList from '../../../components/Contact/BankDataList';
import BankDetail from '../../../components/Contact/BankDetail';
import styles from 'dan-components/Contact/contact-jss';

class Bank extends React.Component {
    componentDidMount() {
        const { fetchData } = this.props;
        fetchData();
    }

    submitBankData = (data, avatar) => {
        console.log('item in submit bank form -----submit ------ ------', data);
        // this.props.addBankData(item)
        const { submitData } = this.props;
        // const avatarBase64 = typeof avatar === 'object' ? URL.createObjectURL(avatar) : avatar;
        // const avatarPreview = avatar !== null ? avatarBase64 : dummy.user.avatar;
        submitData(data);
    }

    render() {
        const title = brand.name + ' - Contact';
        const description = brand.desc;
        const {
            classes,
            dataContact,
            bankData,
            itemSelected,
            showDetail,
            hideDetail,
            avatarInit,
            open,
            showMobileDetail,
            add,
            edit,
            close,
            remove,
            favorite,
            keyword,
            search,
            closeNotif,
            messageNotif
        } = this.props;
        console.log('bank data ------', bankData);
        return (
            <div>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="twitter:title" content={title} />
                    <meta property="twitter:description" content={description} />
                </Helmet>
                <Notification close={() => closeNotif()} message={messageNotif} />
                <div className={classes.root}>
                    <BankDataList
                        addFn
                        total={bankData && bankData.length}
                        addContact={add}
                        clippedRight
                        itemSelected={itemSelected}
                        bankData={bankData}
                        showDetail={showDetail}
                        search={search}
                        keyword={keyword}
                    />
                    <BankDetail
                        showMobileDetail={showMobileDetail}
                        hideDetail={hideDetail}
                        bankData={bankData}
                        itemSelected={itemSelected}
                        edit={edit}
                        remove={remove}
                        favorite={favorite}
                    />
                </div>
                <AddContact
                    addContact={add}
                    openForm={open}
                    formType='bank'
                    closeForm={close}
                    submit={this.submitBankData}
                    avatarInit={avatarInit}
                />
            </div>
        );
    }
}

// Bank.propTypes = {
//     classes: PropTypes.object.isRequired,
//     avatarInit: PropTypes.string.isRequired,
//     fetchData: PropTypes.func.isRequired,
//     showDetail: PropTypes.func.isRequired,
//     hideDetail: PropTypes.func.isRequired,
//     keyword: PropTypes.string.isRequired,
//     open: PropTypes.bool.isRequired,
//     showMobileDetail: PropTypes.bool.isRequired,
//     add: PropTypes.func.isRequired,
//     close: PropTypes.func.isRequired,
//     //submit: PropTypes.func.isRequired,
//     edit: PropTypes.func.isRequired,
//     remove: PropTypes.func.isRequired,
//     favorite: PropTypes.func.isRequired,
//     search: PropTypes.func.isRequired,
//     dataContact: PropTypes.object.isRequired,
//     itemSelected: PropTypes.number.isRequired,
//     closeNotif: PropTypes.func.isRequired,
//     messageNotif: PropTypes.string.isRequired,
// };

const reducer = 'bank';
const mapStateToProps = state => {
    const bankReducer = state.get('bank');
    console.log('bank record ----', bankReducer);
    return ({

        // force: state, // force state from reducer
        avatarInit: bankReducer.avatarInit,
        bankData: bankReducer.bankList,
        itemSelected: bankReducer.selectedIndex,
        keyword: bankReducer.keywordValue,
        open: bankReducer.openFrm,
        showMobileDetail: bankReducer.showMobileDetail,
        messageNotif: bankReducer.notifMsg,
    });
}

const constDispatchToProps = dispatch => ({
    submitData: (data) => dispatch(submitBankData(data)),
    fetchData: () => dispatch(getBankData()),
    // showDetail: bindActionCreators(showDetailAction, dispatch),
    // hideDetail: () => dispatch(hideDetailAction),
    // submit: bindActionCreators(submitAction, dispatch),
    // edit: bindActionCreators(editAction, dispatch),
    add: () => dispatch(addBankData()),
    close: () => dispatch(closeAction()),
    // remove: bindActionCreators(removeAction, dispatch),
    // favorite: bindActionCreators(addToFavoriteAction, dispatch),
    // search: bindActionCreators(searchAction, dispatch),
    // closeNotif: () => dispatch(closeNotifAction),
});

const BankMapped = connect(
    mapStateToProps,
    constDispatchToProps
)(Bank);

export default withStyles(styles)(BankMapped);


